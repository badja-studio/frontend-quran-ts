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
  Stack,
  alpha,
} from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
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
        background:
          "linear-gradient(to bottom right, #0f172a 0%, #1e293b 50%, #334155 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "150%",
          height: "150%",
          top: "-25%",
          left: "-25%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite",
        },
        "@keyframes pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
          "50%": { transform: "scale(1.1)", opacity: 0.8 },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE - Branding */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 4,
              pr: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  p: 1.5,
                }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  p: 1.5,
                }}
              >
                <img
                  src={LogoKemenag}
                  alt="Kemenag"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  mb: 2,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Portal Insan Al-Qur'an
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Direktorat GTK-Madrasah
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                }}
              >
                Direktorat Jenderal Pendidikan Islam
                <br />
                Kementerian Agama
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.8 }}
              >
                Platform terpadu untuk manajemen dan pengembangan kompetensi
                guru dan tenaga kependidikan madrasah
              </Typography>
            </Box>
          </Box>

          {/* RIGHT SIDE - Login Form */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Mobile Header */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  p: 1,
                }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  p: 1,
                }}
              >
                <img
                  src={LogoKemenag}
                  alt="Kemenag"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>

            <Card
              sx={{
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                <Stack spacing={0.5} sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Selamat Datang
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Masuk ke akun Anda untuk melanjutkan
                  </Typography>
                </Stack>

                {loginError && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "error.light",
                    }}
                  >
                    {loginError}
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2.5}>
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
                          variant="outlined"
                          autoComplete="username"
                          autoFocus
                          error={!!errors.identifier}
                          helperText={errors.identifier?.message}
                          placeholder="Masukkan username Anda"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              fontSize: "1rem",
                              "& fieldset": {
                                borderColor: "divider",
                                borderWidth: 1.5,
                              },
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                              "&.Mui-focused fieldset": {
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "0.95rem",
                              fontWeight: 500,
                            },
                          }}
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
                          variant="outlined"
                          autoComplete="current-password"
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          placeholder="Masukkan password Anda"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={handleClickShowPassword}
                                  sx={{ color: "text.secondary" }}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              fontSize: "1rem",
                              "& fieldset": {
                                borderColor: "divider",
                                borderWidth: 1.5,
                              },
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                              "&.Mui-focused fieldset": {
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "0.95rem",
                              fontWeight: 500,
                            },
                          }}
                        />
                      )}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      startIcon={!isLoading && <LoginOutlined />}
                      sx={{
                        mt: 2,
                        py: 1.75,
                        borderRadius: 2,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        boxShadow: (theme) =>
                          `0 8px 20px ${alpha(
                            theme.palette.primary.main,
                            0.3
                          )}`,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: (theme) =>
                            `0 12px 28px ${alpha(
                              theme.palette.primary.main,
                              0.4
                            )}`,
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Masuk"
                      )}
                    </Button>
                  </Stack>

                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Belum memiliki akun?{" "}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/register")}
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Daftar sekarang
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </CardContent>
            </Card>
            <Typography
              variant="caption"
              sx={{
                display: { xs: "block", md: "none" },
                textAlign: "center",
                mt: 3,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              © 2025 Kementerian Agama RI
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
