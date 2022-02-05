import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../img/trago.png";
import { Badge, Box, Button } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SingUpModal } from "./login/SingUpModal";
import { SingInModal } from "./login/SingInModal";
import { useStateValue } from "../context/StateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    background: "#F3F5F3",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: "50px",
    width: "80px",
  },
  title: {
    flexGrow: 1,
  },
  cardFooder: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  BoxButton: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [openSingUp, setOpenSingUp] = useState(false);
  const [openSingIn, setOpenSingIn] = useState(false);
  const [{ basket }, dispatch] = useStateValue();

  const handleOpenSingUp = () => {
    setOpenSingUp(true);
  };
  const handleOpenSingIn = () => {
    setOpenSingIn(true);
  };

  const handleCloseSingUp = () => {
    setOpenSingUp(false);
  };
  const handleCloseSingIn = () => {
    setOpenSingIn(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box className={classes.cardFooder}>
            <RouterLink to="/">
              <CardMedia
                component="img"
                className={classes.logo}
                image={logo}
                title="Inicio"
              />
            </RouterLink>
            <Box className={classes.BoxButton}>
              <RouterLink to="/Buscador" style={{ textDecoration: "none" }}>
                <Button type="button">Buscador API</Button>
              </RouterLink>

              <RouterLink to="/CheckoutPage">
                <IconButton aria-label="add to Cart">
                  <Badge badgeContent={basket.length} color="error">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </RouterLink>

              <Button type="button" onClick={handleOpenSingUp}>
                Registro
              </Button>
              <Button type="button" onClick={handleOpenSingIn}>
                Iniciar Sesion
              </Button>

              <SingUpModal
                handleCloseSingUp={handleCloseSingUp}
                openSingUp={openSingUp}
                handleOpenSingIn={handleOpenSingIn}
              />
              <SingInModal
                handleCloseSingIn={handleCloseSingIn}
                openSingIn={openSingIn}
                handleOpenSingUp={handleOpenSingUp}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
