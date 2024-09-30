import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
const skeletonStyle = { bgcolor: "#8b8b8b" };

const SkeletonScreens = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box>
      {!smallScreen && (
        <Box>
          <Skeleton variant="text" width={100} height={25} sx={skeletonStyle} />
          <br />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={200}
            sx={skeletonStyle}
          />
        </Box>
      )}
      {smallScreen && (
        <Box>
          <Skeleton variant="text" width={100} height={25} sx={skeletonStyle} />
          <br />
          <Skeleton variant="text" width={100} height={25} sx={skeletonStyle} />

          <br />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={100}
            sx={skeletonStyle}
          />
          <br />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={100}
            sx={skeletonStyle}
          />
        </Box>
      )}
    </Box>
  );
};

export default SkeletonScreens;
