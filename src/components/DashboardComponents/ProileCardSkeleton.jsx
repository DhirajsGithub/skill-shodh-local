import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const ProileCardSkeleton = () => {
  return (
    <Card
      sx={{
        // maxWidth: headerSearchFocus && "260px",
        minWidth: "260px",
        width: "260px",
        minHeight: "250px",
        borderRadius: "10px",
        backgroundColor: "#212126",
        flexGrow: 1,
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            padding: "20px",
            gap: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Box>
              <Skeleton sx={{ bgcolor: "#888888" }} variant="circular">
                <Avatar />
              </Skeleton>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton sx={{ bgcolor: "#888888" }} width="60%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton sx={{ bgcolor: "#888888" }} width="40%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
          <Skeleton sx={{ bgcolor: "#888888" }} variant="text" width="90%" />
          <Skeleton sx={{ bgcolor: "#888888" }} variant="text" width="80%" />
          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Skeleton
              sx={{ bgcolor: "#888888", borderRadius: "20px" }}
              variant="rectangle"
              width={100}
              height={30}
            />
            <Skeleton
              sx={{ bgcolor: "#888888", borderRadius: "20px" }}
              variant="rectangle"
              width={70}
              height={30}
            />
            <Skeleton
              sx={{ bgcolor: "#888888", borderRadius: "20px" }}
              variant="rectangle"
              width={90}
              height={30}
            />
            <Skeleton
              sx={{ bgcolor: "#888888", borderRadius: "20px" }}
              variant="rectangle"
              width={70}
              height={30}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProileCardSkeleton;
