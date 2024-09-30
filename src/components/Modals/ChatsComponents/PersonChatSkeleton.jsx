import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const PersonChatSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px 20px",
        alignItems: "flex-start",
        gap: "10px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        background: "#212126",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Skeleton sx={{ bgcolor: "#888888" }} variant="circular">
          <Avatar />
        </Skeleton>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "95%" }}>
            <Skeleton sx={{ bgcolor: "#888888" }} width="50%">
              <Typography>.</Typography>
            </Skeleton>
            <Skeleton sx={{ bgcolor: "#888888" }} width="80%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonChatSkeleton;
