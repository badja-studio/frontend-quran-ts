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
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import {
  MenuBook as MenuBookIcon,
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Badge,
} from "@mui/icons-material";
import authService from "../services/auth.service";

type LoginType = "email" | "username" | "siaga";

interface LoginFormInputs {
  identifier: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginType, setLoginType] = useState<LoginType>("email");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginTypeChange = (
    _event: React.SyntheticEvent,
    newValue: LoginType
  ) => {
    setLoginType(newValue);
    setLoginError("");
    reset(); // Clear form when switching tabs
  };

  const getIdentifierLabel = () => {
    switch (loginType) {
      case "email":
        return "Email";
      case "username":
        return "Username";
      case "siaga":
        return "Nomor Siaga";
      default:
        return "Email";
    }
  };

  const getIdentifierValidation = () => {
    const baseValidation = {
      required: `${getIdentifierLabel()} wajib diisi`,
    };

    if (loginType === "email") {
      return {
        ...baseValidation,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Format email tidak valid",
        },
      };
    } else if (loginType === "siaga") {
      return {
        ...baseValidation,
        pattern: {
          value: /^[0-9]+$/,
          message: "Nomor siaga hanya boleh berisi angka",
        },
      };
    }

    return {
      ...baseValidation,
      minLength: {
        value: 3,
        message: "Minimal 3 karakter",
      },
    };
  };

  const onSubmit = async (data: LoginFormInputs) => {
    // Clear previous errors
    setLoginError("");
    setIsLoading(true);

    try {
      // Prepare credentials based on login type
      const credentials = {
        username: data.identifier,
        password: data.password,
      };

      // Call login API
      const response = await authService.login(credentials);

      if (response.success && response.data) {

        // Success - redirect based on role
        const role = response.data.user.role.toLowerCase();

        // Navigate to appropriate dashboard
        if (role === "admin") {
          navigate("/dashboard/admin");
        } else if (role === "assessor" || role === "guru") {
          navigate("/dashboard/asesor/siap-asesmen");
        } else if (role === "assessee" || role === "siswa") {
          navigate("/peserta");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Login failed
        setLoginError(response.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <MenuBookIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue to Quran App
          </Typography>
        </Box>

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}

            {/* Login Type Tabs */}
            <Tabs
              value={loginType}
              onChange={handleLoginTypeChange}
              variant="fullWidth"
              sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                icon={<Email />}
                iconPosition="start"
                label="Email"
                value="email"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<Person />}
                iconPosition="start"
                label="Username"
                value="username"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<Badge />}
                iconPosition="start"
                label="Nomor Siaga"
                value="siaga"
                sx={{ textTransform: "none" }}
              />
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="identifier"
                control={control}
                rules={getIdentifierValidation()}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={getIdentifierLabel()}
                    margin="normal"
                    variant="outlined"
                    autoComplete={loginType === "email" ? "email" : "username"}
                    autoFocus
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                    placeholder={
                      loginType === "email"
                        ? "contoh@email.com"
                        : loginType === "username"
                          ? "username123"
                          : "12345678"
                    }
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
                  "Sign In"
                )}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
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
                    Sign Up
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
