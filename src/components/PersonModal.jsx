import { Modal } from "@mui/material";
import PersonCard from "./PersonCard";

function PersonModal({ open, onClose, person, photoURL, isFriend = false }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: "5%",
      }}
    >
      <PersonCard
        person={person}
        showInterestedButtons={false}
        showRemoveButton={isFriend}
        showExpandedIconButton={false}
        handleClose={onClose}
      />
    </Modal>
  );
}

export default PersonModal;
