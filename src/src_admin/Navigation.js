import React from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem,  SubMenu ,useProSidebar } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import EventIcon from "@mui/icons-material/Event";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from 'react-router-dom';
const Navigation = () => {

  const { collapseSidebar} = useProSidebar();

  const sidebarStyle = {
    background: 'linear-gradient(to bottom, #007bff, #00ff99)',
    height: "100vh",
    position: "fixed", 
    zIndex: 9,        
    top: 0,           
    left: 0           
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/admindnd'); 
    localStorage.clear();
};

  
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <Sidebar  style={sidebarStyle} rtl={false} transitionDuration={800} className='sidebarAdmin'>
      <Menu>
        <MenuItem  
         icon={<MenuOutlinedIcon />}
         onClick={() => {
           collapseSidebar();
         }}
         style={{ textAlign: "center"  }}
        
        component={<Link to="/admindnd/dashboard" />}>Dashboard</MenuItem>
        <SubMenu icon={<HomeOutlinedIcon />} label="Home">
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/" />}>item 1</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>item 2</MenuItem>
        </SubMenu>

         <MenuItem icon={<AccountCircleIcon />} component={<Link to="/admindnd/user-records" />}>User</MenuItem>
          <MenuItem icon={<ShoppingCartIcon />} component={<Link to="/admindnd/product-table" />}>Product</MenuItem>
          <MenuItem icon={<LanguageIcon />} component={<Link to="/admindnd/country-table" />}>Country</MenuItem>
          <MenuItem icon={<EventIcon />} component={<Link to="/admindnd/event-table" />}>Event</MenuItem>
          <MenuItem icon={<PhotoLibraryIcon />} component={<Link to="/admindnd/slider" />}>Slider</MenuItem>
          <MenuItem icon={<MonetizationOnIcon />} component={<Link to="/admindnd/plan-table" />}>Plan</MenuItem>
          <MenuItem icon={<CurrencyExchangeIcon />} component={<Link to="/admindnd/withdrawal-request" />}>Withdrawal</MenuItem>
          <MenuItem icon={<ReceiptIcon />} component={<Link to="/admindnd/user-transaction" />}>Transaction</MenuItem>
          <MenuItem icon={<AccountCircleIcon />} component={<Link to="/admindnd/level-table" />}>Level</MenuItem>
          <MenuItem icon={<SupportAgentIcon />} component={<Link to="/admindnd/support" />}>Support</MenuItem>
          <MenuItem icon={<AccountCircleIcon />} component={<Link to="/admindnd/create-level" />}>Create Level</MenuItem>
          <MenuItem icon={<NotificationsActiveIcon />} component={<Link to="/admindnd/Notification" />}>Notification</MenuItem>

        <button onClick={handleLogout}>Logout</button>
      
      </Menu>
      </Sidebar>
     
      </div>
  );
};

export default Navigation;

