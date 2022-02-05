import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Box } from "@material-ui/core";
import accounting from "accounting";
import { actionTypes } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const precio = 10;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  cardFooder: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardProduct({
  drink: { idDrink, strGlass, strDrinkThumb, trAlcoholic },
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id: idDrink,
        name: strGlass,
        productType: trAlcoholic,
        price: idDrink/100,
        img: strDrinkThumb,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        image={strDrinkThumb}
        title={trAlcoholic}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          {strGlass}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box className={classes.cardFooder}>
          <Typography variant="h5" style={{ paddingTop: "10px" }}>
            {accounting.formatMoney(idDrink/100)}
          </Typography>

          <IconButton aria-label="add to Cart" onClick={addToBasket}>
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
