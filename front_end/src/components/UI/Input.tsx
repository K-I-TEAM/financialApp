import { TextField } from "@mui/material";
import { ReactEventHandler } from "react";
import { isInvalid } from "../../formFramework";

type PropsType = {
  autoFocus?: boolean;
  margin?: "none" | "dense" | "normal" | undefined;
  variant?: "standard" | "filled" | "outlined" | undefined;
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
      autoFocus={props.autoFocus}
      margin={props.margin}
      variant={props.variant}
      error={isInvalid(props)}
      fullWidth={props.fullWidth}
      type={props.type ? props.type : "text"}
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
