import React from "react";
import { Box } from "@mui/system";
import { SvgIconComponent } from "@mui/icons-material";

export type RoundedIconPropsType = {
  icon: SvgIconComponent;
  color: string;
};

const RoundedIcon: React.FC<RoundedIconPropsType> = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="30px"
      height="30px"
      borderRadius="50%"
      sx={{ backgroundColor: props.color, mr: 2 }}
    >
      <Box>
        <props.icon fontSize="small" sx={{ color: "#ffffff" }} />
      </Box>
    </Box>
  );
};

export default RoundedIcon;
