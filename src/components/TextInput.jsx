import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";

function TextInput({ label }) {
  const theme = useTheme();

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <Typography variant="body1" sx={{ mr: 3 }}>
        {label}
      </Typography>
      <TextField
        variant="outlined"
        value={value}
        onChange={handleChange}
        sx={{
          color: theme.palette.text.primary,
        }}
        InputProps={{
          sx: {
            border: "2px solid",
            borderColor: theme.palette.primary[2],
            borderRadius: "40px",
            fontFamily: "Oxygen",
            fontSize: "1rem",
            fontWeight: 400,
            pl: 2,
            pr: 2,
            "& fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary[2],
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary[2],
            },
          },
        }}
        type="number"
      />
    </Box>
  );
}

export default TextInput;
