import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const useFetchData = () => {
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
  const isCartOpen = useSelector((state) => state.category.isCartOpen);

  return { cate, sub, router, singlecat, sub_data, isCartOpen };
};

export default useFetchData;
