import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Icon";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ButtonAppBar({ token, setToken }) {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.AppBar,
    padding: theme.spacing(1),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="flex-start">
            <Div>Electricité France</Div>
          </Grid>
          {token != null && (
            <Grid container justifyContent="flex-end">
              <Button color="inherit" onClick={() => setToken(null)}>
                Logout
              </Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
