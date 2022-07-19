import { Alert, AlertTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { setError } from "./../../actions";
import { errorSelector } from "./../../selectors";

const Error: React.FC = () => {
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  return error ? (
    <Alert onClose={() => dispatch(setError(null))} severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  ) : null;
};

export default Error;
