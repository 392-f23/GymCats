import { Button, styled, useTheme } from "@mui/material";
import { useState } from "react";

function ToggleButton({ label, value, onChange }) {
    const [toggle, setToggle] = useState(false);
    const theme = useTheme();
    const toggleButton = () => {
        setToggle(!toggle);
        console.log("set toggle to", toggle);
        // onChange(!toggle, value); // todo: recomment this after testing
    }

    const StyledButton = styled(Button)({
        width: "auto",
        backgroundColor: toggle ? theme.palette.primary[2] : theme.palette.primary.main,
        color: theme.palette.text.secondary,
        transition: "background-color color 0.3s ease-in-out",
        "&:hover": {
            backgroundColor: toggle ? theme.palette.primary[4] : theme.palette.primary[3],
        }
    });

    return (
        <Button
            sx={{
                width: "auto",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                transition: "background-color color 0.3s ease-in-out",
                "&:hover": {
                    backgroundColor: toggle ? theme.palette.primary[4] : theme.palette.primary[3],
                }
            }}
            onClick={toggleButton}
        >
            {label}
        </Button>
    );
}

export default ToggleButton;