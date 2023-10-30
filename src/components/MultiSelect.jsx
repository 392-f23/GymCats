import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

function MultiSelect({
  label,
  dbUpdate,
  dbKey,
  showNoPreference = false,
  options,
}) {
  const [selectedList, setSelectedList] = useState([]);

  const handleToggle = (event, newSelectedList) => {
    setSelectedList(newSelectedList);

    // db update
    dbUpdate((prevState) => {
      prevState[dbKey[0]][dbKey[1]] = newSelectedList;
      return prevState;
    });
  };

  const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    width: "fit-content",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.text.secondary),
    padding: "5px 15px",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.primary[3],
    },
    "&.MuiToggleButtonGroup-grouped:not(:last-of-type)": {
      borderRadius: "40px",
    },
    "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
      borderRadius: "40px",
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary[2],
      color: theme.palette.getContrastText(theme.palette.text.primary),
    },
    "&.Mui-selected:hover": {
      backgroundColor: theme.palette.primary[4],
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        marginBottom: "30px",
      }}
    >
      <Typography variant="body1">{label}</Typography>
      <Typography variant="p" sx={{ pb: 2 }}>
        Select all that apply.
      </Typography>
      <ToggleButtonGroup
        value={selectedList}
        onChange={handleToggle}
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {options.map((option) => (
          <StyledToggleButton key={option} value={option} sx={{ mr: 2, mb: 2 }}>
            {option}
          </StyledToggleButton>
        ))}
        {showNoPreference && (
          <StyledToggleButton label={"No Preference"} value={"No Preference"}>
            No Preference
          </StyledToggleButton>
        )}
      </ToggleButtonGroup>
    </Box>
  );
}

export default MultiSelect;
