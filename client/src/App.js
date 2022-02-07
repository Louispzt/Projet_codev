import React, { Component } from "react";
import Map from "./components/Map";
import LineChart24hEco from "./components/LineChart24hEco";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LineChartWeek from "./components/LineChartWeek";
import PieChartSourceEnergie from "./components/PieChartSourceEnergie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };

    this.setState({ apiResponse: this.callAPI() });
  }

  callAPI() {
    fetch("http://localhost:9000")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid item xs={6} md={6}>
            <Map />
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid item xs={5}>
              <LineChartWeek />
            </Grid>
            <Grid item xs={5}>
              <LineChart24hEco />
            </Grid>
            <Grid item xs={5}>
              <PieChartSourceEnergie />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
