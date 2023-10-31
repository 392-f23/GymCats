import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function Navbar({ selected, setSelected }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "70px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        pt: 2,
        pb: 2,
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
      }}
    >
      <Button
        sx={{
          ml: 2,
          aspectRatio: "1/1",
          backgroundColor:
            selected === "requests" ? theme.palette.primary[2] : "inherit",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor:
              selected === "requests"
                ? theme.palette.primary[4]
                : theme.palette.primary[3],
          },
        }}
        onClick={() => setSelected("requests")}
      >
        <EmailOutlinedIcon
          sx={{
            color:
              selected === "requests"
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            fontSize: "2.5rem",
            filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
          }}
        />
      </Button>
      <Button
        sx={{
          aspectRatio: "1/1",
          backgroundColor:
            selected === "home" ? theme.palette.primary[2] : "inherit",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor:
              selected === "home"
                ? theme.palette.primary[4]
                : theme.palette.primary[3],
          },
        }}
        onClick={() => setSelected("home")}
      >
        <HomeOutlinedIcon
          sx={{
            color:
              selected === "home"
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            fontSize: "2.5rem",
            filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
          }}
        />
      </Button>
      <Button
        sx={{
          mr: 2,
          aspectRatio: "1/1",
          backgroundColor:
            selected === "profile" ? theme.palette.primary[2] : "inherit",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor:
              selected === "profile"
                ? theme.palette.primary[4]
                : theme.palette.primary[3],
          },
        }}
        onClick={() => setSelected("profile")}
      >
        <PersonOutlineOutlinedIcon
          sx={{
            color:
              selected === "profile"
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            fontSize: "2.5rem",
            filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
          }}
        />
      </Button>
    </Box>
  );
}

export default Navbar;
