import { Box, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";

const DatePicker = ({ label, placeholder, onChangeDate, date, disabled }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box sx={{ zIndex: 12 }}>
      <ReactDatePicker
        disabled={disabled}
        dateFormat="dd/MM/yyyy"
        customInput={
          <TextField
            autoComplete="off"
            inputProps={{
              style: {
                color: "#8B8B8B",
                fontSize: smallScreen ? "16px" : "20px",
                fontWeight: 400,
                padding: 0,
              },
            }}
            sx={{
              "& fieldset": { border: "none" },
              border: "1.5px solid rgba(136, 136, 136, 0.60)",

              borderRadius: "10px",
              padding: smallScreen ? "10px 15px" : "10px 32px",
              "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px",
              },
              width: "100%",
              "& .css-1ta7j1d-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px !important",
              },
              "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px !important",
              },
              "& .css-1ara0gn-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingRight: "0px !important",
              },
            }}
          />
        }
        placeholderText={placeholder}
        selected={date ? date : null}
        onChange={(date) => onChangeDate(date)}
      />
    </Box>
  );
};

export default DatePicker;
