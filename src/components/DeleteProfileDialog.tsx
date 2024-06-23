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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useDeleteUserProfileMutation, userApi } from "../services";

type DeleteProfileDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: number;
};

export const DeleteProfileDialog = ({
  open,
  onClose,
  userId,
}: DeleteProfileDialogProps) => {
  const [error, setError] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [deleteUserProfile, { isLoading }] = useDeleteUserProfileMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserProfile(userId).unwrap();

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      navigate("/login");

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
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? <CircularProgress size={24} /> : "Delete"}
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
