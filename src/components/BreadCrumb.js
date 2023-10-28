import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb() {
  const category = useSelector((state) => state.category.allData);
  let singlecat = category.flatMap((e) => e.categories);
  const router = useRouter();
  const { title: category_title } = router.query;

  let subs = singlecat.map((e) => e.sub_category).map((e) => e);
  let sub_data = subs
    .flatMap((e) => e.find((e) => e.title === category_title))
    .map((e) => e);
  console.log(sub_data, "sub-data");

  let cate = singlecat.find((e) => e.category === category_title);
  let sub_cate = subs.flatMap((e) => e.map((e) => e.title));
  let sub = sub_cate.find((e) => e === category_title);

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
          <Link underline="hover" color="white.main" href={`/category/${sub}`}>
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
