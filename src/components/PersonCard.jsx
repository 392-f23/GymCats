import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import { db, fetchUserData } from "../utility/firebase";
import { doc, updateDoc } from "firebase/firestore";

function PersonCard({
  person,
  handleInterested,
  handleNotInterested,
  showInterestedButtons = true,
  showRemoveButton = false,
  showExpandedIconButton = true,
  handleClose,
  refetch,
  setRefetch,
}) {
  const { PersonalData: info, photoURL, displayName: name, uid: id } = person;
  const {
    Age: age,
    ExperienceLevel: experience,
    Goals: goal,
    GymPreference: gym,
    Major: major,
    School: school,
    UsualWorkoutTime: time,
    WorkoutFrequency: freq,
    Gender: gender,
  } = info;

  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(!showExpandedIconButton);

  const removeFriend = async () => {
    const uid = localStorage.getItem("uid");
    const userInfo = await fetchUserData(uid);
    const { Friends } = userInfo;
    const newFriends = Friends.filter((friendId) => friendId != id);

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      Friends: newFriends,
    });

    const friendInfo = await fetchUserData(id);
    const { Friends: updateFriendList } = friendInfo;
    const newFriendList = updateFriendList.filter(
      (friendId) => friendId != uid
    );
    const friendRef = doc(db, "users", id);
    await updateDoc(friendRef, {
      Friends: newFriendList,
    });

    setRefetch(!refetch);
    handleClose();
  };

  return (
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
            backgroundColor: theme.palette.primary[2],
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 3,
            pb: 3,
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
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
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" color={theme.palette.text.secondary}>
              {name}
            </Typography>
            <Typography variant="p" color={theme.palette.text.secondary}>
              {school} | {major}
            </Typography>
          </Box>
          {showExpandedIconButton ? (
            <IconButton
              sx={{
                ml: 2,
                mr: 2,
                backgroundColor: theme.palette.primary.main,
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.primary[3],
                },
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ExpandLessIcon sx={{ color: theme.palette.text.primary }} />
              ) : (
                <ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />
              )}
            </IconButton>
          ) : (
            <IconButton
              sx={{
                ml: 2,
                mr: 2,
                backgroundColor: theme.palette.primary.main,
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.primary[3],
                },
              }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            pt: 2,
            pb: 2,
          }}
        >
          <Typography
            variant="p"
            color={theme.palette.text.secondary}
            sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
          >
            <span style={{ fontWeight: 700 }}>Experience Level</span>:{" "}
            {experience.charAt(0).toUpperCase() + experience.slice(1)}
          </Typography>
          <Typography
            variant="p"
            color={theme.palette.text.secondary}
            sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
          >
            <span style={{ fontWeight: 700 }}>Usual Workout Time</span>: {time}
          </Typography>
          <Typography
            variant="p"
            color={theme.palette.text.secondary}
            sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
          >
            <span style={{ fontWeight: 700 }}>Goals</span>: {goal}
          </Typography>
          {/* expanded */}
          {isExpanded && (
            <>
              <Typography
                variant="p"
                color={theme.palette.text.secondary}
                sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
              >
                <span style={{ fontWeight: 700 }}>Age</span>: {age}
              </Typography>
              <Typography
                variant="p"
                color={theme.palette.text.secondary}
                sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
              >
                <span style={{ fontWeight: 700 }}>Gender</span>: {gender}
              </Typography>
              <Typography
                variant="p"
                color={theme.palette.text.secondary}
                sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
              >
                <span style={{ fontWeight: 700 }}>Workout Frequency</span>:{" "}
                {freq}x/week
              </Typography>
              <Typography
                variant="p"
                color={theme.palette.text.secondary}
                sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
              >
                <span style={{ fontWeight: 700 }}>Gym Preference</span>:{" "}
                {gym.join(", ")}
              </Typography>
            </>
          )}
          <Box
            sx={{
              width: "89%",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              ml: 2,
              mr: 2,
              mt: 2,
            }}
          >
            {showInterestedButtons && (
              <>
                <Button
                  sx={{
                    width: "45%",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    borderRadius: "40px",
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                    "&:hover": {
                      backgroundColor: theme.palette.primary[3],
                    },
                  }}
                  onClick={() => {
                    handleNotInterested(id);
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "0.9rem" }}>
                    Not Interested
                  </Typography>
                </Button>
                <Button
                  sx={{
                    width: "45%",
                    backgroundColor: theme.palette.primary[2],
                    color: theme.palette.text.secondary,
                    borderRadius: "40px",
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                    "&:hover": {
                      backgroundColor: theme.palette.primary[4],
                    },
                  }}
                  onClick={() => {
                    handleInterested(name, id);
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "0.9rem" }}>
                    I am Interested
                  </Typography>
                </Button>
              </>
            )}
            {showRemoveButton && (
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.primary[5],
                  color: theme.palette.text.primary,
                  borderRadius: "40px",
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                  "&:hover": {
                    backgroundColor: theme.palette.primary[6],
                  },
                }}
                onClick={() => removeFriend()}
              >
                Remove Friend
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PersonCard;
