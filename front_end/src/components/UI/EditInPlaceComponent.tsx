import React, { KeyboardEventHandler, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

type ActionType = {
  data: string | undefined;
  label: string;
};

const EditInPlaceComponent: React.FC<ActionType> = ({ data, label }) => {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(data);
  const hadleNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };
  const handleEditCancel = () => {
    setNewValue(data);
    setEditMode(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.code) {
      case "Escape":
        handleEditCancel();
        break;
      case "Enter":
        //some handler
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
            <IconButton>
              <CheckIcon />
            </IconButton>{" "}
            <IconButton>
              <ClearIcon onClick={handleEditCancel} />
            </IconButton>
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
        <TextField
          variant="standard"
          value={newValue}
          autoFocus
          label={label}
          onChange={hadleNewValue}
          onBlur={handleEditCancel}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <ListItemText
          primary={`${label}: ${data}`}
          //secondary={secondary ? 'Secondary text' : null}
        />
      )}
    </ListItem>
  );
};

export default EditInPlaceComponent;
