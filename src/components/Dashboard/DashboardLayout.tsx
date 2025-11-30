import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  AccountCircle,
  ExitToApp,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EditAttributes,
  UploadFile,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;
const drawerWidthCollapsed = 65;

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  children?: MenuItem[];
}

interface MenuConfig {
  assessor: MenuItem[];
  admin: MenuItem[];
  guru?: MenuItem[];
  participant?: MenuItem[];
}

// Menu configuration untuk setiap role
const menuConfig: MenuConfig = {
  assessor: [
    {
      text: "Peserta yang siap asesmen",
      icon: <RecentActorsIcon />,
      path: "/dashboard/asesor/siap-asesmen",
    },
    // {
    //   text: "Sedang melaksanakan",
    //   icon: <RecentActorsIcon />,
    //   path: "/dashboard/asesor/sedang-asesmen",
    // },
    {
      text: "Belum asesmen",
      icon: <RecentActorsIcon />,
      path: "/dashboard/asesor/belum-asesmen",
    },
    {
      text: "Hasil Asesmen",
      icon: <AssignmentIcon />,
      path: "/dashboard/asesor/hasil-asesmen",
    },
    {
      text: "Data Pengguna",
      icon: <SettingsIcon />,
      path: "/dashboard/asesor/kelola-data-pengguna",
    },
  ],
  admin: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/admin" },
    {
      text: "Data Peserta",
      icon: <PeopleIcon />,
      path: "/dashboard/data-peserta",
    },
    {
      text: "Rekap Asesor",
      icon: <PeopleIcon />,
      path: "/dashboard/data-asesor",
    },
    {
      text: "Input Data Baru",
      icon: <UploadFile />,
      path: "",
      children: [
        {
          text: "Input Asesor",
          icon: <PeopleIcon />,
          path: "/dashboard/admin/input-asesor",
        },
        {
          text: "Input Peserta",
          icon: <PeopleIcon />,
          path: "/dashboard/admin/input-peserta",
        },
      ],
    },
    {
      text: "Asesmen",
      icon: <BookIcon />,
      path: "",
      children: [
        {
          text: "Peserta Siap Asesmen",
          icon: <PeopleIcon />,
          path: "/dashboard/siap-asesmen",
        },
        {
          text: "Belum Asesmen",
          icon: <PeopleIcon />,
          path: "/dashboard/belum-asesmen",
        },
        {
          text: "Hasil Asesmen",
          icon: <PeopleIcon />,
          path: "/dashboard/hasil-asesmen",
        },
      ],
    },

    {
      text: "Data Pengguna",
      icon: <SettingsIcon />,
      path: "/dashboard/admin/kelola-data-pengguna",
    },
  ],
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "admin" | "assessor" | "guru" | "participant";
  userName?: string;
  userEmail?: string;
}

export default function DashboardLayout({
  children,
  userRole,
  userName = "User",
  userEmail = "user@example.com",
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    handleMenuClose();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const toggleSubmenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Ambil menu items berdasarkan role
  const menuItems: MenuItem[] = menuConfig[userRole] ?? [];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: drawerOpen ? "space-between" : "center",
          px: drawerOpen ? 2 : 1,
          py: 2,
        }}
      >
        {drawerOpen && (
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            Quran App
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerCollapse}
          sx={{
            display: { xs: "none", sm: "flex" },
            color: "primary.main",
          }}
        >
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      {drawerOpen && (
        <Box sx={{ px: 2, py: 1, bgcolor: "primary.main", color: "white" }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Role
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {userRole}
          </Typography>
        </Box>
      )}
      <Divider />
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            {/* Parent item */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  item.children
                    ? toggleSubmenu(item.text)
                    : handleNavigate(item.path)
                }
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "primary.main",
                    minWidth: 0,
                    mr: drawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {drawerOpen && <ListItemText primary={item.text} />}

                {/* Chevron untuk dropdown */}
                {drawerOpen &&
                  item.children &&
                  (openMenus[item.text] ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  ))}
              </ListItemButton>
            </ListItem>

            {/* Child items / Submenu */}
            {item.children && openMenus[item.text] && drawerOpen && (
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {item.children.map((child) => (
                  <ListItem key={child.text} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigate(child.path)}
                      sx={{ minHeight: 42, pl: 3 }}
                    >
                      <ListItemIcon
                        sx={{ color: "primary.main", minWidth: 36 }}
                      >
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: `calc(100% - ${
              drawerOpen ? drawerWidth : drawerWidthCollapsed
            }px)`,
          },
          ml: { sm: `${drawerOpen ? drawerWidth : drawerWidthCollapsed}px` },
          transition: "all 0.3s",
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard {userRole === "assessor" ? "Assessor" : "Admin"}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">{userName}</Typography>
              <Typography variant="caption" color="text.secondary">
                {userEmail}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerOpen ? drawerWidth : drawerWidthCollapsed },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
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
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerOpen ? drawerWidth : drawerWidthCollapsed,
              transition: "width 0.3s",
              overflowX: "hidden",
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
          width: {
            sm: `calc(100% - ${
              drawerOpen ? drawerWidth : drawerWidthCollapsed
            }px)`,
          },
          minHeight: "100vh",
          bgcolor: "grey.50",
          transition: "all 0.3s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
