import React, { Component, useState } from "react";
import Map from "./components/Map";
import LineChart24hEco from "./components/LineChart24hEco";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LineChartWeek from "./components/LineChartWeek";
import PieChartSourceEnergie from "./components/PieChartSourceEnergie";

function App() {
  const [selectedRegion, updateRegion] = useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          <Map selectRegion={updateRegion} />
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid item xs={5}>
            <LineChartWeek selectedRegion={selectedRegion} />
          </Grid>
          <Grid item xs={5}>
            <LineChart24hEco selectedRegion={selectedRegion} />
          </Grid>
          <Grid item xs={5}>
            <PieChartSourceEnergie selectedRegion={selectedRegion} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
