import { CssBaseline } from "@mui/material";
import AppThemeProvider from "@/theme/AppThemeProvider";
import Sidebar from "@/components/Sidebar";

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <div>
        <Sidebar />
      </div>
    </AppThemeProvider>
  );
}

export default App;
