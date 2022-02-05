import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: "#CFCECD",
    bottom: "0",
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    marginTop: "4em",
    padding: "1em 0 ",
  },
  link: {
    fontSize: "1em",
    marginBottom: ".2em",
    color: "#384475",
  },
  icons: {
    color: "#3F4D9C",
  },
  copylight: {
    color: "#384475",
    fontSize: "1em",
    "&:hover": {
      color: "#384475",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid
            item
            container
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href="#"
            justify="center"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography className={classes.copylight}>
              &copy;Copyright 2022 por Anyelo Peña
            </Typography>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
