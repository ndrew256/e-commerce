import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">
        Page not found. You will be redirected to the homepage.
      </Typography>
    </Box>
  );
};
