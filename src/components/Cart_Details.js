import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { reomveFromCart, toggleCart } from "@/store/CategorySlice"; // Import the toggleCart action from your Redux slice

export default function Cart_Details({ icon }) {
  const theme = useTheme();
  const isCartOpen = useSelector((state) => state.category.isCartOpen); // Adjust the slice name if needed
  const cartData = useSelector((state) => state.category.cart);

  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const list = (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: theme.palette.bodyColor.main,
        height: cartData.length <= 0 ? "100%" : "100vmax",
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
          fontWeight="bold"
        >
          {cartData.length <= 0
            ? "Shopping Cart"
            : ` Shopping Cart (${cartData.length}) items`}
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
          onClick={handleToggleCart}
          fontSize="large"
        />
      </Stack>

      <Stack
        spacing={3}
        alignItems="center"
        justifyContent={cartData.length <= 0 ? "center" : "start"}
        height="100%"
        textAlign="center"
        pt={4}
      >
        {cartData.length <= 0 ? (
          <>
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
                onClick={handleToggleCart}
              >
                Start Shopping
              </Button>
            </div>
          </>
        ) : (
          <>
            {cartData.map((e, index) => {
              return (
                <Box key={index} sx={{ maxWidth: "100%" }}>
                  <Card
                    sx={{
                      maxWidth: "100%",
                      background: theme.palette.lightBlack.main,
                      color: theme.palette.grey.main,
                      fontWeight: "bold",
                    }}
                  >
                    <Stack direction="row">
                      <CardMedia
                        sx={{ width: "10rem", height: "6rem" }}
                        image={e.img}
                        title="green iguana"
                      />
                      <CardContent>
                        <Stack>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            textAlign="start"
                            fontWeight="bold"
                          >
                            {e.title}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              gap: 9,
                            }}
                          >
                            {e.platform.map((e, index) => (
                              <Typography
                                fontWeight="bold"
                                fontSize={12}
                                key={index}
                              >
                                {e}
                              </Typography>
                            ))}
                          </div>
                          <Typography
                            mt={1}
                            fontSize={12}
                            variant="p"
                            textAlign="start"
                          >
                            Sold by : Sr Demons
                          </Typography>
                          <Typography
                            mt={1}
                            fontSize={12}
                            variant="p"
                            textAlign="start"
                          >
                            Order completion: {e.order_comp}
                          </Typography>
                        </Stack>
                      </CardContent>
                      <Stack
                        justifyContent="space-between"
                        mt={2}
                        mb={2}
                        mr={1}
                      >
                        <Typography fontWeight="bold" color="white.main">
                          ${e.price}
                        </Typography>
                        <Button
                          sx={{ color: "grey.main" }}
                          onClick={() => dispatch(reomveFromCart(index))}
                        >
                          <Typography component="div" display="flex" gap={1}>
                            {" "}
                            <DeleteIcon /> Remove
                          </Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                </Box>
              );
            })}
          </>
        )}
      </Stack>
    </Box>
  );

  return (
    <div>
      <div size="sm" onClick={handleToggleCart}>
        {icon}
      </div>
      <SwipeableDrawer
        anchor="right"
        open={isCartOpen}
        onClose={handleToggleCart}
        onOpen={handleToggleCart}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
