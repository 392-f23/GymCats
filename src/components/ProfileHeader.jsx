import { Box, Typography, useTheme } from "@mui/material";

const ProfileHeader = ({ displayName }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[2],
        height: "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: "50px",
        borderBottomRightRadius: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={localStorage.getItem("photoUrl")}
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <Typography variant="h5">Welcome Back, {displayName}!</Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
