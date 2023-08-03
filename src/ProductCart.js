import {
  Box,
  Button,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "./axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const theme = createTheme({
  palette: {
    violet: {
      main: "#F6C90E",
    },
  },
});

ProductCart.propTypes = {
  product: PropTypes.object,
};

export default function ProductCart({ product }) {
  const { _id, name, image, price, color, description, addedToCart } = product;
  const dispatch = useDispatch();
  // console.log(addedToCart);
  const onPressAddToCart = async () => {
    const response = await axios({
      method: 'post',
      url: '/api/v1/cart/add',
      data: {
        image,
        name,
        price,
        color,
        productId: _id
      },
    });
    console.log(response);
    dispatch({ type: 'INCREMENT' });
  }
  return (
    <div>
      <Box
        width="100%"
        height={450}
        transform="rotate(-30deg)"
        style={{
          backgroundColor: `${color}`,
          borderRadius: "30px",
        }}
      >
        <Box left="0px" top="20px" position="relative">
          <img
            alt="nike"
            src={image}
            height={350}
            style={{
              transform: "rotate(-20deg)",
            }}
          />
        </Box>
      </Box>
      <Typography>
        <Box sx={{ fontWeight: 700, mt: 2, ml: 1, fontSize: 22 }}>{name}</Box>
      </Typography>
      <Typography align="justify">
        <Box sx={{ fontWeight: 400, mt: 2, ml: 1, fontSize: 16 }}>
          {description}
        </Box>
      </Typography>
      <Stack
        direction="row"
        sx={{ mb: 7, mt: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>
          <Box sx={{ fontWeight: 700, mt: 2, ml: 1, fontSize: 24 }}>
            ${price}
          </Box>
        </Typography>
        {(`${addedToCart}` === 'true') ?
        <Box
          style={{
            backgroundColor: "#F6C90E",
            borderRadius: "50%",
          }}
        >
          <IconButton aria-label="delete">
            <img alt="plus" src="/assets/check.png" width={35} height={35} />
          </IconButton>
        </Box> :
        <ThemeProvider theme={theme}>
          <Button
            color="violet"
            style={{
              borderRadius: 20,
              padding: "12px 10px",
              fontSize: "16px",
              fontWeight: 700,
            }}
            variant="contained"
            onClick={onPressAddToCart}
          >
            ADD TO CART
          </Button>
        </ThemeProvider>}
      </Stack>
    </div>
  );
}
