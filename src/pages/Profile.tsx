import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useGetUserProfileQuery } from "../services";
import { DeleteProfileDialog, EditProfileDialog } from "../components";

export const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isLoggedIn = Cookies.get("accessToken");

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserProfileQuery(undefined, { skip: !isLoggedIn });

  const { id, avatar, email, name, role, password } = userData ?? {};

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="h6" textAlign="center">
        Error fetching user data.
      </Typography>
    );
  }

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteProfile = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              {`Welcome to your profile, ${name}!`}
            </Typography>
            <Stack mt={2} gap={2} alignItems="center">
              <Avatar
                alt={name}
                src={avatar}
                sx={{ width: 120, height: 120 }}
              />
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6">Name: {name}</Typography>
                <Typography variant="h6">Email: {email}</Typography>
                <Typography variant="h6">Role: {role}</Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  justifyContent="space-between"
                >
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography variant="h6">
                      Password:{" "}
                      {showPassword ? password : "*".repeat(password!.length)}
                    </Typography>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ height: 24, width: 24 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Stack>

                  <Box display="flex" gap={1}>
                    <Button variant="contained" onClick={handleEditProfile}>
                      Edit profile
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteProfile}
                    >
                      Delete profile
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <EditProfileDialog
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        user={userData!}
      />
      <DeleteProfileDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        userId={id!}
      />
    </>
  );
};
