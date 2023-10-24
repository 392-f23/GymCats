import "../App.css";
import SignInButton from "../components/SignInButton";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import TextInput from "../components/TextInput";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Welcome to GymCats!</h1>
      <SignInButton />
      <br></br>
      <MultiSelect label={"Gender"} />
      <br></br>
      <SingleSelect
        label={"Gender"}
        options={["Male", "Female", "Nonbinary", "Other"]}
        values={["male", "female", "nonbinary", "other"]}
      />
      <br></br>
      <TextInput label={"Age"} />
    </div>
  );
};

export default LoginPage;
