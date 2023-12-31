import { Box, Divider, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import { StyledDivider } from "../components/StyledDivider";
import FriendCard from "../components/FriendCard";
import FriendRequestCard from "../components/FriendRequestCard";
import LoadingContainer from "../components/LoadingContainer";
import { fetchUserData, db } from "../utility/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const RequestsPage = () => {
  const theme = useTheme();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const init = async () => {
      const userInfo = await fetchUserData(uid);
      const { Friends: friendUids, Requests: requestUids } = userInfo;

      const friendPromises = [];
      friendUids.forEach((friendUid) => {
        friendPromises.push(
          new Promise(async function (resolve, reject) {
            const requestData = await fetchUserData(friendUid);
            resolve(requestData);
          })
        );
      });

      const tempFriends = [];

      if (friendPromises.length > 0) {
        await Promise.all(friendPromises).then((userData) => {
          userData.forEach((ud) => {
            tempFriends.push(ud);
          });
        });
      }

      const requestPromises = [];
      requestUids.forEach((requestUid) => {
        requestPromises.push(
          new Promise(async function (resolve, reject) {
            const requestData = await fetchUserData(requestUid);
            resolve(requestData);
          })
        );
      });

      const tempRequests = [];
      //if there is at least 1 request received...
      if (requestPromises.length > 0) {
        await Promise.all(requestPromises).then((userData) => {
          //this resolved userDAta is array of resolved promise objs => each obj describing a user that sent request to the logged in
          //user!
          userData.forEach((ud) => {
            tempRequests.push(ud);
          });
        });
      }

      setFriends(tempFriends);
      setFriendRequests(tempRequests);
      setIsLoading(false);
      setReload(false);
    };
    init();
  }, [refetch]);

  useEffect(() => {
    if (reload) {
      setRefetch(!refetch);
    }
  }, [reload]);

  const requestListener = onSnapshot(doc(db, "users", uid), (doc) => {
    const data = doc.data();
    const { Requests } = data;
    const prevRequestLength = localStorage.getItem("prevRequestLength") || -1;

    if (prevRequestLength != -1 && Requests.length > prevRequestLength) {
      setReload(true);
    }
  });

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
              src={localStorage.getItem("photoUrl")}
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
                <FriendCard
                  key={index}
                  person={match}
                  refetch={refetch}
                  setRefetch={setRefetch}
                />
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
                refetch={refetch}
                setRefetch={setRefetch}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </LoadingContainer>
  );
};

export default RequestsPage;
