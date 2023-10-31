import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import useFetchData from "./custom_hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/CategorySlice";

export default function Cart_Details({ icon }) {
  const theme = useTheme();
  const { isCartOpen } = useFetchData();
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => () => {
    dispatch(toggleCart());

    return;
  };

  console.log(isCartOpen, "are they same");
  const list = (anchor) => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: theme.palette.bodyColor.main,
        height: "100%",
        color: theme.palette.grey.main,
        flexDirection: "column",
        "@media(min-width:600px)": {
          width: 500,
        },
      }}
      role="presentation"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={18}
        sx={{
          textAlign: "start",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          color="white.main"
          mt={8}
          sx={{ textAlign: "start" }}
        >
          Shopping Cart
        </Typography>

        <CloseIcon
          sx={{
            marginTop: 8,
            cursor: "pointer",
            background: theme.palette.grey.main,
            color: theme.palette.bodyColor.main,
            padding: 1.2,
            borderRadius: "50px",
            width: 40,
            height: 40,
          }}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          fontSize="large"
        />
      </Stack>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        height="100%"
        textAlign="center"
        p={4}
      >
        <Typography color="white.main" variant="h4">
          Your shopping cart is empty
        </Typography>
        <Typography variant="body1" fontSize={15}>
          Don&apos;t wait, let&apos;s get shopping and find your next deal
          today!
        </Typography>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: theme.palette.purple.main,
              textTransform: "capitalize",
              mt: 2,
              ":hover": {
                color: "white.main",
                backgroundColor: "purple.main",
                opacity: 0.9,
              },
            }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Start Shopping
          </Button>
        </div>
      </Stack>
    </Box>
  );

  return (
    <div>
      <div size="sm" onClick={toggleDrawer("right", true)}>
        {icon}
      </div>
      <SwipeableDrawer
        anchor="right"
        open={isCartOpen}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
