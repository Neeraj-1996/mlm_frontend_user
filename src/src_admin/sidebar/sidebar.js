import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
const SidebarPro = () => {
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
