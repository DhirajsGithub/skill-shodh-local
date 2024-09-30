import { Box, Typography, useMediaQuery } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";

const Step = ({ number, isActive, isCompleted }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box>
      <Box
        sx={{
          width: smallScreen ? "40px" : "50px",
          height: smallScreen ? "40px" : "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",

          border: `2px solid ${
            isActive ? "#5773FF" : "rgba(136, 136, 136, 0.20)"
          }`,
          background: isCompleted ? "#5773FF" : isActive ? "#212126" : "",
        }}
      >
        {isCompleted && (
          <DoneIcon
            sx={{
              color: "#fff",
              width: smallScreen ? "20px" : "40px",
              height: smallScreen ? "20px" : "40px",
            }}
          />
        )}
        {!isCompleted && (
          <Typography
            sx={{ color: isActive ? "#5773FF" : "#888" }}
            variant={"h5"}
          >
            {number}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const Stepper = ({ pageDetail }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: smallScreen ? "30px 0px" : "50px 0px",
      }}
    >
      <Box
        sx={{
          width: smallScreen ? "90%" : "450px",
          height: "65px",
          // minWidth: "300px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Step
          isActive={pageDetail.number === 0}
          number={1}
          isCompleted={pageDetail.number > 0}
        />
        <Box
          sx={{
            border: `1px solid ${
              pageDetail.number > 0 ? "#5773FF" : "rgba(136, 136, 136, 0.20)"
            }`,
            width: "100%",
          }}
        />
        <Step
          isActive={pageDetail.number === 1}
          number={2}
          isCompleted={pageDetail.number > 1}
        />
        <Box
          sx={{
            border: `1px solid ${
              pageDetail.number > 1 ? "#5773FF" : "rgba(136, 136, 136, 0.20)"
            }`,
            width: "100%",
          }}
        />
        <Step
          isActive={pageDetail.number === 2}
          number={3}
          isCompleted={pageDetail.number > 2}
        />
        <Box
          sx={{
            border: `1px solid ${
              pageDetail.number > 2 ? "#5773FF" : "rgba(136, 136, 136, 0.20)"
            }`,
            width: "100%",
          }}
        />
        <Step
          isActive={pageDetail.number === 3}
          number={4}
          isCompleted={pageDetail.number > 3}
        />
      </Box>
    </Box>
  );
};

export default Stepper;
