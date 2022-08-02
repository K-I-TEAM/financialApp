import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PropsType = {
  label: string;
  value: string | number | Date;
  changeHandler: (newValue: any) => void;
  onError?: any;
};

const BasicDatePicker = ({
  label,
  value,
  changeHandler,
  onError,
}: PropsType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={new Date(value)}
        autoFocus
        disableFuture
        inputFormat="yyyy-MM-dd"
        onError={onError}
        onChange={(newValue) => {
          // const param = newValue ? newValue.toISOString().slice(0, 10) : "";
          changeHandler(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
export default BasicDatePicker;
