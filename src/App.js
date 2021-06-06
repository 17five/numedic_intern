import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {Link} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import "./App.css";


const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();
  const [state,setState] = React.useState();
  const [con,setCon] = React.useState({});

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  // const {state, setState} = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  const toggleDrawer = (open,cont) => (event) => {
    setState(open);
    setCon(cont);
    console.log(cont);
    }
  

  const list = (names) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false, {})}
      onKeyDown={toggleDrawer(false, {})}
    >
      <List style={{backgroundColor:"#87CEEB"}}>
          <ListItem align="center" style={{fontSize:"150%",color:"#708090"}}><strong>{names.name} </strong></ListItem>
      </List>
      <Divider />
      <List>
          <ListItem key={names.name} align="left">Capital : {names.capital}</ListItem>
          <ListItem key={names.region} align="left">Region : {names.region}</ListItem>
          <ListItem key={names.subregion} align="left">Subregion : {names.subregion}</ListItem>
          <ListItem key={names.alpha3Code} align="left">AlphaCode : {names.alpha3Code}</ListItem>
          <ListItem key={names.alpha3Code} align="left">Time Zones : {names.timezones}</ListItem>      
          <ListItem key={names.alpha3Code} align="left">Area : {names.area} sqkms</ListItem>        
      </List>
      
    </div>
  );

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{backgroundColor:"#191970"}}>
                  <TableCell style={{color:"#F2F3F3",fontSize:"110%"}}>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right" style={{color:"#F2F3F3",fontSize:"110%"}}>
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right" style={{color:"#F2F3F3",fontSize:"110%"}}>
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right" style={{color:"#F2F3F3",fontSize:"110%"}}>
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right" style={{color:"#F2F3F3",fontSize:"110%"}}>
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                    {<div key = "right">
                        <Link onClick={toggleDrawer(true,country)}>
                          {country.name}
                        </Link>
                      </div>}
                      
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
                <Drawer
                    anchor = {"right"}
                    open = {state}
                    onClose = { toggleDrawer(false,{})} 
                  >
                    {list(con)}
                  </Drawer>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
