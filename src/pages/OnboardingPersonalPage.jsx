import { Box, Typography, Button, useTheme } from "@mui/material";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import TextInput from "../components/TextInput";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import { StyledDivider } from "../components/StyledDivider";
import { handleLogOut } from "../utility/firebase";
import { useNavigate } from "react-router-dom";
import submitFormInformation from "../utility/firebase";

const OnboardingPersonalPage = ({
  updateDB,
  previousStep,
  nextStep,
  dbState,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const GoBack = async () => {
    console.log(dbState);
    await submitFormInformation(dbState);
    handleLogOut(navigate);
    previousStep();
  };

  const Continue = () => {
    nextStep();
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[1] }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">GymCats</Typography>
          <Box
            component="img"
            src={photoUrl}
            sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </Box>
        <StyledDivider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="p" sx={{ mb: 4 }}>
            Hi David, please fill out your information!
          </Typography>
          <MultiSelect
            label={"Gender"}
            dbUpdate={updateDB}
            dbState={dbState}
            dbKey={["PersonalData", "Gender"]}
            options={["Male", "Female", "Nonbinary", "Other"]}
          />
          <TextInput
            label={"Age"}
            dbState={dbState}
            dbUpdate={updateDB}
            dbKey={["PersonalData", "Age"]}
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
            dbState={dbState}
            dbUpdate={updateDB}
            dbKey={["PersonalData", "ExperienceLevel"]}
          />
          <MultiSelect
            label={"Gym Preference"}
            dbUpdate={updateDB}
            dbState={dbState}
            dbKey={["PersonalData", "GymPreference"]}
            options={["SPAC", "Blomquist"]}
          />
          <MultiSelect
            label={"Usual Workout Time"}
            dbUpdate={updateDB}
            dbState={dbState}
            dbKey={["PersonalData", "UsualWorkoutTime"]}
            options={["Morning", "Afternoon", "Night"]}
          />
          <MultiSelect
            label={"Goals"}
            dbUpdate={updateDB}
            dbState={dbState}
            dbKey={["PersonalData", "Goals"]}
            options={["Powerlifting", "Bodybuilding", "Weightloss"]}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignitems: "center",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={GoBack}
            sx={{
              borderRadius: "40px",
              mr: 4,
              "&:hover": {
                backgroundColor: theme.palette.primary[3],
              },
            }}
          >
            Go Back
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={Continue}
            sx={{
              borderRadius: "40px",
              backgroundColor: theme.palette.primary[2],
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.primary[4],
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingPersonalPage;
