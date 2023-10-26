import React from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function PersonCard({ person, photoURL }) {
  const info = person.personal_info;
  const age = info.Age;
  const experience = info.Experience_Level;
  const goal = info.Goals;
  const gym = info.Gym_Preference;
  const major = info.Major;
  const school = info.School;
  const time = info.Usual_Workout_Time;
  const freq = info.Workout_Frequency;
  const gender = info.Gender;
  const name = info.Name;

  const theme = useTheme();

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
          >
            <MoreHorizIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
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
            {experience}
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
            <span style={{ fontWeight: 700 }}>Workout Frequency</span>: {freq}
          </Typography>
          <Typography
            variant="p"
            color={theme.palette.text.secondary}
            sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
          >
            <span style={{ fontWeight: 700 }}>Goals</span>: {goal}
          </Typography>
          <Typography
            variant="p"
            color={theme.palette.text.secondary}
            sx={{ ml: 2, mr: 2, lineHeight: "2rem" }}
          >
            <span style={{ fontWeight: 700 }}>Gym Preference</span>: {gym}
          </Typography>
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
            <Button
              sx={{
                width: "45%",
                backgroundColor: theme.palette.primary[2],
                color: theme.palette.text.secondary,
                borderRadius: "40px",
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                "&:hover": {
                  backgroundColor: theme.palette.primary[4],
                }
              }}
            >
              <Typography variant="p" sx={{ fontSize: "0.9rem" }}>
                Interested
              </Typography>
            </Button>
            <Button
              sx={{
                width: "45%",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                borderRadius: "40px",
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                "&:hover": {
                  backgroundColor: theme.palette.primary[3],
                }
              }}
            >
              <Typography variant="p" sx={{ fontSize: "0.9rem" }}>
                Not Interested
              </Typography>
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PersonCard;
