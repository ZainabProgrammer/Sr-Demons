import { useTheme } from "@emotion/react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FAQ from "./FAQ";
import Side_Card from "./Side_Card";
import Main_FAQ from "./Main_FAQ";
import useFetchData from "./custom_hooks/useFetchData";

const main_heading = {
  fontWeight: "bold",
  color: "white.main",
};
const listItem = {
  marginTop: "-10px",
  marginLeft: "-10px",
  fontWeight: "bold",
};

const MainComponent = () => {
  const theme = useTheme();
  const { singlecat, sub_data } = useFetchData();

  return (
    <Grid container spacing={0} direction="row-reverse">
      <Grid item xs={12} sm={12} md={4}>
        <Container disableGutters>
          {singlecat.map((e, index) => {
            return (
              <Typography
                key={index}
                variant="h2"
                mb={3}
                sx={{
                  ...main_heading,
                  "@media (min-width:900px)": { display: "none" },
                }}
              >
                {sub_data && sub_data.map((e) => e && e.title).toString()}
              </Typography>
            );
          })}
          <Side_Card />
        </Container>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        {singlecat.map((e) => {
          return (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  "@media (max-width:600px)": {
                    flexDirection: "column",
                    alignItems: "start",
                  },
                }}
              >
                <Typography
                  flex={1}
                  variant="h2"
                  sx={{
                    ...main_heading,
                    "@media (max-width:900px)": { display: "none" },
                  }}
                >
                  {sub_data.map((e) => e && e.title).toString()}
                </Typography>
              </Stack>
              <Container
                maxWidth="sm"
                sx={{ marginLeft: "-20px", marginTop: 2 }}
              >
                <Typography variant="body1" color="grey.main">
                  {sub_data.map((e) => e && e.description.map((e) => e.main))}
                </Typography>
                <Typography
                  color="grey.main"
                  variant="body"
                  sx={{ marginTop: 1 }}
                >
                  {sub_data.map(
                    (e) => e && e.description.map((el) => el.other)
                  )}
                </Typography>
              </Container>
              <Container
                maxWidth="sm"
                sx={{ marginLeft: "-20px", marginTop: 2 }}
              >
                <Typography variant="h3" sx={main_heading} mt={6} mb={3}>
                  What you will get
                </Typography>
                <ul
                  style={{
                    marginLeft: 20,
                    padding: 1,
                    color: theme.palette.green.main,
                  }}
                >
                  {sub_data.map(
                    (e) =>
                      e &&
                      e.features.map((feature, index) => {
                        return (
                          <li
                            key={index}
                            sx={listItem}
                            style={{
                              fontSize: 18,
                              color: theme.palette.green.main,
                            }}
                          >
                            {index < 3 ? (
                              <>
                                <Typography
                                  variant="body1"
                                  style={{
                                    color: theme.palette.green.main,
                                    fontSize: 18,
                                    padding: 3,
                                  }}
                                >
                                  {feature}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <li
                                  key={index}
                                  sx={listItem}
                                  style={{
                                    fontSize: 18,
                                    padding: 3,
                                    color: theme.palette.grey.main,
                                  }}
                                >
                                  {feature}
                                </li>
                              </>
                            )}
                          </li>
                        );
                      })
                  )}
                </ul>
              </Container>
              <Container
                maxWidth="sm"
                sx={{ marginLeft: "-20px", marginTop: 2 }}
              >
                <Typography
                  variant="h3"
                  mt={4}
                  sx={{ marginBottom: 3, ...main_heading }}
                >
                  Execution Options
                </Typography>
                <ul
                  style={{
                    marginLeft: 20,
                    padding: 1,
                  }}
                >
                  {e.options.map((feature, index) => {
                    return (
                      <li
                        key={index}
                        sx={listItem}
                        style={{
                          fontSize: 18,
                          padding: 3,
                          color: theme.palette.grey.main,
                        }}
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </Container>
              <Container
                maxWidth="sm"
                sx={{ marginLeft: "-20px", marginTop: 2 }}
              >
                <Typography
                  variant="h3"
                  mt={4}
                  sx={{ marginBottom: 3, ...main_heading }}
                >
                  Additional Options
                </Typography>
                <ul
                  style={{
                    marginLeft: 20,
                    padding: 1,
                  }}
                >
                  {e.add_options.map((feature, index) => {
                    return (
                      <li
                        key={index}
                        sx={listItem}
                        style={{
                          fontSize: 18,
                          padding: 3,
                          color: theme.palette.grey.main,
                        }}
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </Container>
            </>
          );
        })}
        <Container
          maxWidth="md"
          sx={{ marginLeft: "-10px", marginTop: 2, marginBottom: 2 }}
        >
          {sub_data.map((e, index) => {
            return (
              <FAQ
                key={index}
                descriptions={e && e.working.map((e) => e)}
                title="How it works"
              />
            );
          })}
        </Container>
        <Container
          maxWidth="md"
          sx={{ marginLeft: "-10px", marginTop: 2, marginBottom: 2 }}
        >
          {singlecat.map((e, index) => {
            return (
              <>
                <FAQ
                  key={index}
                  title="Requirements"
                  descriptions={e.requirements.map((e) => (
                    <>
                      <Typography sx={{ color: "#FE4661", fontWeight: "bold" }}>
                        {e.main}
                        <Typography
                          variant="span"
                          sx={{
                            color: theme.palette.grey.main,
                            fontWeight: "normal",
                          }}
                        >
                          &nbsp;{e.other}
                        </Typography>
                      </Typography>
                    </>
                  ))}
                />
              </>
            );
          })}
        </Container>
        <Box sx={{ mt: 6 }}>
          <Typography
            color="white.main"
            variant="h3"
            marginLeft={2}
            fontWeight="bold"
          >
            {sub_data.map((e) => e && e.title)} FAQ
          </Typography>
          <Main_FAQ />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainComponent;
