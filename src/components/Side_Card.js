import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import useGetCurrency from "./custom_hooks/useGetCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  convertPricesToEuro,
  incrementCartCount,
  toggleCart,
} from "@/store/CategorySlice";
import { ShoppingCart } from "@mui/icons-material";
import useFetchData from "./custom_hooks/useFetchData";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import RangeSlider from "./RangeSlider";
const DynamicCard = dynamic(() => import("@mui/material/Card"), { ssr: false });

const btn_style = {
  border: "1px solid purple.main",
  color: "grey.main",
  textTransform: "capitalize",
  textAlign: "start",
  marginTop: 1,
};

const StyledCardActionArea = styled(CardActionArea)(
  ({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
);

export default function Side_Card() {
  const theme = useTheme();
  const { singlecat, sub_data } = useFetchData();
  const [activeButton, setActiveButton] = React.useState(0);
  const [exec_active, setexec_active] = React.useState(0);
  const [addButton, setaddButton] = React.useState(0);
  const [checkboxStates, setCheckboxStates] = React.useState(
    Array(sub_data[0] && sub_data[0].add_options.length).fill(false)
  );
  const { conversionRate, loading, error } = useGetCurrency(
    "https://api.apilayer.com/currency_data/convert?to=EUR&from=USD&amount=1"
  );

  const dispatch = useDispatch();

  const toEuro = useSelector((state) => state.category.toEuro);
  const data = useSelector((state) => state.category.allData);

  let basePrice = sub_data[0] && sub_data[0].price;

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const handleExecButton = (index) => {
    setexec_active(index);
  };

  const handleAddButton = (index) => {
    setaddButton(index);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (sub_data[0] && sub_data[0].boost_method[activeButton]) {
      totalPrice += sub_data[0].boost_method[activeButton].price;
    }

    if (sub_data[0] && sub_data[0].exec_options[exec_active]) {
      totalPrice += sub_data[0].exec_options[exec_active].price;
    }

    checkboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        totalPrice += sub_data[0].add_options[index].price;
      }
    });

    return totalPrice;
  };

  React.useEffect(() => {
    if (toEuro && !loading && typeof conversionRate === "number") {
      const convertedRate = calculateTotalPrice() * conversionRate;
      dispatch(convertPricesToEuro(convertedRate));
      console.log(data, "hmmmmm get or not");
    }
  }, [calculateTotalPrice, data, dispatch, loading]);

  const [topPosition, setTopPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newPosition = Math.max(3, 270 - scrollY); // Adjust 100 to the desired distance
      setTopPosition(newPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {sub_data.map((e, index) => {
        return (
          <DynamicCard
            key={index}
            sx={{
              borderTop: `7px solid ${theme.palette.purple.main}`,
              width: "90%",
              background: theme.palette.lightBlack.main,
              ":hover": {
                background: "none",
              },
              color: "white.main",
              "@media (max-width:500px)": {
                width: "100%",
              },
            }}
          >
            <CardActionArea
              disableRipple
              sx={{
                "&:hover": {
                  background: "transparent", // Override the hover effect with the same transparent background
                },
                background: theme.palette.lightBlack.main,
              }}
            >
              <CardMedia
                component="img"
                height="440"
                image={e && e.img}
                alt="green iguana"
                sx={{
                  zIndex: -1,
                  ":hover": { background: theme.palette.lightBlack.main },
                }}
              />
              <CardContent
                sx={{
                  zIndex: 1000,
                  mt: -24,
                  position: "relative",
                  backgroundColor: theme.palette.lightBlack.main,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  fontSize={15}
                  component="div"
                  color="grey.main"
                >
                  PLATFORM <Divider />
                  {e &&
                    e.platform.map((e, index) => (
                      <span
                        direction="row"
                        style={{ marginLeft: 7 }}
                        key={index}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            ...(addButton === index
                              ? {
                                  background: theme.palette.purple.main,
                                }
                              : {
                                  ":hover": {
                                    background: theme.palette.purple.main,
                                  },
                                }),
                            ...btn_style,
                          }}
                          onClick={() => handleAddButton(index)}
                        >
                          {e}
                        </Button>
                      </span>
                    ))}
                </Typography>
                <Typography component="div" mt={3} color="grey.main">
                  BOOST METHOD <Divider />
                  {e &&
                    e.boost_method.map((e, index) => (
                      <span
                        direction="row"
                        style={{ marginLeft: 7 }}
                        key={index}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            ...(activeButton === index
                              ? {
                                  background: theme.palette.purple.main,
                                  color: `${theme.palette.white.main} !important`,
                                }
                              : {
                                  ":hover": {
                                    background: theme.palette.purple.main,
                                  },
                                }),
                            ...btn_style,
                          }}
                          onClick={() => handleButtonClick(index)}
                        >
                          {e.method} &nbsp;
                          {e && e.price > 0 && (
                            <span>
                              {toEuro ? `+€ ${e.price}` : `+$${e.price}`}
                            </span>
                          )}
                        </Button>
                      </span>
                    ))}
                </Typography>
                <Typography component="div" mt={3} color="grey.main">
                  EXECUTION OPTIONS <Divider />
                  {e &&
                    e.exec_options.map((e, index) => (
                      <span
                        direction="row"
                        style={{ marginLeft: 7 }}
                        key={index}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            ...(exec_active === index
                              ? {
                                  background: theme.palette.purple.main,
                                  color: `${theme.palette.white.main} !important`,
                                }
                              : {
                                  ":hover": {
                                    background: theme.palette.purple.main,
                                  },
                                }),
                            ...btn_style,
                          }}
                          onClick={() => handleExecButton(index)}
                        >
                          {e.option}&nbsp;
                          {e && e.price > 0 && (
                            <span>
                              {toEuro ? `+€ ${e.price}` : `+$${e.price}`}
                            </span>
                          )}
                        </Button>
                      </span>
                    ))}
                </Typography>
                {sub_data.map(
                  (e, index) => e && e.rewards && <RangeSlider key={index} />
                )}

                <Typography component="div" mt={3} color="grey.main">
                  ADDITIONAL OPTIONS <Divider />
                  {e &&
                    e.add_options.map((el, index) => (
                      <Stack
                        mb={-1}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        key={index}
                      >
                        <Box color="grey.main">
                          <Checkbox
                            sx={{
                              color: "grey",
                              "&.Mui-checked": {
                                color: theme.palette.purple.main,
                              },
                            }}
                            checked={checkboxStates[index]}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <span>{el.name}</span>
                        </Box>

                        <Box>
                          {el.price > 0 && (
                            <span>
                              {toEuro ? `+€ ${el.price}` : `+$${el.price}`}
                            </span>
                          )}
                        </Box>
                      </Stack>
                    ))}
                </Typography>
                <Box
                  sx={{
                    position: "sticky",
                    bottom: `${topPosition}px`,
                    padding: "11px 0",
                    paddingBottom: "60px",
                    width: "100%",
                    // left: 0,
                    background: theme.palette.lightBlack.main,
                  }}
                >
                  <Divider
                    sx={{
                      background: theme.palette.bodyColor.main,
                      mt: 3,
                      height: 2,
                    }}
                  />

                  <Typography
                    component="div"
                    color="white"
                    fontWeight="bold"
                    fontSize={20}
                    sx={{ mt: 2 }}
                  >
                    {toEuro
                      ? `€ ${calculateTotalPrice()}`
                      : `$${calculateTotalPrice()}`}
                  </Typography>

                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <QueryBuilderIcon fontSize="small" color="white" />
                      <Typography color="white.main">
                        {e && e.order_comp}{" "}
                        <span style={{ color: "grey" }}>order completion</span>
                      </Typography>
                    </Typography>
                  </Stack>

                  <Button
                    fullWidth
                    sx={{
                      marginTop: 3,
                      marginBottom: 1,
                      background: theme.palette.purple.main,
                      ":hover": {
                        background: theme.palette.purple.main,
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => {
                      dispatch(toggleCart(true));
                      dispatch(incrementCartCount());
                      dispatch(addToCart(e));
                    }}
                    variant="contained"
                  >
                    <ShoppingCart sx={{ marginRight: 1 }} />
                    ADD TO CART
                  </Button>
                </Box>
              </CardContent>
            </CardActionArea>
          </DynamicCard>
        );
      })}
    </>
  );
}
