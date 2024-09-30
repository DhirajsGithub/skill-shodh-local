import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import ProileCardSkeleton from "./ProileCardSkeleton";

const SkeletonCardList = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0 10px",
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{ bgcolor: "#888888", borderRadius: "20px" }}
          variant="rectangle"
          width={70}
          height={30}
        />

        <Skeleton sx={{ bgcolor: "#888888" }} width="80px">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          overflowX: "scroll",
          marginTop: "30px",
        }}
      >
        {[...Array(5)].map((_, index) => (
          <ProileCardSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonCardList;
