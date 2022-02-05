import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import accounting from 'accounting';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import { CheckoutCard } from './CheckoutCard';
import { ContactSupport } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  buttonPage: {
    margin: theme.spacing(1),
    background: 'green',
    '&:hover': {
      background: "#64A46E ",
    },
  },
  buttonDelete: {
    margin: theme.spacing(1),
    background: 'red',
    '&:hover': {
      background: "##97504A  ",
    },
  },
  cardFooder: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

}));

export default function CheckoutPage() {
  const classes = useStyles();
  const [{basket}, dispatch ] = useStateValue();
  const getBasketTotal = basket.reduce((accumulator, item) => accumulator + item.price,  0);


  const emptyBasket = () => {
    console.log(basket);
    dispatch({
      type: actionTypes.EMPTY_BASKET,
      basket: [],
      
    });
  };
function FormRow() {

  return (
   
      
    <React.Fragment>
      <Grid container spacing={3}   direction="row" justifyContent="center" alignItems="center">
    
        {
            basket.map((items) => ( 
                <Grid  item xs={12} sm={8} md={6} lg={4}>
                  <CheckoutCard key={items.id} product={items}/>
                   
              </Grid>
             ))
         }  
      </Grid>
   </React.Fragment>
  );
}



  return (
    <div className={classes.root}>
      <Grid container spacing={3}   >
            <Grid item xs={12}  >
                <Typography variant='h5' align="left">
                     Carrito de Compras
                </Typography>
               
            </Grid>
            <Grid item xs={12} sm={8} md={9} container spacing={2}>
                <FormRow />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h5" color="textSecondary" component="p">
              
                 Total de Item: {basket.length}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                 Total: {accounting.formatMoney(getBasketTotal)}
              </Typography>
               
              <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonPage}
                  startIcon={<AttachMoneyIcon />}
                >
                  Pagar
              </Button>
              <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonDelete}
                  startIcon={<DeleteForeverIcon />}
                  onClick={emptyBasket}
                >
                  Vaciar carrito
              </Button>
                
              
            </Grid>
      </Grid>
    </div>
    
  );
}

                