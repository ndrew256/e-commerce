import type { KeyboardEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?title=${searchTerm}`);
    setSearchTerm("");
  };

  const onEnterDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        value={searchTerm}
        placeholder="Search Products"
        size="small"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onEnterDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                edge="end"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: 200,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
          " label": { display: "none" },
        }}
      />
    </Box>
  );
};
