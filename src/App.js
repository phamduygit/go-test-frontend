import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Product from "./Product";
import Cart from "./Cart";
import { Provider } from 'react-redux';

import store from './store';


export default function App() {
  return (
    <Provider store={store}>
      <Box
        disableGutters
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          left: "0px",
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cart />
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}
