import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  CircularProgress,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetUserProfileQuery, userApi } from "../services";
import { SearchComponent } from "./SearchComponent.tsx";

export const Header = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggedIn = Cookies.get("accessToken");

  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  const { avatar, name } = data ?? {};

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    navigate("/login");

    dispatch(userApi.util.resetApiState());

    handleMenuClose();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link
            variant="h6"
            component="div"
            underline="none"
            sx={{ flexGrow: 1, color: "white", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            L O G O
          </Link>

          {isLoggedIn && (
            <Stack direction="row" alignItems="center" gap={2}>
              <SearchComponent />
              <Link
                underline="none"
                onClick={() => navigate("/")}
                sx={{ color: "white", cursor: "pointer" }}
              >
                <Typography>Categories</Typography>
              </Link>
              <IconButton onClick={handleMenuOpen}>
                {isLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Avatar alt={name} src={avatar} />
                )}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Stack p={3} mt={1}>
        {children}
      </Stack>
    </>
  );
};
