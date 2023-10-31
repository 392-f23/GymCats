import { Box, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import MultiSelect from "../components/MultiSelect";
import SingleSelect from "../components/SingleSelect";
import TextInput from "../components/TextInput";
import Container from "../components/Container";

const EditPersonalPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[1], height: "100%" }}>
      <ProfileHeader />
      <Container>
        <MultiSelect
          label={"Gender"}
          dbUpdate={null}
          dbKey={["PersonalData", "Gender"]}
          options={["Male", "Female", "Nonbinary", "Other"]}
        />
        <TextInput
          label={"Age"}
          dbUpdate={null}
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
          dbUpdate={null}
          dbKey={["PersonalData", "ExperienceLevel"]}
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
          >
            Discard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditPersonalPage;