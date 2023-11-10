import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledDivider } from "../components/StyledDivider";
import ProfileHeader from "../components/ProfileHeader";
import { fetchUserData, handleLogOut } from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const uid = localStorage.getItem("uid");
      const userInfo = await fetchUserData(uid);
      const { displayName: fetchedName } = userInfo;
      setDisplayName(fetchedName);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Box sx={{ backgroundColor: theme.palette.primary[1], height: "100%" }}>
        <ProfileHeader displayName={displayName} />
        <Box
          sx={{
            height: "calc(100% - 300px)",
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
              onClick={() => handleLogOut(navigate)}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </LoadingContainer>
  );
};

export default ProfilePage;
