import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

function MultiSelect({ label, options, values, dbState, dbUpdate, dbKey }) {
  //array of values selected for given multiselect button group!
  const [selectedList, setSelectedList] = useState([]);
  const [firstKey, secondKey] = dbKey;

  useEffect(() => {
    if (dbState[firstKey][secondKey]) {
      setSelectedList(dbState[firstKey][secondKey]);
    }
  }, [dbState]);

  const handleToggle = (event, newSelectedList) => {
    setSelectedList(newSelectedList);

    dbUpdate((prevState) => {
      prevState[firstKey][secondKey] = newSelectedList;
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
          <StyledToggleButton
            key={option}
            // value={values[options.indexOf(option)]}
            value={option}
            sx={{ mr: 2, mb: 2 }}
          >
            {option}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default MultiSelect;
