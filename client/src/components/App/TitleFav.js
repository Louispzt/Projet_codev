import React, { useState, useEffect } from "react";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import { IconButton, Typography, Box } from "@mui/material";

export default function TitleFav({ token, selectedRegion }) {
  function deleteFav(token) {
    fetch("http://localhost:9000/me/delete_bookmark", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "fav",
      }),
    });
  }

  function setFav(selectedRegion, token) {
    deleteFav(token);
    fetch("http://localhost:9000/me/add_bookmark", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "fav",
        description: selectedRegion,
      }),
    });
  }
  const [fav, setFavIcon] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:9000/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.bookmarks.length > 0)
          if (res.bookmarks[0].description == selectedRegion) {
            setFavIcon(true);
          } else setFavIcon(false);
      })
      .catch((error) => {
        setFavIcon(false);
        console.log(
          `API not responding me -> http://localhost:9000/me\n${error}`
        );
        return null;
      });
  }, [selectedRegion]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }} justifyContent="center">
      <Typography variant="h3">
        {selectedRegion == "all"
          ? "France"
          : selectedRegion.charAt(0).toUpperCase() +
            selectedRegion.replace("-", " ").slice(1)}
      </Typography>
      {fav && (
        <IconButton
          onClick={() => {
            deleteFav(token);
            setFavIcon(!fav);
          }}
          aria-label="delete"
          color="primary"
        >
          <Star></Star>
        </IconButton>
      )}
      {!fav && (
        <IconButton
          onClick={() => {
            setFav(selectedRegion, token);
            setFavIcon(!fav);
          }}
          aria-label="delete"
          color="primary"
        >
          <StarBorder></StarBorder>
        </IconButton>
      )}
    </Box>
  );
}
