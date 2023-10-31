import { Box, Typography, useTheme } from "@mui/material";
import photoUrl from "../assets/profile.jpeg";

const ProfileHeader = () => {
  const theme = useTheme();

  return (
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
  );
};

export default ProfileHeader;
