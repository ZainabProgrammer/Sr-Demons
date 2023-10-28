import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownIcon
        fontSize="medium"
        sx={{ color: "white.main", fontWeight: "bold" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
}));

export default function Main_FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const category = useSelector((state) => state.category.allData);
  let singlecat = category.flatMap((e) => e.categories);
  let faqData = singlecat.map((e) => e.faqData);
  let corr = faqData.map((e) => e);
  console.log(
    corr.map((e) => e.map((e) => e)),
    "faq from faq"
  );
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ marginLeft: "-10px", mt: 5 }}>
      {corr[0].map((item, index) => (
        <Accordion
          key={index} // Use index as the key
          expanded={expanded === index} // Check the expanded state against the index
          onChange={handleChange(index)} // Pass the index to the handleChange function
        >
          <AccordionSummary
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              background: theme.palette.bodyColor.light,
              marginTop: 2,
              color: theme.palette.grey.main,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: theme.palette.white.main,
                fontSize: 20,
              }}
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                background: theme.palette.bodyColor.light,
                color: theme.palette.grey.main,
                paddingLeft: 3,
                paddingRight: 2,
                paddingBottom: 2,
              }}
            >
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
