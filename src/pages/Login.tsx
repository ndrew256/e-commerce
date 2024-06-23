import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      Cookies.set("accessToken", response.access_token, { secure: true });
      Cookies.set("refreshToken", response.refresh_token, { secure: true });

      navigate("/");
    } catch (err) {
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Stack direction="row" alignItems="center" pt={2} gap={0.5}>
          <Typography>Don't have an account?</Typography>
          <Link
            underline="none"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/registration")}
          >
            <Typography>Register</Typography>
          </Link>
        </Stack>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" onClose={handleSnackbarClose}>
          Failed to login
        </Alert>
      </Snackbar>
    </Container>
  );
};
