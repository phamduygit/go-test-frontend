import { Box, Stack, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import axios from "./axios";
import { useSelector } from "react-redux";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [sum, setSum] = useState(0);
  const count = useSelector((state) => state.counter.count);

  useEffect(() => {
    const fetchProductList = async (currentUrl) => {
      try {
        console.log(currentUrl);
        const response = await axios({
          method: "get",
          url: currentUrl,
        });
        setCarts(response.data.data);
        let sumValue = 0;
        response.data.data.forEach((element) => {
          sumValue += element.price * element.quantity;
        });
        setSum(Math.round(sumValue * 100) / 100);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductList("/api/v1/cart/all");
  }, [count]);

  return (
    <Box
      sx={{
        boxShadow: 3,
        height: 600,
        width: 350,
        margin: "auto",
        marginTop: 4,
        marginBottom: 4,
        borderRadius: "25px",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        paddingLeft: 2,
        paddingTop: 2,
      }}
    >
      <img alt="nike" src="/assets/nike.png" width={50} height={30} />
      <Stack
        direction="row"
        sx={{ mb: 2, pr: 2 }}
        justifyContent="space-between"
      >
        <Typography>
          <Box sx={{ fontWeight: 700, mt: 1, ml: 1, fontSize: 24 }}>
            Your Cart
          </Box>
        </Typography>
        <Typography>
          <Box sx={{ fontWeight: 700, mt: 1, ml: 1, fontSize: 24 }}>${sum}</Box>
        </Typography>
      </Stack>
      <Box sx={{ height: 520, width: "100%", overflowY: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            paddingRight: "15px",
          }}
        >
          {carts.length === 0 ? (
            <Box sx={{marginLeft: '10px'}}>  Your cart is empty</Box>
          ) : (
            <div>
              {carts.map((cartItem) => (
                <CartItem cartItem={cartItem} />
              ))}
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
