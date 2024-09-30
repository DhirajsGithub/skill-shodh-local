import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import checkCircle from "../../assets/checkCircle.svg";
import unCheckCircle from "../../assets/unCheckCircle.svg";

const SuggestionCard = ({ checked, name, color, fix, handleOnClick }) => {
  const [clicked, setClicked] = useState(checked);

  return (
    <Box
      onClick={() => {
        handleOnClick && handleOnClick(name);
        !fix && setClicked(!clicked);
      }}
      sx={{
        cursor: "pointer",
        width: "100%",
        display: "inline-flex",
        padding: "8px 10px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "32px",
        border: "1px solid rgba(136, 136, 136, 0.20)",
      }}
    >
      <Box
        component="img"
        src={clicked ? checkCircle : unCheckCircle}
        sx={{ width: "16px", height: "16px" }}
      />
      <Typography
        sx={{
          color: color && color,
          // minWidth: "100px",
          wordBreak: "break-all",
        }}
        variant="body1"
      >
        {name}
      </Typography>
    </Box>
  );
};

export default SuggestionCard;
