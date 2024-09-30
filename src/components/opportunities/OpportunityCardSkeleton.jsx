import {
  Box,
  Button,
  Chip,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
const skeletonStyle = { bgcolor: "#8b8b8b" };

const ButtonsReq = () => {
  return (
    <Skeleton
      sx={{
        borderRadius: "46px",

        padding: "10px 20px",

        ...skeletonStyle,
      }}
      variant="rounded"
      width={"100%"}
      height={35}
    />
  );
};

const SkillChip = ({ label }) => {
  return (
    <Skeleton
      sx={{
        padding: "8px 16px",
        borderRadius: "40px",
        ...skeletonStyle,
      }}
      variant="rounded"
      width={70}
      height={30}
    />
  );
};

const OpportunityCardSkeleton = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px 30px",
        backgroundColor: "#212126",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box>
        <Skeleton variant="text" width={"20%"} height={15} sx={skeletonStyle} />
        <Skeleton variant="text" width={"40%"} height={25} sx={skeletonStyle} />
      </Box>

      <Box>
        <Skeleton variant="text" width={"15%"} height={15} sx={skeletonStyle} />
        <Skeleton variant="text" width={"30%"} height={25} sx={skeletonStyle} />
      </Box>
      <Box>
        <Skeleton variant="text" width={"20%"} height={15} sx={skeletonStyle} />
        <Skeleton variant="text" width={"60%"} height={25} sx={skeletonStyle} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton variant="text" width={70} height={15} sx={skeletonStyle} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <SkillChip />
            <SkillChip />
            <SkillChip />
          </Box>
          <Box sx={{ width: smallScreen ? "100%" : "10%" }}>
            <ButtonsReq />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OpportunityCardSkeleton;
