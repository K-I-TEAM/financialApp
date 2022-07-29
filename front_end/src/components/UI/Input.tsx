import { TextField } from "@mui/material";
import { ReactEventHandler } from "react";
import { isInvalid } from "../../formFramework";

type PropsType = {
  fullWidth?: boolean | undefined;
  type?: string;
  value: any;
  valid: Boolean;
  label: string;
  sx?: Object;
  errorMassage?: string;
  key?: any;
  shouldValidate: Boolean;
  touched: Boolean;
  onChange: ReactEventHandler;
};

const Input = (props: PropsType) => {
  return (
    <TextField
      error={isInvalid(props)}
      fullWidth={props.fullWidth}
      //key={props.key}
      value={props.value}
      label={props.label}
      sx={props.sx}
      onChange={props.onChange}
      helperText={
        isInvalid(props)
          ? props.errorMassage
            ? props.errorMassage
            : "Incorrect data"
          : null
      }
    />
  );
};

export default Input;
