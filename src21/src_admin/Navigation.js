import React from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useNavigate } from 'react-router-dom';
const Navigation = () => {

  const { collapseSidebar } = useProSidebar();

  const sidebarStyle = {
    background: 'linear-gradient(to bottom, #007bff, #00ff99)',
    height: "100vh"
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/admindnd');
    localStorage.clear();
  };



  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={sidebarStyle} rtl={false} transitionDuration={800}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}

            component={<Link to="/admindnd/dashboard" />}>Dashboard</MenuItem>
          <SubMenu icon={<HomeOutlinedIcon />} label="Home">
            <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to="/" />}>item 1</MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />}>item 2</MenuItem>
          </SubMenu>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/user-records" />}>User</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/product-table" />}>Product</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/country-table" />}>Country</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/event-table" />}>Event</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/slider" />}>Slider</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/plan-table" />}>Plan</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/withdrawal-request" />}>Withdrawal</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/user-transaction" />}>Transaction</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/level-table" />}>Level</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/support" />}>Support</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/create-level" />}>Create Level</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} component={<Link to="/admindnd/Notification" />}>Notification</MenuItem>
          <button onClick={handleLogout}>Logout</button>
          {/* <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/settings" />}>Settings</MenuItem> */}
          {/* <SubMenu icon={<HomeOutlinedIcon />} label="React liberary">
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/FormRegister" />}>React Form</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/ReactDnd" />}>React Dnd</MenuItem>
      
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/Reactproper" />}>React Proper</MenuItem>
        </SubMenu> */}
        </Menu>
      </Sidebar>

    </div>
  );
};

export default Navigation;