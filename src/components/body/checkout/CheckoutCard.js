import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import accounting from "accounting";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardFooder: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const CheckoutCard = ({
  product: { id, name, img, price, productType },
}) => {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();

  const deleteItem = (id) => {
    dispatch({
      type: actionTypes.DELETE_TO_ITEM,
      item: {
        id: id,
      },
    });
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          className={classes.media}
          image={img}
          title={productType}
        />
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p">
            {name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box className={classes.cardFooder}>
            <Typography variant="h5" style={{ paddingTop: "10px" }}>
              {accounting.formatMoney(price)}
            </Typography>
            <IconButton aria-label="add to Cart">
              <DeleteOutlineIcon color="error" onClick={()=>deleteItem(id)} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};
