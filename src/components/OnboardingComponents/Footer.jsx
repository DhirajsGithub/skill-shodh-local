import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import ActionButton from "../Buttons/ActionButton";
import EastIcon from "@mui/icons-material/East";

const Footer = ({ handleNextButtonClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: smallScreen ? "40px 20px" : "30px 60px",
        marginTop: !smallScreen && "30px",
        borderTop: !smallScreen && "2px solid rgba(136, 136, 136, 0.20)",
      }}
    >
      {!smallScreen && (
        <Box>
          <ActionButton
            handleOnClick={handleNextButtonClick}
            name="Next"
            rightIcon={
              <EastIcon sx={{ color: "#fff", width: "18px", height: "18px" }} />
            }
          />
        </Box>
      )}
      {smallScreen && (
        <ActionButton
          handleOnClick={handleNextButtonClick}
          name="Next"
          rightIcon={
            <EastIcon sx={{ color: "#fff", width: "18px", height: "18px" }} />
          }
        />
      )}
    </Box>
  );
};

export default Footer;
