import { Cards } from "@/components/Cards";
import Sidebar from "@/components/Sidebar";
import store from "@/store/store";
import AppThemeProvider from "@/theme/AppThemeProvider";
import { Provider } from "react-redux";
const title = () => {
  return (
    <>
      <AppThemeProvider>
        <Provider store={store}>
          <Sidebar icon={Cards} />
        </Provider>
      </AppThemeProvider>
    </>
  );
};
export default title;
