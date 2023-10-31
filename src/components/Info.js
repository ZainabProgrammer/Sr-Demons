import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import useFetchData from "./custom_hooks/useFetchData";

const Info = () => {
  const { sub_data } = useFetchData();
  const theme = useTheme();
  return (
    <div>
      {sub_data.map(
        (e, index) =>
          e &&
          e.info_bar && (
            <Typography
              key={index}
              sx={{
                background: theme.palette.orange.main,
                width: "86%",
                mt: 2,
                p: 1,
                color: "white.main",
                borderLeft: `2px solid ${theme.palette.orange.dark}`,
                "@media (max-width:600px)": { width: "100%" },
              }}
            >
              {sub_data.map((e) => e && e.info_bar)}
            </Typography>
          )
      )}
    </div>
  );
};

export default Info;
