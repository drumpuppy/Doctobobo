import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MedicationIcon from "@mui/icons-material/Medication";
import Search from "../../Components/Search";
import { AuthContext } from "../../Context/AuthContext";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { user, userData } = React.useContext(AuthContext);
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [active, setActive] = React.useState("Doctobo");
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  React.useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, []);
  React.useEffect(() => {
    console.log(userData, "userData");
  }, [userData]);
  const PatList = [
    // {
    //   text: "Doctobo",
    //   link: "/",
    // },
      {
        text: "Page d'accueil",
        link: "/",
      },
  
      {
        text: "Mes rendez-vous",
        link: "/Dashboard/PatientAppointment",
      },
  
      {
        text: "Paramètres",
        link: "/Dashboard",
      },
  ];
  const DocList = [

    {
      text: "Page d'accueil",
      link: "/",
    },

    {
      text: "Mes disponibilités",
      link: "/Dashboard/avaiablity",
    },

    {
      text: "Mes rendez-vous",
      link: "/Dashboard/DoctorAppointment",
    },
    
    {
      text: "Paramètres",
      link: "/Dashboard",
    },
  ];

  const itemsList = userData.role === "doctor" ? DocList : PatList;
  const drawer = (
    <div
      style={{
        height: "100%",

        background:
          "linear-gradient(180deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
      }}
    >
      <Toolbar />
      {/* <Divider /> */}
      <List
        sx={{
          color: "white",
          fontFamily: "'poppins'",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {itemsList.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              setActive(item.text);
              navigate(item.link);
            }}
            sx={{
              color: active == item.text ? "rgb(2,41,138)" : "inherit",
              background: active == item.text ? "white" : "inherit",
              marginY: "2px",
              fontWeight: 600,

              width: "250px",
              borderRadius: "10px",
              transition: "all ease-out 0.4s",
              ":hover": {
                background: "white",
                color: "rgb(2,41,138)",
              },
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "inherit" }}>
                {index % 2 === 0 ? (
                  <MedicationIcon />
                ) : (
                  <AdminPanelSettingsIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  ".MuiListItemText-primary": {
                    fontSize: "18px",
                    fontFamily: "'poppins'",
                    fontWeight: 600,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },

          backgroundColor: "#E5F3FD",
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          {/* <Header /> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#E5F3FD",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
