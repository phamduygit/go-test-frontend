import { Box, Typography } from "@mui/material";
import ProductCart from "./ProductCart";
import { useEffect, useState } from "react";
import axios from "./axios";
import { useSelector } from "react-redux";

export default function Product() {
  const [products, setProducts] = useState([]);
  const count = useSelector((state) => state.counter.count);


  useEffect(() => {
    // console.log(userInfo);
    const fetchProductList = async (currentUrl) => {
      try {
        console.log(currentUrl);
        const response = await axios({
          method: "get",
          url: currentUrl,
        });
        console.log(response.data);
        setProducts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductList("/api/v1/products/all");
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
      <Typography>
        <Box sx={{ fontWeight: 700, mt: 1, ml: 1, mb: 2, fontSize: 24 }}>
          Our Products
        </Box>
      </Typography>
      <Box sx={{ height: 550, width: "100%", overflowY: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            paddingRight: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCart product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
