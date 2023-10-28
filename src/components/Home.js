import { Button, Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography variant="div" fontWeight="bold" className="core-heading">
        GAMES ARE TOUGH, BUT OUR PROS ARE TOUGHER
      </Typography>
      <Typography
        variant="h3"
        color="white.main"
        fontSize="6vmin"
        mt={3}
        mb={3}
        fontWeight="bold"
      >
        Obtain the{" "}
        <span className="core-heading">items, currency, and coaching</span>{" "}
        necessary to take your game to the next level
      </Typography>
      <Button
        size="large"
        variant="contained"
        className="btn"
        sx={{ mt: 2, fontSize: 15 }}
      >
        Discover offers
      </Button>
      <Container maxWidth="md" fontSize="6vmin" sx={{ mt: 20 }}>
        <Typography
          variant="h4"
          fontSize="5vmin"
          fontWeight="bold"
          color="white.main"
        >
          More than 395,769 gamers trust Sr Demons to supply everything they’re
          looking for in online games
        </Typography>
        <Button
          size="large"
          variant="contained"
          className="btn"
          sx={{ mt: 5, fontSize: 15 }}
        >
          Start Your Journey
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
