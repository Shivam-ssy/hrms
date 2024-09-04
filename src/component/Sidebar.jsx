import  { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemIcon, IconButton, Drawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { access } from '../utils/Role';
import { logout } from '../BackendAsService/features';
const Sidebar = () => {
  const user=localStorage.getItem('userData')
  const userData=JSON.parse(user);
  const role=userData.role
  const [open, setOpen] = useState(true);
  const [openEmployee, setEmployeeOpen] = useState(false);
  const [openPayroll, setPayrollOpen] = useState(false);
  const [openPerformance, setPerformanceOpen] = useState(false);
  // const [reportsOpen, setReportsOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    setOpen(!open);
  };
  const handleEmployeeClick = () => {
    setEmployeeOpen(!openEmployee);
  };
 
  // const handleReportsClick = () => {
  //   setReportsOpen(!reportsOpen);
  // };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ width: '250px', backgroundColor: '#FFFFFF', color: '#333333', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <List component="nav">
        <ListItem button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <AccountBalanceIcon style={{ color: '#333333' }} />
          </ListItemIcon>
         <Link to='/dashboard'> <ListItemText primary="Dashboard" /></Link>
        </ListItem>
        {/* <ListItem button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <AccountBalanceIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Department Management" />
        </ListItem> */}
         {
              access.admin.includes(role) &&
        <ListItem button onClick={handleEmployeeClick} style={{ padding: '10px 20px' }}>
          <ListItemIcon>
          <i className="ri-user-2-fill "></i>
          </ListItemIcon>
          <ListItemText primary="Employee Management" />
          {openEmployee ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        }
        <Collapse in={openEmployee} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {
              access.admin.includes(role) &&
              <ListItem button style={{ padding: '10px 40px' }}>
             <Link to="/employee"> <ListItemText primary="Employee Directory" /></Link>
            </ListItem>
          }  
            <ListItem button style={{ padding: '10px 40px' }}>
             <Link to="/profile"> <ListItemText primary="Edit Your Info" /></Link>
            </ListItem>
            {
              access.admin.includes(role) &&
            <ListItem button style={{ padding: '10px 40px' }}>
             <Link to="/create-employee"> <ListItemText primary="Create Employee" /></Link>
            </ListItem>
            }
          </List>
        </Collapse>
        <ListItem button onClick={handleClick} style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <PeopleIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Leave Management" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/apply-leave"> <ListItemText primary="Apply leave" /></Link>
            </ListItem>
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/apply-leave"> <ListItemText primary="Leave History" /></Link>
            </ListItem>
          </List>
        </Collapse>
        <ListItem onClick={()=>setPayrollOpen(!openPayroll)} button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <DashboardIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Payroll Managment" />
          {openPayroll ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayroll} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {
              access.admin.includes(role) &&
              <div>

            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/payroll-create"> <ListItemText primary="Payroll Record" /></Link>
            </ListItem>
          
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/payroll-report"> <ListItemText primary="Payroll Report" /></Link>
            </ListItem>
              </div>
}
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/payroll-dashboard"> <ListItemText primary="Payroll Dashboard" /></Link>
            </ListItem>
            {
              access.admin.includes(role) &&
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/payroll-hr"> <ListItemText primary="Payroll Hr Dashboard" /></Link>
            </ListItem>
            }
          </List>
        </Collapse>
        <ListItem onClick={()=>setPerformanceOpen(!openPerformance)} button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <AssessmentIcon style={{ color: '#333333' }} />
            </ListItemIcon>
              <ListItemText primary="Performance Management" />
              {openPerformance ? <ExpandLess /> : <ExpandMore />}

        </ListItem>
        <Collapse in={openPerformance} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
         

            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/company-performance"> <ListItemText primary="Company Performance" /></Link>
            </ListItem>
          
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/individual-perfromance"> <ListItemText primary="Individual Performance" /></Link>
            </ListItem>
             
           
              
            <ListItem button style={{ padding: '10px 40px' }}>
            <Link to="/review-perfromance"> <ListItemText primary="Performance Review" /></Link>
            </ListItem>

          </List>
        </Collapse>
        {/* <ListItem button onClick={handleReportsClick} style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <AssessmentIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {reportsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}
        {/* <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button style={{ padding: '10px 40px' }}>
              <ListItemText primary="Employee Reports" />
            </ListItem>
            <ListItem button style={{ padding: '10px 40px' }}>
              <ListItemText primary="Payroll Reports" />
            </ListItem>
            <ListItem button style={{ padding: '10px 40px' }}>
              <ListItemText primary="Performance Reports" />
            </ListItem>
          </List>
        </Collapse> */}
        <ListItem button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <NotificationsIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem onClick={()=>setSettingOpen(!settingOpen)} button style={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <SettingsIcon style={{ color: '#333333' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {settingOpen ? <ExpandLess /> : <ExpandMore />}

        </ListItem>
         <Collapse in={settingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button style={{ padding: '10px 40px' }}>
              <ListItemText onClick={async ()=>await logout()} primary="Logout" />
            </ListItem>
           
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <div>
      {isMobile ? (
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            style={{ marginLeft: '10px', color: '#333333' }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </div>
      ) : (
        <div style={{ width: '250px' }}>
          {drawer}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
