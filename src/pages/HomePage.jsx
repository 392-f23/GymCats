import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PersonCard from "../components/PersonCard";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import { StyledDivider } from "../components/StyledDivider";

function HomePage() {
  const theme = useTheme();
  const person1 = {
    personal_info: {
      Age: 20,
      Experience_Level: "5+ years",
      Goals: "Lose weight",
      Gym_Preference: "SPAC",
      Major: "CS",
      School: "McCormick",
      Usual_Workout_Time: "10:00-12:00",
      Workout_Frequency: 3,
      Gender: "Male",
      Name: "Ronnie Coleman",
    },
  };
  const person2 = {
    personal_info: {
      Age: 21,
      Experience_Level: "5+ years",
      Goals: "Bodybuilding",
      Gym_Preference: "Blomquist",
      Major: "Theater",
      School: "WCAS",
      Usual_Workout_Time: "12:00-3:00",
      Workout_Frequency: 3,
      Gender: "Male",
      Name: "Chris Bumstead",
    },
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
        <Typography variant="p">You have some new matches!</Typography>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            mt: 2,
          }}
        >
          <PersonCard person={person1} photoURL={photoUrl} />
          <PersonCard person={person2} photoURL={photoUrl} />
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
