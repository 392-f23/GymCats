import ToggleButton from "./ToggleButton";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

function MultiSelect({ label, showNoPreference = false }) {
  const [selectedList, setSelectedList] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = selectedList.indexOf(value);
    const newSelectedList = [...selectedList];

    if (currentIndex === -1) {
      newSelectedList.push(value);
    } else {
      newSelectedList.splice(currentIndex, 1);
    }

    setSelectedList(newSelectedList);
  };

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
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ToggleButton label={"Male"} value={"male"} onToggle={handleToggle} />
        <ToggleButton
          label={"Female"}
          value={"female"}
          onToggle={handleToggle}
        />
        <ToggleButton
          label={"Nonbinary"}
          value={"nonbinary"}
          onToggle={handleToggle}
        />
        <ToggleButton label={"Other"} value={"other"} onToggle={handleToggle} />
        {showNoPreference && (
          <ToggleButton
            label={"No Preference"}
            value={"No Preference"}
            onToggle={handleToggle}
          />
        )}
      </Box>
    </Box>
  );
}

export default MultiSelect;
