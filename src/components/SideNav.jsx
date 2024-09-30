import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import "./SideNav.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { categories, paths } from "../utils/sidebarPaths";
import PrimaryButton from "./Buttons/PrimaryButton";
import logoutIcon from "../assets/navBar_icons/bxs-log-out.svg.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  setLoginField,
  setSignUpField,
  toggleCollapse,
  toggleSidebar,
} from "../store";
import CloseIcon from "@mui/icons-material/Close";
import skillShodhLogo from "../assets/skill-shodh/Round Logo.png";

const hoverMenuStyle = {
  backgroundColor: "#23283D !important",
  color: "#5773FF !important",
  borderRight: "5px solid #5773FF",
  background: "#23283D",
  "& .css-q2f1jw-MuiTypography-root": {
    color: "#5773FF !important",
  },
};
const menuItemStyle = {
  button: ({ level, active, disabled }) => {
    if (active) {
      return hoverMenuStyle;
    }
    return {
      "&:hover": hoverMenuStyle,
    };
  },
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <MenuItem
      active={selected === to}
      style={{ padding: "0px" }}
      onClick={() => {
        setSelected && setSelected(to);
        navigate(to);
        // dispatch(toggleCollapse(false)); // to make sure that the sidebar will be full width
        dispatch(toggleSidebar());
      }}
      // component={to && <NavLink to={to} />}
    >
      <Box
        sx={{
          display: "flex",
          padding: "10px 43px",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {icon()}
        <Typography variant="h6">{title}</Typography>
      </Box>
    </MenuItem>
  );
};

const SideNav = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.authSlice);
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { collapsed, toggled } = useSelector((state) => state.navbarSlice);
  const [selected, setSelected] = useState("/");

  const { hash, pathname, search } = location;
  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const handleCollapsedChange = () => {
    dispatch(toggleCollapse());
  };
  const handleCloseIconClick = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleSidebar = (value) => {
    // setToggled(value);
  };
  const handleJoinSkillShodhClick = () => {
    navigate("/signup");
  };
  const handleLogoutClick = () => {
    dispatch(logoutUser());
    dispatch(setSignUpField({ field: "firstName", value: "" }));
    dispatch(setSignUpField({ field: "lastName", value: "" }));
    dispatch(setSignUpField({ field: "email", value: "" }));
    dispatch(setLoginField({ field: "email", value: "" }));
    dispatch(setLoginField({ field: "password", value: "" }));
    navigate("/login");
  };
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        // width: "240px",

        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        rootStyles={{
          backgroundColor: "#212126",
          border: "none",
          color: "white",
          "& :hover": {
            backgroundColor: "transparent !important",
          },
        }}
        onBackdropClick={handleCloseIconClick}
        backgroundColor="#212126"
        borderC
        // image={image ? sidebarBg : false}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        {/* Header */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            position: "sticky",
            top: "0%",
            zIndex: 999,
          }}
        >
          {!smallScreen && (
            <Box
              onClick={handleCollapsedChange}
              sx={{
                margin: "20px",
                cursor: "pointer",
              }}
            >
              {collapsed ? <EastIcon /> : <WestIcon />}
            </Box>
          )}
          {smallScreen && (
            <Box
              onClick={handleCloseIconClick}
              sx={{
                margin: "20px",
                cursor: "pointer",
              }}
            >
              <CloseIcon />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "22px",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "31px",
              height: "31px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            alt="SkillShodh Logo"
            src={skillShodhLogo}
          />
          {!collapsed && (
            <Typography sx={{ color: collapsed && "transparent" }} variant="h4">
              SkillShodh
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            justifyContent: "space-between",
          }}
        >
          {categories.map((category) => {
            return (
              <Box key={category.id}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    padding: "0 42px",
                    margin: "46px 0 33px 0",
                  }}
                >
                  <Typography
                    sx={{ color: collapsed && "transparent" }}
                    variant="subtitle2"
                  >
                    {category?.name?.toUpperCase()}
                  </Typography>
                </Box>
                <Menu menuItemStyles={menuItemStyle} iconShape="circle">
                  {paths
                    ?.filter((ele) => ele.category === category.name)
                    .map((path) => {
                      return (
                        <Item
                          key={path.id}
                          title={path.name}
                          to={path.path}
                          icon={path.icon}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      );
                    })}
                </Menu>
              </Box>
            );
          })}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              justifyContent: "space-between",
              margin: "40px 0px",
            }}
          >
            {!collapsed && !isAuthenticated && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 20px",
                }}
              >
                <PrimaryButton handleOnClick={handleJoinSkillShodhClick}>
                  Join SkillShodh
                </PrimaryButton>
              </Box>
            )}

            {isAuthenticated && (
              <Menu
                menuItemStyles={{
                  menuItemStyle,
                  "& :hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
                iconShape="circle"
              >
                <MenuItem
                  style={{ padding: "0px" }}
                  onClick={handleLogoutClick}
                  // component={to && <NavLink to={to} />}
                >
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 43px",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <Box
                      sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                      component="img"
                      alt="SkillShodh Logout Icon"
                      src={logoutIcon}
                    />
                    <Typography variant="h6">Log Out</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            )}

            {!collapsed && (
              <Box
                sx={{ width: "100%", textAlign: "center", padding: "0 20px" }}
              >
                <Typography variant="subtitle2">
                  {new Date().getFullYear()} All rights reserved
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SideNav;
