import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import useFetchData from "./custom_hooks/useFetchData";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb() {
  const { cate, sub, router } = useFetchData();
  const theme = useTheme();

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        separator={<ChevronRightIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ color: theme.palette.white.main, mt: 4, mb: 4 }}
      >
        <Link underline="hover" href="/">
          <Typography
            sx={{
              color:
                router.pathname === "/"
                  ? theme.palette.white.main
                  : theme.palette.grey.main,
            }}
          >
            Home
          </Typography>
        </Link>
        {cate && (
          <Link underline="hover" href={`/category/${cate.category}`}>
            <Typography
              sx={{
                color:
                  router.query.title === cate.category
                    ? theme.palette.white.main
                    : theme.palette.grey.main,
              }}
            >
              {cate.category}
            </Typography>
          </Link>
        )}

        {sub && (
          <Link
            underline="hover"
            color="white.main"
            href={`/sub_category/${sub}`}
          >
            <Typography
              sx={{
                color:
                  router.query.title === sub
                    ? theme.palette.white.main
                    : theme.palette.grey.main,
              }}
            >
              {sub}
            </Typography>
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
}
