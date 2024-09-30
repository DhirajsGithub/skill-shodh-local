import { Box, Skeleton } from "@mui/material";
import React from "react";
const skeletonStyle = { bgcolor: "#8b8b8b" };

const NotificationSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        padding: "20px",
        backgroundColor: "#28282D",
        borderBottom: "1px solid rgba(139, 139, 139, 0.2)",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Skeleton variant="text" width={60} height={15} sx={skeletonStyle} />
        <Skeleton variant="circular" width={5} height={5} sx={skeletonStyle} />
        <Skeleton variant="text" width={80} height={15} sx={skeletonStyle} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width={"80%"} height={15} sx={skeletonStyle} />

        <Skeleton variant="text" width={"50%"} height={15} sx={skeletonStyle} />
      </Box>
      <Skeleton variant="rounded" width={80} height={20} sx={skeletonStyle} />
    </Box>
  );
};

export default NotificationSkeleton;
