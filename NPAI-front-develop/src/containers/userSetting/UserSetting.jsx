import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import UserUpdate from "../userUpdate/UserUpdate";
import NewPassword from "../newPassword/NewPassword";
import "./style.css";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const accessToken = sessionStorage.getItem("Token");
  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: "2%" }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTab = styled((props) => <Tab disableRipple {...props} />)({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: 17,
  color: "#9e9e9ef5",
  "&.Mui-selected": {
    color: "#74a0ef",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#9e9e9ef5",
  },
});
function UserSetting() {
  const accessToken = sessionStorage.getItem("Token");
  const [value, setValue] = useState(0);
  if (!accessToken) {
    return <Navigate to="/" />;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="User-setting-container">
      <GenericSideBar />
      <div className="middle">
        <Box sx={({ width: "100%" }, { marginTop: "1%" })}>
          <Box sx={{ bgcolor: "#fff" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
              centered
            >
              <StyledTab label="Change password" />
              <StyledTab label="Update" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="change-logo-color-container">
              <NewPassword />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserUpdate />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default UserSetting;
