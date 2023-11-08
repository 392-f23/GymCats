import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonModal from "../components/PersonModal";
import ContactModal from "../components/ContactModal";
import { useState } from "react";

const FriendCard = ({ person, refetch, setRefetch }) => {
  const theme = useTheme();
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const { displayName, photoURL } = person;

  const handlePersonModalOpen = () => setPersonModalOpen(true);
  const handlePersonModalClose = () => setPersonModalOpen(false);
  const handleContactModalOpen = () => setContactModalOpen(true);
  const handleContactModalClose = () => setContactModalOpen(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={photoURL}
            sx={{ width: "50px", height: "50px", borderRadius: "50%", mr: 1 }}
          />
          <Typography variant="h6">{displayName}</Typography>
        </Box>
        <Box>
          <IconButton
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: theme.palette.primary[2],
              mr: 1,
              "&:hover": {
                backgroundColor: theme.palette.primary[4],
              },
            }}
            onClick={handleContactModalOpen}
          >
            <EmailOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
          <IconButton
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: theme.palette.primary[5],
              "&:hover": {
                backgroundColor: theme.palette.primary[6],
              },
            }}
            onClick={handlePersonModalOpen}
          >
            <MoreHorizIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
        </Box>
      </Box>
      <PersonModal
        open={personModalOpen}
        onClose={handlePersonModalClose}
        person={person}
        isFriend={true}
        refetch={refetch}
        setRefetch={setRefetch}
      />
      <ContactModal
        open={contactModalOpen}
        onClose={handleContactModalClose}
        person={person}
        photoURL={photoURL}
      />
    </>
  );
};

export default FriendCard;
