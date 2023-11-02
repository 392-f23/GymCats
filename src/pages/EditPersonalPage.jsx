import { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import TextInput from "../components/TextInput";
import Container from "../components/Container";
import {submitFormInformation, fetchUserData} from "../utility/firebase";
 
const EditPersonalPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dbState, setDBState] = useState({
    PersonalData: {}
  });
  console.log("Edit personal page: ")
  console.log(dbState); 

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[1], minHeight: "100%" }}>
      <ProfileHeader />
      <Container>
        <MultiSelect
          label={"Gender"}
          dbUpdate={setDBState}
          dbState={dbState}
          dbKey={["PersonalData", "Gender"]}
          options={["Male", "Female", "Nonbinary", "Other"]}
        />
        <TextInput
          label={"Age"}
          dbUpdate={setDBState}
          dbState={dbState}
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
          dbUpdate={setDBState}
          dbState={dbState}
          dbKey={["PersonalData", "ExperienceLevel"]}
        />
        <MultiSelect
          label={"Gym Preference"}
          dbUpdate={setDBState}
          dbState={dbState}
          dbKey={["PersonalData", "GymPreference"]}
          options={["SPAC", "Blomquist"]}
        />
          <MultiSelect
          label={"Usual Workout Time"}
          dbUpdate={setDBState}
          dbState={dbState}
          dbKey={["PersonalData", "UsualWorkoutTime"]}
          options={["Morning", "Afternoon", "Night"]}
        />
          <MultiSelect
          label={"Goals"}
          dbUpdate={setDBState}
          dbState={dbState}
          dbKey={["PersonalData", "Goals"]}
          options={["Powerlifting", "Bodybuilding", "Weightloss"]}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "40px",
              marginRight: "30px",
              backgroundColor: theme.palette.primary["main"],
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.primary["main"],
              },
            }}
            onClick = {() => {
              submitFormInformation(dbState);
              navigate("/profile"); 
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "40px",
              backgroundColor: theme.palette.primary["warning"],
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.primary["warning"],
              },
            }}
            onClick={() => navigate("/profile")}
          >
            Discard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditPersonalPage;
