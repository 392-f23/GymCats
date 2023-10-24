import { Button, styled } from "@mui/material";
import { useState } from "react";

function ToggleButton({ label, value, onToggle }) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    onToggle(value);
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.text.secondary),
    borderRadius: "20px",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.primary[3],
    },
    "&.button-selected": {
      backgroundColor: theme.palette.primary[2],
      color: theme.palette.getContrastText(theme.palette.text.primary),
    },
    "&.button-selected:hover": {
      backgroundColor: theme.palette.primary[4],
    },
  }));

  return (
    <StyledButton
      variant="contained"
      onClick={handleToggle}
      className={toggle ? "button-selected" : ""}
      sx={{ mr: 2, mb: 2 }}
    >
      {label}
    </StyledButton>
  );
}

export default ToggleButton;
