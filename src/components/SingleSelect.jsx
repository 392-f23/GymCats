import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";

function SingleSelect({
  label,
  options,
  values,
  dbState,
  dbUpdate,
  dbKey
}) {
  const theme = useTheme();
  const [selected, setSelected] = useState("");
  const [firstKey, secondKey] = dbKey

  useEffect(() => {
    if (dbState[firstKey][secondKey]) {
      setSelected(dbState[firstKey][secondKey])
    }
  }, [dbState]);

  const handleChange = (newSelected) => {
    setSelected(newSelected);
    dbUpdate(prevState => {
      prevState[firstKey][secondKey] = newSelected
      return prevState
    })
  };

  const StyledRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.primary.main,
    "&.Mui-checked": {
      color: theme.palette.primary[2],
    },
    "&.MuiRadio-root": {
      filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
    },
  }));

  return (
    <FormControl
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: "30px",
      }}
    >
      <FormLabel id={`${label}-label`}>
        <Typography variant="body1" color={theme.palette.text.primary}>
          {label}
        </Typography>
      </FormLabel>
      <Typography variant="p">Select one.</Typography>
      <RadioGroup
        aria-labelledby={`${label}-label`}
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={values[options.indexOf(option)]}
            control={<StyledRadio />}
            label={<Typography variant="p">{option}</Typography>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleSelect;
