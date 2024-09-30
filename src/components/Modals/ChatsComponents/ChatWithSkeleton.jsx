import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const Received = () => {
  return (
    <Box
      sx={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        textAlign: "flex-end",
      }}
    >
      <Box
        sx={{
          border: "1px solid var(--Symentic-Gray-20, #343434)",
          borderRadius: "10px 10px 10px 0px",
          padding: "8px",
        }}
      >
        <Skeleton sx={{ bgcolor: "#888888" }} width="90%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: "#888888" }} width="90%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: "#888888" }} width="40%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Box>
        <Skeleton sx={{ bgcolor: "#888888", height: "10px" }} width="10%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  );
};

const Sent = () => {
  return (
    <Box
      sx={{
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          border: "1px solid var(--Symentic-Gray-20, #343434)",
          // backgroundColor: "gray",
          borderRadius: "10px 10px 0px 10px",
          padding: "8px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Skeleton sx={{ bgcolor: "#888888" }} width="90%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: "#888888", textAlign: "end" }} width="50%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Skeleton sx={{ bgcolor: "#888888", height: "10px" }} width="10%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  );
};

const ChatWithSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",

        // width: "100%",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) =>
        index % 2 === 0 ? <Received key={index} /> : <Sent key={index} />
      )}
    </Box>
  );
};

export default ChatWithSkeleton;
