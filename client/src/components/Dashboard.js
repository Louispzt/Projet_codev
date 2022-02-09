import React, { useState } from "react";
import Map from "./Map";
import AreaChartEcoSource from "./AreaChartEcoSource";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LineCharteEcoConso from "./LineCharteEcoConso";
import PieChartSourceEnergie from "./PieChartSourceEnergie";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ButtonAppBar from "./ButtonAppBar";

export default function Dashboard() {
  const [selectedRegion, updateRegion] = useState("all");
  const updateRegionFormat = (region) => updateRegion(region.toLowerCase());

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box>
      <Box sx={{ margin: 5 }}>
        <ButtonAppBar />
      </Box>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Item>
              <Map updateRegion={updateRegionFormat} />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} container spacing={5}>
            <Grid item xs={12} md={12} xl={6}>
              <Item>
                <LineCharteEcoConso selectedRegion={selectedRegion} />
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Item>
                <AreaChartEcoSource selectedRegion={selectedRegion} />
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Item>
                <PieChartSourceEnergie selectedRegion={selectedRegion} />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
