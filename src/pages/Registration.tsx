import type { FormEvent } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoginMutation, useRegistrationMutation } from "../services";

const DEFAULT_AVATAR =
  "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [registerUser, { isLoading }] = useRegistrationMutation();
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const avatar = avatarUrl || DEFAULT_AVATAR;

    try {
      await registerUser({ name, email, password, avatar }).unwrap();

      const response = await login({ email, password }).unwrap();

      Cookies.set("accessToken", response.access_token, { secure: true });
      Cookies.set("refreshToken", response.refresh_token, { secure: true });

      navigate("/");
    } catch (error) {
      setOpenSnackbar(true);
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h4" align="center">
            Register
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Avatar URL (optional)"
            variant="outlined"
            fullWidth
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Stack>
      </form>

      <Stack pt={1}>
        <Link
          underline="none"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          <Typography textAlign="center">Back to login</Typography>
        </Link>
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" onClose={handleSnackbarClose}>
          Failed to register
        </Alert>
      </Snackbar>
    </Container>
  );
};
