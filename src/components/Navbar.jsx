import { Box, Button, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";

function Navbar({ selected, setSelected, hasMatches = false, hasFriendRequests = false }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [requestsNotification, setRequestsNotification] = useState(hasFriendRequests);
  const [homeNotification, setHomeNotification] = useState(hasMatches);

  const NotificationDot = styled(Box)(({ theme }) => ({
    width: "21px",
    height: "21px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary[5],
    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
    position: "absolute",
    top: "-2px",
    right: "-2px",
  }));

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
        onClick={() => 
          {setSelected("requests");
          navigate("/requests")}
        }
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
        {requestsNotification ? (<NotificationDot />) : null}
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
        onClick={() => {
          setSelected("home");
          navigate("/home");
        }}
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
        {homeNotification ? (<NotificationDot />) : null}
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
        onClick={() => {
          setSelected("profile");
          navigate("/profile");
        }}
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
