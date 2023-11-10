import { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import Container from "../components/Container";
import { submitFormInformation, fetchPersonalData } from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";

const EditPreferencePage = () => {
  // const uid = localStorage.getItem("uid");
  // const userData = fetchUserData(uid)
  const theme = useTheme();
  const navigate = useNavigate();
  const [dbState, setDBState] = useState({
    PartnerPreferences: {}, //userData.PartnerPreferences
  });

  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");

  const getInitialData = async () => {
    setIsLoading(true);
    const data = await fetchPersonalData();
    const { displayName: fetchedName } = data;
    setDisplayName(fetchedName);
    setDBState(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary[1],
        }}
      >
        <ProfileHeader displayName={displayName} />
        <Box>
          <Container>
            <MultiSelect
              label={"Gender"}
              dbUpdate={setDBState}
              dbState={dbState}
              dbKey={["PartnerPreferences", "Gender"]}
              showNoPreference={true}
              options={["Male", "Female", "Nonbinary", "Other"]}
            />
            <SingleSelect
              label={"Age"}
              options={["18-20", "20-30", "30-40", "40+"]}
              values={["18-20", "20-30", "30-40", "40+"]}
              dbUpdate={setDBState}
              dbState={dbState}
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
              dbUpdate={setDBState}
              dbState={dbState}
              dbKey={["PartnerPreferences", "ExperienceLevel"]}
            />

            <MultiSelect
              label={"Gym Preference"}
              dbUpdate={setDBState}
              dbState={dbState}
              dbKey={["PartnerPreferences", "GymPreference"]}
              options={["SPAC", "Blomquist"]}
            />
            <MultiSelect
              label={"Usual Workout Time"}
              dbUpdate={setDBState}
              dbState={dbState}
              dbKey={["PartnerPreferences", "UsualWorkoutTime"]}
              options={["Morning", "Afternoon", "Night"]}
            />
            <MultiSelect
              label={"Goals"}
              dbUpdate={setDBState}
              dbState={dbState}
              dbKey={["PartnerPreferences", "Goals"]}
              options={["Powerlifting", "Bodybuilding", "Weightloss"]}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "100px",
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
                onClick={() => {
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
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Discard
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </LoadingContainer>
  );
};

export default EditPreferencePage;
