import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@emotion/react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Link from "next/link";
import Breadcrumb from "./BreadCrumb";
import Home from "./Home";
import useFetchData from "./custom_hooks/useFetchData";
const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { singlecat } = useFetchData();

  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Icon = props.icon;
  const drawer = (
    <div>
      <Toolbar
        sx={{
          color: "white.main",
          fontWeight: "bold",
          fontFamily: "monospace",
          fontSize: 23,
        }}
      >
        <Link href="/">Sr Demons</Link>
      </Toolbar>

      <List sx={{ color: "white.main", marginTop: 5 }}>
        {singlecat.map((text, index) => (
          <ListItem key={index} disablePadding>
            <SideMenu
              title={text.category}
              descriptions={text.sub_category.map((e) => e.title)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: theme.palette.lightBlack.main,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: theme.palette.lightBlack.main,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className={!Icon ? "home-page" : "other-page"}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // background: `url("https://images.unsplash.com/photo-1476370648495-3533f64427a2?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmt8ZW58MHx8MHx8fDA%3D") no-repeat`,

          width: "100%",
          color: "white",
          backgroundSize: "cover", // Maintain the aspect ratio
          backgroundPosition: "center",
          // opacity: 0.9,
        }}
      >
        <Toolbar />
        <Breadcrumb />
        {Icon && <Icon />}
        {!Icon && <Home />}
      </Box>
    </Box>
  );
}

export default Sidebar;
