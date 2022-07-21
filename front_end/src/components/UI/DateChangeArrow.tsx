import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

import { currentDateSelector } from "../../selectors";
import { setCurrentDate } from "../../actions";
export enum ChangeEnum {
  Inc,
  Dec,
}
type PropsType = {
  settings?: Object;
  arrowType: ChangeEnum;
};

export const DateChangeArrow: React.FC<PropsType> = ({
  settings = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowType,
}) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(currentDateSelector);
  const increment = arrowType === ChangeEnum.Inc ? 1 : -1;
  const changeCurrentDateHandler = (increment: number) => {
    const date = currentDate;
    date.setDate(1);
    const newDate = new Date(date.setMonth(date.getMonth() + increment));
    dispatch(setCurrentDate(newDate));
  };
  return (
    <Box sx={settings}>
      <IconButton onClick={() => changeCurrentDateHandler(increment)}>
        {arrowType === ChangeEnum.Inc ? (
          <ArrowForwardIosIcon fontSize="small" />
        ) : (
          <ArrowBackIosNewIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
};
