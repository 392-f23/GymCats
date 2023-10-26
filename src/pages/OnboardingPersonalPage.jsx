import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import TextInput from "../components/TextInput";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";

const OnboardingPersonalPage = ({ previousStep, nextStep }) => {
  const navigate = useNavigate();

  const GoBack = () => {
    // todo: make user sign out
    previousStep();
  }

  const Continue = () => {
    nextStep();
  }

  return (
    <Box sx={{ backgroundColor: "#21212F" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>GymCats</h1>
          <Box
            component="img"
            src={photoUrl}
            sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </Box>
        <hr />
        <Box>
          <Typography
            variant="h1"
            style={{ fontSize: "1em", marginBottom: "20px" }}
          >
            Hi David, please fill out your information!
          </Typography>
          <MultiSelect label={"Gender"} />
          <TextInput label={"Age"} />
          <SingleSelect
            label={"Experience Level"}
            options={[
              "Beginner (<1 year)",
              "Intermediate (1-3 years)",
              "Advanced (3-5 years)",
              "Expert (5+ years)",
            ]}
            values={["beginner", "intermediate", "advanced", "expert"]}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={Continue}
        >
          Continue
        </Button>
      </Container>
    </Box>
  );
};

export default OnboardingPersonalPage;
