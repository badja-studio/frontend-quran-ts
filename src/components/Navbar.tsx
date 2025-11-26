import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MenuBook as MenuBookIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import authService from '../services/authService';

const drawerWidth = 260;

interface NavItem {
  text: string;
  icon: JSX.Element;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    roles: ['Admin', 'Assessor', 'Assessee'],
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
    path: '/users',
    roles: ['Admin'],
  },
  {
    text: 'Surahs',
    icon: <MenuBookIcon />,
    path: '/surahs',
    roles: ['Admin'],
  },
  {
    text: 'Assessments',
    icon: <AssessmentIcon />,
    path: '/assessments',
    roles: ['Admin'],
  },
  {
    text: 'My Assessments',
    icon: <AssessmentIcon />,
    path: '/my-assessments',
    roles: ['Assessor'],
  },
  {
    text: 'My Progress',
    icon: <TrendingUpIcon />,
    path: '/my-progress',
    roles: ['Assessee'],
  },
  {
    text: 'Schedule',
    icon: <ScheduleIcon />,
    path: '/schedule',
    roles: ['Assessor', 'Assessee'],
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    roles: ['Admin'],
  },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const userInfo = authService.getUserInfo();
  const userRole = userInfo?.roles || 'Assessee';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h6" component="div" color="primary">
            Quran App
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Welcome,
        </Typography>
        <Typography variant="subtitle1" fontWeight="medium">
          {userInfo?.name || userInfo?.email || 'User'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Role: {userRole}
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {filteredNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
