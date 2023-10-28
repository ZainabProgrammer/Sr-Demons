import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Sub_Card from "./Sub_Card";
import { Container } from "@mui/system";
import { Typography, Box, Divider } from "@mui/material";

export const Cards = () => {
  const category = useSelector((state) => state.category.allData);
  let singlecat = category.flatMap((e) => e.categories);
  let subCategories = singlecat.flatMap((e) => e.sub_category);

  return (
    <>
      <Container maxWidth="xl">
        {singlecat.map((e, index) => {
          return (
            <Box mt={5} mb={5} key={index}>
              <Typography
                key={index}
                color="white.main"
                variant="h4"
                fontWeight="bold"
              >
                {e.title}
              </Typography>
              <Typography mt={2}>
                {e.description.map((e) => e.main)}{" "}
                <Typography
                  component="span"
                  color="green.main"
                  fontWeight="bold"
                >
                  {e.description.map((e) => e.highlight)}
                </Typography>
              </Typography>

              <Typography>{e.description.map((e) => e.other)}</Typography>
            </Box>
          );
        })}
      </Container>
      <Grid
        maxWidth="lg"
        sx={{
          margin: "auto",
        }}
        container
        spacing={1}
      >
        {subCategories.map((subCategory, id) => (
          <Sub_Card
            key={id}
            title={subCategory.title}
            price={subCategory.price}
            points={subCategory.points}
            imageUrl={subCategory.img}
          />
        ))}
      </Grid>
      <Container maxWidth="xl" sx={{ marginTop: 8, marginLeft: 0 }}>
        {singlecat.map((e) => {
          return (
            <>
              <Typography
                color="white.main"
                variant="h4"
                fontWeight="bold"
                mb={3}
              >
                {e.title} service includes
              </Typography>
              <Typography>{e.services}</Typography>
              <Typography
                variant="h4"
                color="white.main"
                fontWeight="bold"
                mb={3}
                mt={2}
              >
                {e.title} FAQ
              </Typography>
              {e.faq.map((e, index) => {
                return (
                  <>
                    <Typography
                      mb={1}
                      mt={2}
                      color="white.main"
                      fontSize={20}
                      key={index}
                    >
                      {e.question}
                    </Typography>
                    <Typography color="inherit">{e.answer}</Typography>
                  </>
                );
              })}
            </>
          );
        })}
      </Container>
    </>
  );
};
