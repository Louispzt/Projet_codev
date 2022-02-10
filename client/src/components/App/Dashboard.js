import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import AreaChartEcoSource from "../Graphs/AreaChartEcoSource";
import LineCharteEcoConso from "../Graphs/LineCharteEcoConso";
import PieChartSourceEnergie from "../Graphs/PieChartSourceEnergie";
import TitleFav from "./TitleFav";
import ButtonAppBar from "./ButtonAppBar";
import { Paper, Grid, Box, styled } from "@mui/material";

const getFav = ({ token }) => {
  fetch(`https://apicodev.deta.dev/me`, {
    headers: {
      "Access-Control-Allow-Origin": "https://apicodev.deta.dev/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.bookmarks.length > 0) return res.bookmarks[0].description;
      else return "all";
    })
    .catch((error) => {
      setData([]);
      console.log(
        `API not responding me -> https://apicodev.deta.dev/me\n${error}`
      );
      return null;
    });
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard({ token, setToken }) {
  const [selectedRegion, updateRegion] = useState("all");

  useEffect(() => {
    fetch(`https://apicodev.deta.dev/me`, {
      headers: {
        "Access-Control-Allow-Origin": "https://apicodev.deta.dev/",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.bookmarks.length > 0)
          updateRegion(res.bookmarks[0].description);
        else updateRegion("all");
      })
      .catch((error) => {
        setData([]);
        console.log(
          `API not responding me -> https://apicodev.deta.dev/me\n${error}`
        );
        return null;
      });
  }, []);

  const updateRegionFormat = (region) => updateRegion(region.toLowerCase());

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
                <TitleFav token={token} selectedRegion={selectedRegion} />
              </Item>
            </Grid>
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
