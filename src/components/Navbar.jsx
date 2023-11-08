import React, { useEffect, useState } from "react";
import { Box, Button, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utility/firebase";
import { useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function Navbar({ hasMatches = false }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [hasFriendRequests, setHasFriendRequests] = useState(false);
  const [homeNotification, setHomeNotification] = useState(hasMatches);
  const [selected, setSelected] = useState();
  const location = useLocation();
  const { pathname } = location;

  const uid = localStorage.getItem("uid");

  onSnapshot(doc(db, "users", uid), (doc) => {
    const data = doc.data();
    const { Requests } = data;
    const prevRequestLength = localStorage.getItem("prevRequestLength") || -1;

    if (
      prevRequestLength != -1 &&
      Requests.length > prevRequestLength &&
      !pathname.includes("requests")
    ) {
      setHasFriendRequests(true);
    }
  });

  useEffect(() => {
    const init = () => {
      if (pathname.includes("requests")) {
        setSelected("requests");
        setHasFriendRequests(false);
      }

      if (pathname.includes("home")) {
        setSelected("home");
      }

      if (pathname.includes("profile")) {
        setSelected("profile");
      }
    };
    init();
  }, [pathname]);

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
        onClick={() => {
          setSelected("requests");
          navigate("/requests");
        }}
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
        {hasFriendRequests ? <NotificationDot /> : null}
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
        {homeNotification ? <NotificationDot /> : null}
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
