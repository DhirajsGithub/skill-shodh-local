import { Box, Typography } from "@mui/material";
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";

const UploadedResumeComp = ({ name, handleDeleteResume }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",

        padding: "8px 20px",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        border: "1px solid #888",
      }}
    >
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Box>
          <DescriptionIcon
            sx={{ color: "#fff", width: "24px", height: "24px" }}
          />
        </Box>
        <Typography variant="body1">{name}</Typography>
      </Box>
      <Box>
        <CloseIcon
          onClick={handleDeleteResume}
          sx={{
            color: "#fff",
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default UploadedResumeComp;
