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

function PersonCard({ person }) {
    const info = person.personal_info
    const age = info.Age
    const experience = info.Experience_Level
    const goal = info.Goals
    const gym = info.Gym_Preference
    const major = info.Major
    const school = info.School
    const time = info.Usual_Workout_Time
    const freq = info.Workout_Frequency
    const gender = info.Gender

  return (
    <Box sx={{
        display: "flex"
    }}>
        <Typography>Ronnie</Typography>
        <Typography>{school} | {major}</Typography>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <Typography>Experience Level:</Typography>
        </Box>
        
    </Box>
  )
}

export default PersonCard