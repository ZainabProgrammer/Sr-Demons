import Cards from "@/components/Cards";
import MainComponent from "@/components/MainComponent";
import Sidebar from "@/components/Sidebar";
import store from "@/store/store";
import AppThemeProvider from "@/theme/AppThemeProvider";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
const title = () => {
  // const router = useRouter();
  // const category_title = router.query.title;
  // const category = useSelector((state) => state.category.allData);
  // let singlecat = category.flatMap((e) => e.categories);
  // console.log(
  //   singlecat.map((e) => e.sub_category),
  //   "dynamic"
  // );
  // let sub_category = singlecat.map((e) => e.sub_category);
  // let sub_category_data = sub_category.find((e) => e.title === category_title);

  // console.log(sub_category_data, "sub data");
  return (
    <>
      <AppThemeProvider>
        <Provider store={store}>
          <Sidebar icon={MainComponent} />
        </Provider>
      </AppThemeProvider>
    </>
  );
};
export default title;
