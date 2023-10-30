import "../App.css";
import SignInButton from "../components/SignInButton";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box className="login-container">
      <Typography variant="h1">Welcome to GymCats!</Typography>
      <SignInButton />
    </Box>
  );
};

export default LoginPage;
