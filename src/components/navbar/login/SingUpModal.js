import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import logo from "../../../img/trago.png";
import { Form, Formik } from "formik";
import Axios from "axios";
import clsx from "clsx";
import WarningIcon from "@material-ui/icons/Warning";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "#E4EAE4",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  conatinerFormik: {
    padding: theme.spacing(3),
  },
  cardFooder: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: "#124257",
    fontWeight: "bold",
  },
  logo: {
    height: "50px",
    width: "80px",
    opacity: "0.2",
  },
  input: {
    width: "100%",
    margin: theme.spacing(1, 0, 0, 0),
    border: "1px solid #393939",
    borderRadius: "1px 1px 1px 1px",
    padding: "7px",
  },
  containerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "70%",
    background: "#0D423D",
    color: "white",
    "&:hover": {
      background: "#106C4E",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  Buttons: {
    ontWeight: "bold",
    cursor: "pointer",
    outline: "none",
    background: "none",
    border: "none",
    color: "#0D423D",
    fontSize: "1em",
    "&:hover": {
      color: "#106C4E",
    },
  },

  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  error: {
    marginTop: "0.4em",
    marginLeft: "0.5em",
    fontSize: ".9em",
  },
}));

export const SingUpModal = ({
  handleCloseSingUp,
  openSingUp,
  handleOpenSingIn,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const getSingIn = async (userName, email, password, e) => {
    try {
      await Axios.post("http://127.0.0.1:8000/api/auth/register", {
        name: userName,
        email: email,
        password: password,
      });
      console.log("Enviado SingUp a Api");
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          handleCloseSingUp();
          handleOpenSingIn();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenSingInCloseSingUp = () => {
    handleCloseSingUp();
    handleOpenSingIn();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSingUp}
        onClose={handleCloseSingUp}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSingUp}>
          <div className={classes.paper}>
            <Box className={classes.cardFooder}>
              <Typography
                component="h1"
                variant="h4"
                style={{ color: "#124257" }}
              >
                Registro
              </Typography>
              <CardMedia
                component="img"
                className={classes.logo}
                image={logo}
                title="COMPUWEB"
              />
            </Box>

            <Divider />
            <Grid container spacing={3} className={classes.conatinerFormik}>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    userName: "",
                    email: "",
                    password: "",
                  }}
                  validate={(values) => {
                    let errores = {};
                    if (!values.userName) {
                      errores.userName = "El nombre de usuario requerido";
                    } else if (
                      !/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(
                        values.userName
                      )
                    ) {
                      errores.userName =
                        "El nombre solo puede contener letras y numeros";
                    }
                    if (!values.email) {
                      errores.email = "El email es requerido";
                    } else if (
                      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                        values.email
                      )
                    ) {
                      errores.email =
                        "El email solo puede contener letras, numeros, puntos y guiones";
                    }
                    if (!values.password) {
                      errores.password = "La clave es requerido";
                    } else if (
                      !/(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/.test(
                        values.password
                      )
                    ) {
                      errores.password =
                        "La clave debe contener letras, numeros y caracteres especiales";
                    }
                    return errores;
                  }}
                  onSubmit={(values) => {
                    getSingIn(values.userName, values.email, values.password);
                  }}
                >
                  {({
                    isSubmitting,
                    getFieldProps,
                    handleChange,
                    handleBlur,
                    touched,
                    errors,
                    values,
                  }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <label htmlFor="firsName" className={classes.label}>
                            Nombre de usuario
                          </label>
                          <input
                            name="userName"
                            className={classes.input}
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          {touched.userName && errors.userName && (
                            <Box style={{ display: "flex" }}>
                              <WarningIcon
                                style={{
                                  fontSize: 18,
                                  marginTop: "0.4em",
                                  color: "#AA263A",
                                }}
                              />
                              <Typography className={classes.error}>
                                {errors.userName}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <label htmlFor="email" className={classes.label}>
                            Email
                          </label>
                          <input
                            name="email"
                            className={classes.input}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          {touched.email && errors.email && (
                            <Box style={{ display: "flex" }}>
                              <WarningIcon
                                style={{
                                  fontSize: 18,
                                  marginTop: "0.4em",
                                  color: "#AA263A",
                                }}
                              />
                              <Typography
                                component="h1"
                                className={classes.error}
                              >
                                {errors.email}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <label htmlFor="password" className={classes.label}>
                            Contraceña
                          </label>
                          <input
                            name="password"
                            className={classes.input}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          {touched.password && errors.password && (
                            <Box style={{ display: "flex" }}>
                              <WarningIcon
                                style={{
                                  fontSize: 18,
                                  marginTop: "0.4em",
                                  color: "#AA263A",
                                }}
                              />
                              <Typography
                                component="h1"
                                className={classes.error}
                              >
                                {errors.password}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid container xs={12}>
                          <Grid item xs={6} className={classes.containerButton}>
                            <Button
                              className={classes.button}
                              type="submit"
                              variant="contained"
                              onClick={handleCloseSingUp}
                            >
                              Cancelar
                            </Button>
                          </Grid>
                          <Grid item xs={6} className={classes.containerButton}>
                            <Button
                              className={classes.button}
                              disabled={loading}
                              type="submit"
                              variant="contained"
                            >
                              Registrar
                            </Button>
                            {loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          xs={12}
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          style={{ marginTop: "1.5em" }}
                        >
                          <button
                            className={classes.Buttons}
                            onClick={handleOpenSingInCloseSingUp}
                          >
                            Ya tengo cuenta, iniciar sesion
                          </button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
