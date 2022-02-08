import React, { useState } from "react";
import Map from "./components/Map";
import AreaChartEcoSource from "./components/AreaChartEcoSource";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LineCharteEcoConso from "./components/LineCharteEcoConso";
import PieChartSourceEnergie from "./components/PieChartSourceEnergie";

function App() {
  const [selectedRegion, updateRegion] = useState("all");

  const updateRegionFormat = (region) => updateRegion(region.toLowerCase());
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          <Map updateRegion={updateRegionFormat} />
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid item xs={5}>
            <LineCharteEcoConso selectedRegion={selectedRegion} />
          </Grid>
          <Grid item xs={5}>
            <AreaChartEcoSource selectedRegion={selectedRegion} />
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
