import "../App.css";
import ToggleButton from "../components/ToggleButton";
import SignInButton from "../components/SignInButton";
import { Box } from "@mui/material";

const LoginPage = () => {
    return (
        <div className="login-container">
            <h1>Welcome to GymCats!</h1>
            <SignInButton/>
            <br></br>
            <ToggleButton label={"Test"} value={"test"} onChange={""} />
        </div>
    );
}

export default LoginPage;