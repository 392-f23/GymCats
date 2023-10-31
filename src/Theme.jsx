import { createTheme } from "@mui/material";

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};

export const theme = createTheme({
    palette: {
        text: {
            primary: "#F0F0F0",
            secondary: "#171717",
        },
        primary: {
            main: "#17459F",
            1: "#21212F",
            2: "#5197E9",
            3: "#2353B1",
            4: "#3F86D7",
            5:"#D84B57",
            6: "#C13742",
        }
    },
    breakpoints: {
        values: {...breakpoints},
        unit: "px",
    },
    typography: {
        h1: {
            fontFamily: "Kanit",
            fontSize: "3.5rem",
            fontWeight: 700,
        },
        h5: {
            fontFamily: "Kanit",
            fontSize: "1.2rem",
            fontWeight: 600,
        },
        body1: {
            fontFamily: "Oxygen",
            fontSize: "1.5rem",
            fontWeight: 400,
        },
        p: {
            fontFamily: "Oxygen",
            fontSize: "1rem",
            fontWeight: 300,
        },
        button: {
            textTransform: "none",
            fontFamily: "Oxygen",
            fontSize: "1rem",
            fontWeight: 400,
        }
    }
});