import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Stack } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogContent,
  FormControl,
  InputBase,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import Cart_Details from "./Cart_Details";
import { useDispatch, useSelector } from "react-redux";
import { toggleCurrency } from "@/store/CategorySlice";

const iconStyle = {
  borderRadius: "50%",
  padding: ".4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const drawerWidth = 240;

const Header = ({ handleDrawerToggle }) => {
  const [currency, setCurrency] = React.useState("USD");
  // const { data, currency, setcurrency } = useGetCurrency();
  const myCurr = useSelector((state) => state.category.toEuro);
  console.log(myCurr, "euro");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const handleChange = (event) => {
    // setCurrency(event.target.value);
  };
  // console.log(data, "apoi res");
  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
  };
  const theme = useTheme();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  const dispatch = useDispatch();
  return (
    <div>
      <AppBar
        position="fixed"
        color="lightBlack"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="grey"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            minWidth="100%"
          >
            <Box sx={{ display: { sm: "flex", display: "none" } }}>
              <form noValidate autoComplete="off">
                <FormControl sx={{ width: "25ch" }}>
                  <OutlinedInput
                    size="small"
                    placeholder="Search here"
                    startAdornment={
                      <SearchIcon
                        style={{
                          color: theme.palette.bodyColor.main,
                          marginRight: 4,
                        }}
                      />
                    }
                    sx={{
                      "&.MuiOutlinedInput-root": {
                        background: theme.palette.grey.main,
                      },
                      "&.MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.bodyColor.main,
                        borderRadius: "50px",
                      },
                      borderRadius: "50px",
                      color: theme.palette.bodyColor.main,
                    }}
                  />
                </FormControl>
              </form>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{
                "@media (max-width:600px)": {
                  minWidth: "100%",
                  justifyContent: "center",
                },
              }}
            >
              <FormControl>
                <Select
                  labelId="currency-label"
                  id="currency-select"
                  value={currency}
                  onChange={handleChange}
                  IconComponent={ArrowDropDownOutlinedIcon}
                  sx={{
                    border: "none",
                    "& .MuiSelect-icon": {
                      color: "grey",
                      "&:hover .MuiSelect-icon": {
                        color: "white", // Change color on hover
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="USD">
                    <Typography
                      color="grey"
                      onClick={() => dispatch(toggleCurrency(false))}
                    >
                      USD
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    value="EUR"
                    onClick={() => dispatch(toggleCurrency(true))}
                  >
                    <Typography color="grey">Euro</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
              <Typography
                sx={{
                  "@media (min-width:600px)": {
                    display: "none",
                  },
                  background: theme.palette.grey.main,

                  ...iconStyle,
                }}
              >
                <SearchIcon
                  fontSize="small"
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.bodyColor.main,
                  }}
                  className="icon"
                  onClick={handleSearchClick}
                />
                <Dialog
                  open={isSearchOpen}
                  onClose={() => setSearchOpen(false)}
                  fullWidth
                >
                  <DialogContent
                    sx={{
                      position: "fixed",
                      top: "2%",
                      left: 0,
                      background: theme.palette.bodyColor.main,

                      marginLeft: "7px",
                      right: 0,
                      width: "96%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <InputBase
                      placeholder="Search..."
                      fullWidth
                      sx={{ color: theme.palette.grey.main }}
                      autoFocus
                      inputProps={{ "aria-label": "search" }}
                      endAdornment={
                        <SearchIcon
                          fontSize="medium"
                          sx={{ ml: 3, color: "grey.main", cursor: "pointer" }}
                        />
                      }
                    />
                  </DialogContent>
                </Dialog>
              </Typography>
              <Typography
                sx={{ ...iconStyle, background: theme.palette.grey.main }}
              >
                <PermIdentityOutlinedIcon
                  fontSize="small"
                  className="icon"
                  sx={{ color: theme.palette.bodyColor.main }}
                />
              </Typography>

              <div onClick={openCart} style={{ cursor: "pointer" }}>
                <Cart_Details
                  openCart={openCart}
                  icon={
                    <>
                      <Typography
                        sx={{
                          ...iconStyle,
                          background: theme.palette.grey.main,
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="small"
                          className="icon"
                          sx={{ color: theme.palette.bodyColor.main }}
                        />
                      </Typography>
                    </>
                  }
                />
              </div>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
