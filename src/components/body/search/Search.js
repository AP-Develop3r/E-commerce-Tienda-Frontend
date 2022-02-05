import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Input } from "@material-ui/core";
import { Box, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10em",
  },
  table: {
    minWidth: 650,
  },
  boxContainer: {
    display: "flex",
    margin: "2em",
  },
  container: {
    width: "300px",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    position: "relative",
  },
  input: {
    width: "100%",
  },
}));

export const Search = () => {
  const classes = useStyles();
  const [drink, setDrink] = useState([]);
  const [search, setSearch] = useState([]);
  const [tableDrink, setTableDrink] = useState([]);

  const loadData = () => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then((resp) => {
        setDrink(resp.data.drinks);
        setTableDrink(resp.data.drinks);
        console.log(resp.data.drinks);
      });
  };
  useEffect(() => {
    loadData();
    console.log(drink);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    filters(e.target.value);
    console.log("search: " + e.target.value);
  };
  const filters = (consulta) => {
    const resultSearch = tableDrink.filter((element) => {
      if (
        element.strDrink
          .toString()
          .toLowerCase()
          .includes(consulta.toLowerCase()) ||
        element.strIngredient1
          .toString()
          .toLowerCase()
          .includes(consulta.toLowerCase()) ||
        element.strCategory
          .toString()
          .toLowerCase()
          .includes(consulta.toLowerCase())
      ) {
        return element;
      }
    });
    setDrink(resultSearch);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.boxContainer}>
        <Box style={{ marginTop: "7px" }}>
          <span style={{ color: "blue" }}>
            <SearchIcon />
          </span>
        </Box>
        <Box style={{ width: "50%" }}>
          <Input
            className={classes.input}
            value={search}
            placeholder="Busqueda por nombre, ingredintes y categoria"
            onChange={handleChange}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Ingredite 1</TableCell>
              <TableCell align="right">Ingredite 2</TableCell>
              <TableCell align="right">Ingredite 3</TableCell>
              <TableCell align="right">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drink.map((row) => (
              <TableRow key={row.idDrink}>
                <TableCell component="th" scope="row">
                  {row.strDrink}
                </TableCell>
                <TableCell align="right">{row.strIngredient1}</TableCell>
                <TableCell align="right">{row.strIngredient2}</TableCell>
                <TableCell align="right">{row.strIngredient3}</TableCell>
                <TableCell align="right">{row.strCategory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
