import {
  Box,
  FormControlLabel,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const SwitchRow = ({ name, checked, handleOnChange }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: smallScreen ? "column" : "row",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Typography
          sx={{ fontSize: smallScreen ? "16px" : "18px" }}
          variant={smallScreen ? "subtitle1" : "body1"}
        >
          {name}
        </Typography>
        {name === "General Notification" && (
          <Tooltip
            title={
              <Typography variant="body1">
                new message, team join request will be visible here
              </Typography>
            }
            placement="top"
          >
            <InfoOutlinedIcon
              sx={{
                color: "#5773FF",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: smallScreen && "space-between",
        }}
      >
        <Typography sx={{ color: "#5773FF" }} variant="h6">
          {checked ? "ON" : "OFF"}
        </Typography>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch onChange={handleOnChange} checked={checked} />}
        />
      </Box>
    </Box>
  );
};

export default SwitchRow;
