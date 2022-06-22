import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
//import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import Category from "./Category";
import { userSelector } from "../selectors";
import { CategoryType } from "../defaultState";
import { createCategory, deleteCategory, updateCategory } from "../actions";
import IconSet from "./IconSet";

const Categories = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(
    null as CategoryType | null
  );
  const { categories } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <Box sx={{ p: 2 }}>
      {openCategoryDialog && (
        <Category
          category={currentCategory}
          open={openCategoryDialog}
          handleClose={() => setOpenCategoryDialog(false)}
          handleSubmit={
            currentCategory
              ? (category: CategoryType, id: string | undefined) => {
                  dispatch(updateCategory({ category, id }));
                }
              : (category: CategoryType) => {
                  dispatch(createCategory(category));
                }
          }
        />
      )}
      <Typography my={2} variant="h4">
        Categories
      </Typography>

      <List dense sx={{ pb: 3 }}>
        {categories
          ? categories.map((category: CategoryType) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(deleteCategory(category.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {" "}
                <ListItemAvatar>
                  {IconSet.map((icon: any) =>
                    icon.name === category.icon ? (
                      <icon.component
                        key={icon.name}
                        sx={{ color: category.color }}
                      />
                    ) : null
                  )}
                </ListItemAvatar>
                <ListItemText
                  onClick={() => {
                    setCurrentCategory(category);
                    setOpenCategoryDialog(true);
                  }}
                  primary={category.name}
                />
              </ListItem>
            ))
          : null}
      </List>

      <Button
        variant="contained"
        onClick={() => {
          setCurrentCategory(null);
          setOpenCategoryDialog(true);
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default Categories;
