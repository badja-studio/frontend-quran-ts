import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
import {
  MenuBook as MenuBookIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError("");
    setIsLoading(true);

    try {
      // Persiapkan credentials
      const credentials = {
        username: data.identifier,
        password: data.password,
      };

      // Panggil login API
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        // Redirect berdasarkan role (React Query akan fetch profile otomatis di halaman tujuan)
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
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}15 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <MenuBookIcon sx={{ fontSize: 70, color: "primary.main", mb: 1 }} />
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            IQRA+
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Instrumen Qur’an & Read Assessment
          </Typography>
        </Box>

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
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
                  minLength: {
                    value: 3,
                    message: "Minimal 3 karakter",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    autoComplete="username"
                    autoFocus
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                    placeholder="username123"
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
                    margin="normal"
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
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={24}
                      sx={{ mr: 1, color: "white" }}
                    />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Belum punya akun?{" "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => navigate("/register")}
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
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
