import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signUpWithGoogle } from "../utility/firebase";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => signUpWithGoogle(navigate)}
      startIcon={<GoogleIcon sx={{ width: "40px", height: "40px" }} />}
      sx={{
        marginTop: "50px",
        width: "90%",
        height: "60px",
        color: "#ffffff",
        fontWeight: "bolder",
        borderRadius: "30px",
        fontSize: "1rem",
      }}
    >
      Sign In With Google
    </Button>
  );
};

export default SignInButton;
