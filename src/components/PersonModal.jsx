import { Modal } from "@mui/material";
import PersonCard from "./PersonCard";

const PersonModal = ({
  open,
  onClose,
  person,
  isFriend = false,
  refetch,
  setRefetch,
}) => {
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
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </Modal>
  );
};

export default PersonModal;
