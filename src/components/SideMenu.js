import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "scale(1.4)",
      color: theme.palette.grey.main,
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function SideMenu({ title, descriptions }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const theme = useTheme();

  return (
    <Container disableGutters>
      <Divider sx={{ bgcolor: "dividerColor.main" }} />

      <Box
        sx={{
          marginLeft: 3,
          color: "grey.main",
          fontWeight: "bold",
          opacity: 0.5,
          fontSize: 12,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        CATEGORIES
      </Box>

      <Divider sx={{ bgcolor: "dividerColor.main" }} />

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          backgroundColor: theme.palette.lightBlack.main,
          color: theme.palette.grey.main,
        }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            borderLeft: expanded
              ? `3px solid ${theme.palette.purple.main}`
              : "",
            background: expanded ? "#1E1B55" : "",
            color: expanded ? theme.palette.white.main : "",
          }}
          expandIcon={
            !expanded ? (
              <AddIcon
                color="grey"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              />
            ) : (
              <RemoveIcon
                color="white"
                sx={{ fontSize: ".9rem", fontWeight: "bold" }}
              />
            )
          }
        >
          <Link href={`/category/${title}`}>
            <Typography sx={{ fontWeight: "bold", color: "inherit" }}>
              {title}
            </Typography>
          </Link>
        </AccordionSummary>
        <Divider sx={{ bgcolor: "dividerColor.main" }} />
        <AccordionDetails sx={{ background: theme.palette.lightBlack.main }}>
          <List>
            {descriptions.map((description, index) => (
              <Link href={`/sub_category/${description}`} key={index}>
                <ListItem
                  sx={{
                    ":hover": {
                      background: theme.palette.lightBlack.main,
                      cursor: "pointer",
                      color: theme.palette.white.main,
                      maxWidth: "100%",
                    },
                  }}
                  key={index}
                >
                  <ListItemText primary={description} />
                </ListItem>
              </Link>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ bgcolor: "dividerColor.main" }} />
    </Container>
  );
}
