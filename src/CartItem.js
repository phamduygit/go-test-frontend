import { Box, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "./axios";
import { useDispatch } from 'react-redux';
CartItem.propTypes = {
  product: PropTypes.object,
};


export default function CartItem({ cartItem }) {

  const { _id, name, image, price, color, quantity } = cartItem;

  const [mount, setMount] = useState(quantity);

  const dispatch = useDispatch();

  const onClickPlusButton = async () => {
    console.log(_id)
    const response = await axios({
      method: 'put',
      url: `/api/v1/cart/${_id}`,
      data: {
        quantity: mount + 1
      },
    });
    console.log(response);
    setMount(mount + 1);
  }

  const onClickMinusButton = async () => {
    if (mount === 1) return;
    const response = await axios({
      method: 'put',
      url: `/api/v1/cart/${_id}`,
      data: {
        quantity: mount - 1
      },
    });
    console.log(response);
    setMount(mount - 1);
  }

  const onClickTrashButton = async () => {
    const response = await axios({
      method: 'delete',
      url: `/api/v1/cart/${_id}`
    });
    dispatch({ type: 'INCREMENT' });
    console.log(response);
  }

  return (
    <>
      <Stack direction="row" sx={{ mb: 1 }} spacing={3}>
        <Box
          width={100}
          height={100}
          style={{
            backgroundColor: `${color}`,
            borderRadius: "50%",
          }}
        >
          <Box top="-40px" left="-20px" position="relative">
            <img
              alt="nike"
              src={image}
              height={150}
              width={150}
              style={{
                // backgroundColor: "#e1e7ed",
                transform: "rotate(-20deg)",
              }}
            />
          </Box>
        </Box>
        <Stack>
          <Stack
            direction="column"
            sx={{ mb: 4 }}
            spacing={1}
            justifyContent="space-between"
          >
            <Typography>
              <Box sx={{ fontWeight: 600, ml: 1, fontSize: 15 }}>
                {name}
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ fontWeight: 700, ml: 1, fontSize: 22 }}>${price}</Box>
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{width: 210}}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  style={{
                    backgroundColor: "#e1e7ed",
                    borderRadius: "50%",
                  }}
                >
                  <IconButton aria-label="delete" onClick={onClickMinusButton}>
                    <img
                      alt="plus"
                      src="/assets/minus.png"
                      width={10}
                      height={10}
                    />
                  </IconButton>
                </Box>

                <Typography align="center">
                  <Box sx={{ fontWeight: 500, ml: 1, fontSize: 16 }}>{mount}</Box>
                </Typography>
                <Box
                  style={{
                    backgroundColor: "#e1e7ed",
                    borderRadius: "50%",
                  }}
                >
                  <IconButton aria-label="delete" onClick={onClickPlusButton}>
                    <img
                      alt="plus"
                      src="/assets/plus.png"
                      width={10}
                      height={10}
                    />
                  </IconButton>
                </Box>
              </Stack>
              <Box
                style={{
                  backgroundColor: "#F6C90E",
                  borderRadius: "50%",
                }}
              >
                <IconButton aria-label="delete" onClick={onClickTrashButton}>
                  <img
                    alt="plus"
                    src="/assets/trash.png"
                    width={15}
                    height={15}
                  />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
