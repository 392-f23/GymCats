import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PersonCard from "../components/PersonCard";
import Container from "../components/Container";
import { StyledDivider } from "../components/StyledDivider";
import { getDocs, collection } from "firebase/firestore";
import { addNotInterested, addInterested, db } from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";

function HomePage() {
  const theme = useTheme();
  const [matches, setMatches] = useState([]);
  const [notInterested, setNotInterested] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNotInterested = (id) => {
    alert(
      `We have sent a notification to person with id: ${id} that you are't interested!`
    );
    addNotInterested(id);
    setMatches(matches.filter((match) => match.personal_info.id !== id));
  };

  const handleInterested = (name, id) => {
    alert(
      "We have sent a notification to " + name + " that you are interested!"
    );
    console.log(`inside handleInterested id value: ${id}`);
    addInterested(id);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const tempUsers = [];
      //get latest users collection snapshot
      const querySnapshot = await getDocs(collection(db, "users"));
      //for each doc, record it to update home page users state!
      querySnapshot.forEach((document) => {
        const tempObject = document.data();
        const { onboarded } = tempObject;

        if (onboarded) {
          tempUsers.push(Object.assign(tempObject, { uid: document.id }));
        }
      });
      //don't want own card to show up!
      setMatches(
        tempUsers.filter((tu) => {
          return tu.uid !== localStorage.getItem("uid");
        })
      );
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary[1],
          minHeight: "100%",
          height: "100%",
        }}
      >
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
              src={localStorage.getItem("photoUrl")}
              sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </Box>
          <StyledDivider />
          {matches.length === 0 ? (
            <Typography variant="p">No new matches yet!</Typography>
          ) : (
            <Typography variant="p">You have some new matches!</Typography>
          )}
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
            {matches.map((match, index) => (
              <PersonCard
                key={index}
                person={match}
                handleInterested={handleInterested}
                handleNotInterested={handleNotInterested}
              />
            ))}
          </Box>
          <Box sx={{ width: "100%", height: "100px" }} />
        </Container>
      </Box>
    </LoadingContainer>
  );
}

export default HomePage;
