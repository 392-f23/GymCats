import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";

const OnboardingPreferencePage = ({ previousStep, nextStep }) => {
  const navigate = useNavigate();

  const GoBack = () => {
    previousStep();
  }

  const Continue = () => {
    // todo: submit to database
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
            Hi David, please fill out the characteristics of you preferred
            partner!
          </Typography>
          <MultiSelect label={"Gender"} showNoPreference={true} />
          <SingleSelect
            label={"Age"}
            options={["18-20", "20-30", "30-40", "40+"]}
            values={["18-20", "20-30", "30-40", "40+"]}
          />
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
        <Button fullWidth variant="contained" onClick={Continue}>
          Finish
        </Button>
      </Container>
    </Box>
  );
};

export default OnboardingPreferencePage;
