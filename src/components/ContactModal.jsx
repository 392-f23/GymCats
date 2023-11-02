import {
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CloseIcon from "@mui/icons-material/Close";

function ContactModal({ open, onClose, person, photoURL }) {
  const theme = useTheme();

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
                {person.personal_info.Name}
              </Typography>
              <Typography variant="p" color={theme.palette.text.secondary}>
                {person.personal_info.School} | {person.personal_info.Major}
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
              onClick={onClose}
            >
              <CloseIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 3,
              pb: 3,
            }}
          >
            <EmailOutlinedIcon
              sx={{
                color: theme.palette.text.secondary,
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
                mr: 2,
              }}
            />
            <Link
              href={`mailto:${person.personal_info.Email}`}
              variant="a"
              component="a"
            >
              {person.personal_info.Email}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
}

export default ContactModal;
