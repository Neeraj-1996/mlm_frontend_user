import React from 'react';
import './sidebar.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
const SidebarPro = () => {

 // Default styles for desktop
 const defaultStyle = {
  position: "fixed",
  zIndex: 9,
  top: "0",
  left: "0",
  width: "250px", // Desktop width
};

// Mobile-specific styles for width <= 575px
const mobileStyle = {
  ...defaultStyle, // Inherit desktop styles
  width: "150px", // Example: Adjust width for mobile if needed
};

// Check if screen width is <= 575px
const isMobile = window.innerWidth <= 575; // ब्रैकेट्स को सही करें


  return (

    <Sidebar>
      <Menu menuItemStyles={{
        button: {
          // the active class will be added automatically by react router
          // so we can use it to style the active menu item
          [`&.active`]: {
            backgroundColor: '#13395e',
            color: '#b6c8d9',
          },
        },
      }}>
        <MenuItem>Dashboard</MenuItem>
        <SubMenu label="Component">
          <MenuItem component={<Link to="/login" />}> Login</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
        <MenuItem>Settings</MenuItem>
        <MenuItem>User</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarPro;
