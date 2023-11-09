import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonModal from "./PersonModal";
import { useState } from "react";
import { db, fetchUserData} from "../utility/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function FriendRequestCard({ person, refetch, setRefetch }) {
  const theme = useTheme();
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const { displayName, photoURL, uid: requestUid } = person;

  const handlePersonModalOpen = () => setPersonModalOpen(true);
  const handlePersonModalClose = () => setPersonModalOpen(false);

  const sendFriendRequest = async () => {
    const uid = localStorage.getItem("uid");
    const userInfo = await fetchUserData(uid);
    const { Requests, Friends } = userInfo;
    //only keep remaining requests that did not get selected! 
    const newRequests = Requests.filter((requestId) => requestId != requestUid);
    Friends.push(requestUid);
    const userRef = doc(db, "users", uid);
    //update logged in user doc since new friend is made! 
    await updateDoc(userRef, {
      Requests: newRequests,
      Friends,
    });
    //the other friend should also add my uid to their friend list as well! 
    const otherRef = doc(db, "users", requestUid);
    const otherDoc = await getDoc(otherRef); 
    const otherFriends = otherDoc.data()["Friends"]; 
    const newFriends = [...otherFriends, uid]; 
    await updateDoc(otherRef, {
      Friends: newFriends, 
    }); 
    setRefetch(!refetch);
  };

  const removeFriendRequest = async () => {
    const uid = localStorage.getItem("uid");
    const userInfo = await fetchUserData(uid);
    //get cur state of requests for user! 
    const { Requests } = userInfo;
    //remove the request that logged in user just rejected! 
    const newRequests = Requests.filter((requestId) => requestId != requestUid);
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      Requests: newRequests,
    });

    //probably want to nullify the logged-in user id by removing it from "SentRequests" field of database document 
    //corresponding to the other user => in other words, the other user's sent request is void due to rejection! 
    const otherInfo = await fetchUserData(requestUid); 
    const {SentRequests} = otherInfo;
    const newOtherSentRequests = SentRequests.filter(sr => sr !== uid); 
    const otherRef = doc(db, "users", requestUid); 
    await updateDoc(otherRef, {
      SentRequests: newOtherSentRequests
    }); 
    setRefetch(!refetch);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "30px",
          width: "100%",
          filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
          mb: 4,
        }}
      >
        <CardContent
          sx={{ padding: 0, "&.MuiCardContent-root:last-child": { pb: 0 } }}
        >
          <Box
            sx={{
              width: "100%",
              height: "auto",
              backgroundColor: theme.palette.text.primary,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 3,
              pb: 3,
            }}
          >
            <Box
              component="img"
              src={photoURL}
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                ml: 2,
                mr: 2,
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                sx={{ textAlign: "center" }}
              >
                {displayName}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Button
                  sx={{
                    backgroundColor: theme.palette.primary[2],
                    mr: 4,
                    borderRadius: "20px",
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                    "&:hover": {
                      backgroundColor: theme.palette.primary[3],
                    },
                  }}
                  onClick={() => sendFriendRequest()}
                >
                  <CheckIcon sx={{ color: theme.palette.text.secondary }} />
                </Button>
                <Button
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "20px",
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                    "&:hover": {
                      backgroundColor: theme.palette.primary[4],
                    },
                  }}
                  onClick={() => removeFriendRequest()}
                >
                  <CloseIcon sx={{ color: theme.palette.text.primary }} />
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "flex-start",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: theme.palette.primary[5],
                  width: "50px",
                  height: "50px",
                  ml: 2,
                  mr: 2,
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                  "&:hover": {
                    backgroundColor: theme.palette.primary[6],
                  },
                }}
                onClick={handlePersonModalOpen}
              >
                <MoreHorizIcon sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <PersonModal
        open={personModalOpen}
        onClose={handlePersonModalClose}
        person={person}
        photoURL={photoURL}
      />
    </>
  );
}

export default FriendRequestCard;
