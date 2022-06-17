import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

import BasicDatePicker from "./BasicDatePicker";

type ActionType = {
  data: string | Date | number;
  label: string;
  updateHandler: (value: any) => void;
};

const EditInPlaceDateComponent: React.FC<ActionType> = ({
  data,
  label,
  updateHandler,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(data);
  const handleNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };
  const handleEditCancel = () => {
    console.log("handle cancel");
    setNewValue(data);
    setEditMode(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.code) {
      case "Escape":
        handleEditCancel();
        break;
      case "Enter":
        updateHandler(newValue);
        setEditMode(false);
        break;
      default:
        break;
    }
  };
  return (
    <ListItem
      component="div"
      key={label}
      secondaryAction={
        editMode ? (
          <Box>
            <IconButton
              onClick={() => {
                updateHandler(newValue);
                setEditMode(false);
              }}
            >
              <CheckIcon />
            </IconButton>{" "}
            {/* <IconButton
              onClick={() => {
                console.log("handler");
              }}
            >
              <ClearIcon />
            </IconButton> */}
          </Box>
        ) : (
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setEditMode(true)}
          >
            <EditIcon />
          </IconButton>
        )
      }
    >
      {editMode ? (
        <BasicDatePicker
          key="birthdate"
          label="Birthday"
          value={newValue}
          changeHandler={handleNewValue}
        />
      ) : (
        /*  <TextField
          variant="standard"
          value={newValue}
          autoFocus
          label={label}
          onChange={handleNewValue}
          onBlur={() => {
            console.log("on blur");
            updateHandler(newValue);
            setEditMode(false);
          }}
          onKeyDown={handleKeyDown}
        /> */
        <ListItemText
          primary={`${label}${data}`}
          //secondary={secondary ? 'Secondary text' : null}
        />
      )}
    </ListItem>
  );
};

export default EditInPlaceDateComponent;
