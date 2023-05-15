import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import CssBaseline from "@mui/material/CssBaseline";
import { toggleState } from "../../features/DashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import { ListItem, ListItemText } from "@material-ui/core";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.05),
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "00ch",
    },
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const mobileScreen = useSelector((state) => state.dashboard.mobileView);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const changeDashboardView = () => {
    dispatch(toggleState());
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar>
              <Toolbar>
                {/* bar icon */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 0 }}
                  onClickCapture={changeDashboardView}
                >
                  <MenuIcon />
                </IconButton>
                {mobileScreen ? (
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    MUI DASHBOARD
                  </Typography>
                ) : null}

                {!mobileScreen && (
                  <>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/"
                        sx={{ display: { xs: "none", md: "block" } }}
                      >
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/employee"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="Employee" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/inbox"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="Inbox" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/about"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="About" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/email"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="Send email" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/drafts"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="Drafts" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/all-mail"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="All mail" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/trash"
                        sx={{
                          marginLeft: "-35px",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ListItemText primary="Trash" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}

                {/* {mobileScreen ? (
                      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                ) : null} */}

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
