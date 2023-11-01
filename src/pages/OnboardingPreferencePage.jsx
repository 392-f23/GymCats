import { Box, Typography, Button, useTheme } from "@mui/material";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import submitFormInformation from "../utility/firebase";
import { StyledDivider } from "../components/StyledDivider";

const OnboardingPreferencePage = ({
  updateDB,
  previousStep,
  nextStep,
  dbState,
}) => {
  const theme = useTheme();

  const GoBack = () => {
    previousStep();
  };

  const Continue = () => {
    submitFormInformation(dbState);
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
            Hi David, please fill out the characteristics of you preferred
            partner!
          </Typography>
          <MultiSelect
            label={"Gender"}
            options={[
              "Male",
              "Female",
              "Nonbinary",
              "Other",
              "No Preference"
            ]}
            values={[
              "male",
              "female",
              "nonbinary",
              "other",
              "no preference"
            ]}
            dbState={dbState}
            dbUpdate={updateDB}
            dbKey={["PartnerPreferences", "Gender"]}
          />
          <SingleSelect
            label={"Age"}
            options={["18-20", "20-30", "30-40", "40+"]}
            values={["18-20", "20-30", "30-40", "40+"]}
            dbState={dbState}
            dbUpdate={updateDB}
            dbKey={["PartnerPreferences", "Age"]}
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
            dbKey={["PartnerPreferences", "ExperienceLevel"]}
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
            Finish
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingPreferencePage;
