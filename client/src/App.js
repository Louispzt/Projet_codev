import React, { Component } from "react";
import Map from "./modules/Map";
import LineChart24hEco from "./modules/LineChart24hEco";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
            <LineChart24hEco />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
