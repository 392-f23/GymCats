import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PersonCard from "../components/PersonCard";
import Container from "../components/Container";
import { StyledDivider } from "../components/StyledDivider";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import {
  addNotInterested,
  addInterested,
  db,
  fetchAllData,
} from "../utility/firebase";
import LoadingContainer from "../components/LoadingContainer";
import { getNaiveMatches } from "../utility/naiveMatch";

function HomePage() {
  const theme = useTheme();
  const curUserID = localStorage.getItem("uid");
  const [matches, setMatches] = useState([]);
  //array of uids for current user that is not interested!
  const [notInterested, setNotInterested] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState({});
  const [refetch, setRefetch] = useState(false);

  const handleNotInterested = async (id) => {
    //this call does update the DB!
    await addNotInterested(id);
    //we still might want the state to be in sync with db state! Tack on the new id val!
    setNotInterested((prev) => [...prev, id]);
    setRefetch(!refetch);
  };

  const handleInterested = (name, id) => {
    alert(
      "We have sent a notification to " + name + " that you are interested!"
    );
    //makes call to firebase utility function => will modify interested field of database doc on back-end!
    addInterested(id);
  };
  //every time component renders, we want to set not interseted based on the document's latest info!
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setAllData(await fetchAllData());
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

      //every time home page loads, get list of unwated uid and update the state!
      const curDocRef = doc(db, "users", curUserID);
      const curDocSnap = await getDoc(curDocRef);
      var listOfUnwantedUID = [];
      if (curDocSnap.exists()) {
        const curDocData = curDocSnap.data();
        listOfUnwantedUID = curDocData["NotInterested"];
        setNotInterested(listOfUnwantedUID);
      }

      const naiveMatches = getNaiveMatches(await fetchAllData(), curUserID);
      setMatches(naiveMatches);
      setIsLoading(false);
    };
    init();
  }, [refetch]);

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
