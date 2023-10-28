import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const Sub_Card = ({ title, price, points, id, imageUrl }) => {
  const theme = useTheme();

  return (
    <Grid key={id} item xs={12} sm={12} md={4}>
      <Link href={`/sub_category/${title}`}>
        <Card
          sx={{
            background: "#151A26",
            color: theme.palette.white.main,
            height: 420,
            width: 294,
            position: "relative",
            cursor: "pointer",
            marginTop: 4,
            "@media (max-width:600px)": {
              width: "100%",
            },
          }}
        >
          <CardMedia
            component="img"
            height={270}
            width="100%"
            image={imageUrl}
            alt={title}
            sx={{
              zIndex: -1,
              objectFit: "cover",

              width: "100% !important",

              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <CardContent
            sx={{
              marginTop: -10,
              zIndex: 100,
              padding: 4,
              position: "relative",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ zIndex: 1000 }}>
              {title}
            </Typography>

            <ul style={{ marginTop: 15 }}>
              {points.map((point, index) => (
                <li
                  style={{
                    marginLeft: 10,
                    marginTop: 5,
                    color:
                      index === 0
                        ? theme.palette.green.main
                        : theme.palette.grey.main,
                  }}
                  key={index}
                >
                  {point}
                </li>
              ))}
            </ul>
            <Typography mt={3} variant="subtitle1" color="grey.main">
              From
              <span
                style={{
                  color: theme.palette.white.main,
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                {" "}
                ${price}
              </span>
              <Button
                variant="contained"
                sx={{
                  float: "right",
                  background: theme.palette.purple.main,
                  ":hover": {
                    background: theme.palette.purple.main,
                    opacity: 0.8,
                  },
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Typography>
          </CardContent>
          {/* Overlay for hover effect */}
          <div
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          ></div>
        </Card>
      </Link>
    </Grid>
  );
};

export default Sub_Card;
