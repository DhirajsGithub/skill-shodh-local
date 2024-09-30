import {
  useMediaQuery,
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React from "react";

const LoginSignupInput = ({
  label,
  placeholder,
  onChangeHandler,
  value,
  borderColor,
  multiline,
  rows,
  maxLength,
  startIcon,
  error,
  type,
  onFocus,
  endIcon,
  viewOnly,
  ...restProps
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {label && (
        <Box>
          <Typography variant="body1">{label}</Typography>
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        <TextField
          onChange={(event) => onChangeHandler(event.target.value)}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          type={type}
          onFocus={onFocus}
          inputProps={{
            readOnly: viewOnly,
            maxLength: maxLength,

            min:
              Number.isFinite(restProps.min) && restProps.min !== 0
                ? Number(restProps.min)
                : null,
            style: {
              color: "#8B8B8B",
              fontSize: smallScreen ? "16px" : "20px",
              fontWeight: 400,
              padding: 0,
            },
          }}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            endAdornment: endIcon && (
              <InputAdornment position="start">{endIcon}</InputAdornment>
            ),
          }}
          multiline={multiline}
          rows={rows}
          {...restProps}
          sx={{
            "& fieldset": { border: "none" },
            border: `1.5px solid ${
              error?.isError
                ? "#FF4242"
                : borderColor
                ? borderColor
                : "rgba(136, 136, 136, 0.60)"
            }`,

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
            "& .css-8pxvwv-MuiInputBase-root-MuiOutlinedInput-root": {
              padding: "0px !important",
            },
          }}
        />
        {error?.isError && (
          <Typography
            sx={{ color: "#FF4242", marginTop: "4px", marginLeft: "15px" }}
            variant="body2"
          >
            {error?.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginSignupInput;
