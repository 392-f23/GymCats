import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Email, Home, Person } from '@mui/icons-material';
function Navbar({selected, setSelected}) {

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#17459F'}}>
        <Button sx={{ backgroundColor: selected === 'home' ? '#5197E9' : 'inherit', 
                    borderRadius: selected === 'home' ? '50%' : '0',
                    '&:hover': {
                        backgroundColor: selected === 'home' ? '#5197E9' : '#17459F', // Set the same background color on hover
                      }, }} 
            onClick={() => setSelected('home')}> 
            <HomeOutlinedIcon  sx={{color: selected === 'home' ? '#000000' : '#FFFFFF'}}/>
        </Button>
        <Button sx={{ backgroundColor: selected === 'requests' ? '#5197E9' : 'inherit', borderRadius: selected === 'requests' ? '50%' : '0' }}
            onClick={() =>  setSelected('requests')}> 
            <EmailOutlinedIcon  sx={{color: selected === 'requests' ? '#000000' : '#FFFFFF'}}/>
        </Button>
        <Button sx={{ backgroundColor: selected === 'profile' ? '#5197E9' : 'inherit', borderRadius: selected === 'profile' ? '50%' : '0'}}
            onClick={() => setSelected('profile')}> 
            <PersonOutlineOutlinedIcon sx={{color: selected === 'profile' ? '#000000' : '#FFFFFF'}}/>
        </Button>

    </Box>
  )
}

export default Navbar