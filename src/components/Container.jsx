import { Box } from "@mui/material";

const Container = (props) => {
  const { children } = props;

  return <Box sx={{ padding: "10%" }}>{children}</Box>;
};

export default Container;
