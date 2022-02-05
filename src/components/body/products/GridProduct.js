import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { red } from "@material-ui/core/colors";
import Footer from "../../footer/Footer";
import axios from "axios";
import CardProduct from "./CardProduct";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  rootCard: {
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

export default function GridProduct() {
  const classes = useStyles();
  const [drink, setDrink] = useState([]);


  const loadData = () => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
      .then((resp) => {
        setDrink(resp.data.drinks);
        console.log(resp.data.drinks);
       
        
      });
  };
  useEffect(() => {
    loadData();
    console.log(drink)
    

  }, []);



  return (
    <div>
      <Typography variant="h4" align="left" style={{margin: '1em'}}>
        Productos
      </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        {drink.map((item) => (
          <Grid key={item.idDrink} item xs={12} sm={6} md={4} lg={3}>
            <CardProduct key={item.idDrink} drink={item} />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
}
