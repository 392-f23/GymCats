import "../App.css";
import SignInButton from "../components/SignInButton";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Welcome to GymCats!</h1>
      <SignInButton />
    </div>
  );
};

export default LoginPage;
