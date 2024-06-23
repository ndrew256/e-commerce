import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { UserProfileDto } from "../services";
import { userApi, useUpdateUserProfileMutation } from "../services";

type EditProfileDialogProps = {
  open: boolean;
  onClose: () => void;
  user: UserProfileDto;
};

export const EditProfileDialog = ({
  open,
  onClose,
  user,
}: EditProfileDialogProps) => {
  const { id, email, name, password, role, avatar } = user ?? {};

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const dispatch = useDispatch();

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newRole, setNewRole] = useState(role);
  const [newAvatar, setNewAvatar] = useState(avatar);

  const [error, setError] = useState("");

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleSubmit = async () => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await updateUserProfile({
        id: id,
        name: newName,
        email: newEmail,
        avatar: newAvatar,
        role: newRole,
        password: newPassword,
      }).unwrap();

      onClose();
      setError("");

      dispatch(userApi.util.resetApiState());
    } catch (err) {
      setOpenSnackBar(true);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(err.data.message);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            type="text"
            fullWidth
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setError("");
              onClose();
            }}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isLoading}
            variant="contained"
          >
            {isLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackBar(false)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
