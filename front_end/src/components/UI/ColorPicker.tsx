import { useState } from "react";
import { Box } from "@mui/material";
import { ChromePicker } from "react-color";

type PropsType = {
  color: any;
  handler: (color: any) => void;
};

const ColorPicker = ({ color, handler }: PropsType) => {
  const [open, setOpen] = useState(false);
  //const [color, setColor] = useState("#000000");
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (color: any) => {
    handler(color.hex);
  };
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  return (
    <Box>
      <Box
        width={30}
        height={30}
        sx={{ backgroundColor: color ? color : "#B56666" }}
        onClick={handleClick}
      ></Box>
      {open ? (
        <Box sx={popover}>
          <Box sx={cover} onClick={handleClose} />
          <ChromePicker color={color} onChange={handleChange} />
        </Box>
      ) : null}
    </Box>
  );
};
export default ColorPicker;
