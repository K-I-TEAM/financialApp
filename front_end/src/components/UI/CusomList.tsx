import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Typography,
  Skeleton,
} from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";

import { TransactionType, CategoryType } from "../../defaultState";

type PropsType = {
  items: Immutable.List<TransactionType> | null;
  categories: Array<CategoryType>;
  maxAmount: number;
  categorized?: Boolean;
};

const CustomList: React.FC<PropsType> = ({
  items,
  categories,
  maxAmount,
  categorized = false,
}) => {
  return (
    <List component="div" disablePadding sx={{ pt: 2 }}>
      {items ? (
        items
          .toJS()
          .slice(0, maxAmount)
          .map((item: any) => {
            return (
              <ListItem
                key={item.description}
                sx={{
                  pl: 6,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
                secondaryAction={
                  <Typography>
                    {item.type === "expense" ? "- " : null}
                    {item.amount}$
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Brightness1Icon
                    fontSize="small"
                    sx={{
                      color: categories.filter(
                        (category: CategoryType) =>
                          category.id === item.categoryId
                      )[0].colour,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText primary={item.description} />
              </ListItem>
            );
          })
      ) : (
        <>
          {[...Array(maxAmount)].map((_, index) => (
            <Skeleton key={index} height={50} />
          ))}
        </>
      )}
    </List>
  );
};
export default CustomList;
