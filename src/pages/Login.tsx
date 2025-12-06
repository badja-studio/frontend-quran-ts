import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Logo from "../assets/logo.png";
import LogoKemenag from "../assets/kemenag.png";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import authService from "../services/auth.service";

interface LoginFormInputs {
  identifier: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { identifier: "", password: "" },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const credentials = {
        username: data.identifier,
        password: data.password,
      };
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const role = response.data.user.role.toLowerCase();
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "assessor" || role === "guru")
          navigate("/dashboard/asesor/siap-asesmen");
        else if (role === "participant" || role === "siswa")
          navigate("/peserta");
        else navigate("/dashboard");
      } else {
        setLoginError(response.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan. Silakan coba lagi.";
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}15 100%)`,
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          {/* Logo utama */}
          <img src={Logo} alt="Logo" style={{ height: 60 }} />

          {/* Teks resmi */}
          <Box sx={{ textAlign: "center", flex: 1, mx: 1 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                letterSpacing: 1,
                lineHeight: 1.2,
                color: "primary.main",
              }}
            >
              Portal Insan Al-Qur'an
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                display: "block",
                color: "text.secondary",
                letterSpacing: 0.5,
                lineHeight: 1.4,
                mt: 0.5,
              }}
            >
              Direktorat Pendidikan Agama Islam
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                display: "block",
                color: "text.secondary",
                letterSpacing: 0.5,
                lineHeight: 1.4,
              }}
            >
              Direktorat Jenderal Pendidikan Islam
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                display: "block",
                color: "text.secondary",
                letterSpacing: 0.5,
                lineHeight: 1.4,
              }}
            >
              Kementerian Agama
            </Typography>
          </Box>

          {/* Logo Kemenag */}
          <img src={LogoKemenag} alt="Kemenag" style={{ height: 60 }} />
        </Box>

        {/* LOGIN CARD */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} textAlign="center" mb={2}>
              Login Portal
            </Typography>

            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="identifier"
                control={control}
                rules={{
                  required: "Username wajib diisi",
                  minLength: { value: 3, message: "Minimal 3 karakter" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    margin="dense"
                    variant="outlined"
                    autoComplete="username"
                    autoFocus
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                    placeholder="Masukkan username"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password wajib diisi",
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="dense"
                    variant="outlined"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="medium"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": { boxShadow: 3 },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Belum punya akun?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/register")}
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Daftar Sekarang
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
