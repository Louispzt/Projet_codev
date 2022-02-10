import React, { useState } from "react";
import Map from "../Map/Map";
import AreaChartEcoSource from "../Graphs/AreaChartEcoSource";
import LineCharteEcoConso from "../Graphs/LineCharteEcoConso";
import PieChartSourceEnergie from "../Graphs/PieChartSourceEnergie";
import ButtonAppBar from "./ButtonAppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function Dashboard({ token, setToken }) {
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
      <ButtonAppBar token={token} setToken={setToken} />
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
                <LineCharteEcoConso
                  selectedRegion={selectedRegion}
                  token={token}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Item>
                <AreaChartEcoSource
                  selectedRegion={selectedRegion}
                  token={token}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Item>
                <PieChartSourceEnergie
                  selectedRegion={selectedRegion}
                  token={token}
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
