import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledDivider } from "../components/StyledDivider";
import photoUrl from "../assets/profile.jpeg";

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[1], height: "100%" }}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary[2],
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            src={photoUrl}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "30px",
            }}
          />
          <Typography variant="h1">Welcome Back, David!</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "calc(100% - 210px)",
          padding: "30px 5%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box sx={{ marginBottom: "30px" }}>
            <Typography variant="h3">Personal</Typography>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/profile/edit/personal")}
            >
              <Typography variant="h5">Edit Personal Detail</Typography>
            </Box>
          </Box>
          <StyledDivider />
          <Box>
            <Typography variant="h3">Preference</Typography>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/profile/edit/preference")}
            >
              <Typography variant="h5">Edit Preference Detail</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "40px",
              backgroundColor: theme.palette.primary["warning"],
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.primary["warning"],
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
