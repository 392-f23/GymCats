import React from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
import PersonCard from '../components/PersonCard'
function HomePage() {

    const person = {
        personal_info: {
            Age: 20,
            Experience_Level: "3",
            Goals: "Lose weight",
            Gym_Preference: "SPAC",
            Major: "CS",
            School:"McCormick",
            Usual_Workout_Time: "10:00-12:00",
            Workout_Frequency: 3,
            Gender: "Male"
        }
    }

  return (
    <Box>
        <Typography> Hi </Typography>
        <PersonCard person={person}/>
    </Box>
  )
}

export default HomePage