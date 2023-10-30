import React, {useState} from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PersonCard from "../components/PersonCard";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import { StyledDivider } from "../components/StyledDivider";
import { dummyMatches } from "../assets/dummydata";
import Navbar from "../components/Navbar";
import {computeMatchesBasedOnEncoding} from "../utility/knn"; 

function HomePage() {
  const theme = useTheme();
  const [matches, setMatches] = useState(dummyMatches);
  const [selected, setSelected] = useState('home')
  const handleNotInterested = (id) => {
    console.log("called")
    setMatches(matches.filter(match => match.personal_info.id !== id))
    console.log(matches)
  }

  const handleInterested = (name, id) => {
    alert("We have sent a notification to " + name + " that you are interested!")
    setMatches(matches.filter(match => match.personal_info.id !== id))
  }
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
        {
          matches.length === 0 ? <Typography variant="p">No new matches yet!</Typography> : 
          <Typography variant="p">You have some new matches!</Typography>
        }
        
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
          {matches.map((match) => (
            <PersonCard person={match} photoURL={photoUrl} handleInterested={handleInterested} handleNotInterested={handleNotInterested}/>
          ))}
        </Box>
      </Container>
      <Navbar selected={selected} setSelected={setSelected}/>
    </Box>
  );
}

export default HomePage;
