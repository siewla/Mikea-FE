import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ProfileTab from "./ProfileTab";
import MyPurchaseTab from "./MyPurchaseTab";
import "./Dashboard.scss";
import axios from "../../api/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

export default function LabTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  const [profile, setProfile] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (auth?.email) {
      axiosPrivate.get(`/user`).then((response) => {
        setProfile(response.data);
      });
    }
  }, [auth]);
  const themeTab = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            // display: "none",
            backgroundColor: "var(--color4a)",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            height: 0,
            paddingTop: 1,
            paddingBottom: 1,
            marginRight: 10,
            borderRadius: 5,
            // backgroundColor: "var(--color1)",
            color: "var(--color4)",
            minHeight: 38,
            ":hover": {
              // backgroundColor: "var(--colorGreen)",
              transition: "all 0.5s ease",
              color: "var(--color4a)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--colorGreen)",
              fontWeight: "bold",
              color: "var(--color4a)",
              ":hover": {
                backgroundColor: "var(--color4)",
                transition: "all 0.5s ease",
              },
            },
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: 0,
            marginTop: "1rem",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={themeTab}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My profile" value="1" />
              <Tab label="My purchase" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" padding={0}>
            <Box
              border={"solid 1px var(--color4)"}
              sx={{
                borderRadius: 1,
                height: "100vh",
                maxHeight: "calc(100vh - 12rem)",
                border: "1",
              }}
              className="tab-box"
            >
              <ProfileTab profile={profile} />
            </Box>
          </TabPanel>
          <TabPanel value="2" padding={0}>
            <Box
              border={"solid 1px var(--color4)"}
              sx={{
                borderRadius: 1,
                height: "100vh",
                maxHeight: "calc(100vh - 12rem)",
                border: "1",
                display: "flex",
                justifyContent: "center",
              }}
              className="tab-box"
            >
              <MyPurchaseTab />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
