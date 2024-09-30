import { Box, SwipeableDrawer, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useSelector } from "react-redux";

const NavItem = ({ name, id, handleTabChange, tab }) => {
  return (
    <Typography
      onClick={() => handleTabChange(id)}
      sx={{
        color: tab === id ? "#5773FF" : "auto",
        padding: "4px 8px",
        cursor: "pointer",
        "&:hover": {
          color: "#5773FF",
        },
      }}
      variant="subtitle2"
    >
      {name}
    </Typography>
  );
};

const Header = ({ handleTabChange, tab }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { isAuthenticated } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => (event) => {
    console.log(event);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };
  const tabToName = {
    NewOpportunities: "New Opportunities",
    CreateOpportunities: "Create Opportunities",
    AppliedOpportunities: "Applied Opportunities",
    CreatedOpportunities: "Created Opportunities",
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: "0%",
          zIndex: 100,
          display: smallScreen ? "none" : "block",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
            background: "#18181D",
            padding: "20px 70px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <NavItem
            tab={tab}
            handleTabChange={handleTabChange}
            id="NewOpportunities"
            name={tabToName.NewOpportunities}
          />
          {isAuthenticated && (
            <NavItem
              tab={tab}
              handleTabChange={handleTabChange}
              id="CreateOpportunities"
              name={tabToName.CreateOpportunities}
            />
          )}
          {isAuthenticated && (
            <NavItem
              tab={tab}
              handleTabChange={handleTabChange}
              id="AppliedOpportunities"
              name={tabToName.AppliedOpportunities}
            />
          )}
          {isAuthenticated && (
            <NavItem
              tab={tab}
              handleTabChange={handleTabChange}
              id="CreatedOpportunities"
              name={tabToName.CreatedOpportunities}
            />
          )}
        </Box>
      </Box>
      <Box>
        <Box
          onClick={() => setOpen(true)}
          sx={{
            display: smallScreen ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
          {/* <Typography variant="body1">More Options</Typography> */}
          <Typography variant="body1">{tabToName[tab]}</Typography>
        </Box>
        <SwipeableDrawer
          anchor={"top"}
          open={smallScreen && open}
          onClose={() => setOpen(false)}
          onOpen={toggleDrawer()}
        >
          <Box
            onClick={() => setOpen(false)}
            sx={{
              width: "100%",
              padding: "20px",
              backgroundColor: "#18181D",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <DoubleArrowIcon sx={{ color: "#fff" }} />
              <Typography variant="body1">Opportunities</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",

                width: "100%",
              }}
            >
              <NavItem
                tab={tab}
                handleTabChange={handleTabChange}
                id="NewOpportunities"
                name={tabToName.NewOpportunities}
              />
              {isAuthenticated && (
                <NavItem
                  tab={tab}
                  handleTabChange={handleTabChange}
                  id="CreateOpportunities"
                  name={tabToName.CreateOpportunities}
                />
              )}
              {isAuthenticated && (
                <NavItem
                  tab={tab}
                  handleTabChange={handleTabChange}
                  id="AppliedOpportunities"
                  name={tabToName.AppliedOpportunities}
                />
              )}
              {isAuthenticated && (
                <NavItem
                  tab={tab}
                  handleTabChange={handleTabChange}
                  id="CreatedOpportunities"
                  name={tabToName.CreatedOpportunities}
                />
              )}
            </Box>
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
};

export default Header;
