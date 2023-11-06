import { Box, Divider, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import { StyledDivider } from "../components/StyledDivider";
import FriendCard from "../components/FriendCard";
import FriendRequestCard from "../components/FriendRequestCard";
import Navbar from "../components/Navbar";
import LoadingContainer from "../components/LoadingContainer";
import { fetchUserData } from "../utility/firebase";

const RequestsPage = () => {
  const theme = useTheme();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [selected, setSelected] = useState("requests");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const uid = localStorage.getItem("uid");
      const userInfo = await fetchUserData(uid);
      const { Friends: fetchedFriends, Requests: fetchedRequests } = userInfo;

      setFriends(fetchedFriends);
      setFriendRequests(fetchedRequests);

      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Box
        sx={{ backgroundColor: theme.palette.primary[1], minHeight: "100%" }}
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
              src={photoUrl}
              sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </Box>
          <StyledDivider />
          {friends.length === 0 ? (
            <Typography variant="p">No friends, start matching!</Typography>
          ) : (
            <Typography variant="p">Your Friends</Typography>
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
              mb: 4,
            }}
          >
            {friends.map((match, index) => (
              <>
                <FriendCard key={index} person={match} photoURL={photoUrl} />
                {index < friends.length - 1 && (
                  <Divider
                    sx={{
                      backgroundColor: theme.palette.text.primary,
                      height: "3px",
                      width: "100%",
                      borderRadius: "3px",
                    }}
                  />
                )}
              </>
            ))}
          </Box>
          <StyledDivider />
          {friendRequests.length === 0 ? (
            <Typography variant="p">No new friend requests yet!</Typography>
          ) : (
            <Typography variant="p">Your Friend Requests</Typography>
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
            {friendRequests.map((match, index) => (
              <FriendRequestCard
                key={index}
                person={match}
                photoURL={photoUrl}
              />
            ))}
          </Box>
        </Container>
        <Navbar selected={selected} setSelected={setSelected} />
      </Box>
    </LoadingContainer>
  );
};

export default RequestsPage;
