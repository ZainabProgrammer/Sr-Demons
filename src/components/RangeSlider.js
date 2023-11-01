import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.purple.main,
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 33,
    width: 7,
    borderRadius: "4px",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
      cursor: "grab",
    },
    "& .airbnb-bar": {
      height: 10,
      width: 0,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 27,
    borderRadius: "2px",
  },
  "& .MuiSlider-rail": {
    color:
      theme.palette.mode === "dark" ? "#bfbfbf" : theme.palette.bodyColor.main,
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    cursor: "default",
    height: 27,
    borderRadius: 5,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const RangeSlider = () => {
  const theme = useTheme();
  const [yourVal, setyourVal] = useState(0);
  const [desiredVal, setdesiredVal] = useState(900);
  const [division, setdivision] = useState("BRONZE");
  const [desiredDivision, setdesiredDivision] = useState("");

  useEffect(() => {
    if (yourVal >= 0 && yourVal <= 900) {
      setdivision("BRONZE");
    } else if (yourVal > 900 && yourVal <= 2099) {
      setdivision("SILVER");
    } else if (yourVal >= 2100 && yourVal <= 3599) {
      setdivision("GOLD");
    } else if (yourVal >= 3600 && yourVal <= 5399) {
      setdivision("PLATINUM");
    } else if (yourVal >= 5400 && yourVal <= 7499) {
      setdivision("DIAMOND");
    } else if (yourVal >= 7599 && yourVal <= 9999) {
      setdivision("CRIMSON");
    } else setdivision("");

    if (desiredVal >= 0 && desiredVal <= 899) {
      setdesiredDivision("");
    } else if (desiredVal >= 900 && desiredVal <= 2099) {
      setdesiredDivision("SILVER");
    } else if (desiredVal >= 2100 && desiredVal <= 3599) {
      setdesiredDivision("GOLD");
    } else if (desiredVal >= 3600 && desiredVal <= 5399) {
      setdesiredDivision("PLATINUM");
    } else if (desiredVal >= 5400 && desiredVal <= 7499) {
      setdesiredDivision("DIAMOND");
    } else if (desiredVal >= 7500 && desiredVal <= 9999) {
      setdesiredDivision("CRIMSON");
    } else if (desiredVal === 10000 && desiredVal <= 10099) {
      setdesiredDivision("IRIDESCENT");
    } else if (desiredVal >= 10100 && desiredVal <= 13099) {
      setdesiredDivision("POSSIBLE TOP 250");
    } else setdesiredDivision("GUARENTEED TOP 250");
  }, [yourVal, desiredVal]);

  const handleChange = (event, newValue) => {
    setyourVal(newValue[0]);
    setdesiredVal(newValue[1]);
  };

  return (
    <>
      <Container disableGutters sx={{ mt: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ position: "relative" }}
          p={1}
        >
          <Stack>
            <Typography gutterBottom fontSize={12}>
              Your SR
            </Typography>
            <Box
              sx={{
                background: theme.palette.bodyColor.main,
                width: "4rem",
                height: "2.5rem",
                textAlign: "center",
                pt: "12px",
              }}
            >
              {yourVal}
            </Box>
          </Stack>

          <Stack>
            <Typography gutterBottom fontSize={12}>
              Desired SR
            </Typography>

            <Box
              sx={{
                background: theme.palette.bodyColor.main,
                width: "4rem",
                height: "2.5rem",
                textAlign: "center",
                pt: "12px",
              }}
              mb={3}
            >
              {desiredVal}
            </Box>
            <Box sx={{ position: "absolute", top: 36, left: "43%" }}>
              <ArrowForwardIcon />
            </Box>
          </Stack>
        </Stack>
        <Box padding={1}>
          <AirbnbSlider
            slots={{ thumb: AirbnbThumbComponent }}
            value={[yourVal, desiredVal]}
            onChange={handleChange}
            min={0}
            max={15000}
          />
        </Box>

        {division !== "" && (
          <Container disableGutters sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                color: theme.palette.grey.main,
              }}
            >
              Your Division
            </Typography>
            <Typography
              mt={2}
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color:
                  division === "GOLD"
                    ? "yellow"
                    : division === "BRONZE"
                    ? "#A47C5F"
                    : division === "SILVER"
                    ? "white.main"
                    : division === "PLATINUM"
                    ? "#0F9784"
                    : division === "DIAMOND"
                    ? "#3C8EB1"
                    : division === "CRIMSON"
                    ? "red"
                    : "yellow",
              }}
            >
              {division}
            </Typography>
          </Container>
        )}
        {desiredDivision !== "" && (
          <Container disableGutters sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                color: theme.palette.grey.main,
              }}
            >
              Desired Division
            </Typography>
            <Typography
              mt={2}
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color:
                  desiredDivision === "GOLD"
                    ? "yellow"
                    : desiredDivision === "SILVER"
                    ? "white.main"
                    : desiredDivision === "PLATINUM"
                    ? "#0F9784"
                    : desiredDivision === "DIAMOND"
                    ? "#3C8EB1"
                    : desiredDivision === "CRIMSON"
                    ? "red"
                    : "yellow",
              }}
            >
              {desiredDivision}
            </Typography>
          </Container>
        )}
      </Container>
    </>
  );
};

export default RangeSlider;
