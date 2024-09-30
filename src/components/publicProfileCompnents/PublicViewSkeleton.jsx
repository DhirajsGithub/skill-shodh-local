import React from "react";
import { Divider, Skeleton, useMediaQuery } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import ProileCardSkeleton from "../DashboardComponents/ProileCardSkeleton";
import { useSelector } from "react-redux";

const skeletonStyle = { bgcolor: "#8b8b8b" };

const PublicViewSkeleton = ({ userName }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  return (
    <Box>
      {/* banner  */}
      <Box
        sx={{
          margin: !smallScreen && "30px",
          backgroundColor: "#212126",
          borderRadius: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={smallScreen ? 90 : 250}
          sx={{
            ...skeletonStyle,
            borderRadius: !smallScreen && "10px 10px 0px 0px",
          }}
        />
        <Box sx={{ padding: "0px 30px" }}>
          <Box
            sx={{
              position: "relative",
              top: smallScreen ? "-40px" : "-75px",
              height: smallScreen ? "50px" : "90px",
            }}
          >
            <Skeleton
              variant="circular"
              width={smallScreen ? 80 : 150}
              height={smallScreen ? 80 : 150}
              sx={skeletonStyle}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Skeleton
                variant="text"
                width={smallScreen ? 150 : 200}
                height={smallScreen ? 20 : 30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={smallScreen ? 100 : 150}
                height={smallScreen ? 15 : 20}
                sx={skeletonStyle}
              />
            </Box>
            {user?.username === userName && (
              <Box>
                <Skeleton
                  variant="rounded"
                  width={smallScreen ? 70 : 100}
                  height={smallScreen ? 30 : 40}
                  sx={{ ...skeletonStyle }}
                />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              mt: 4,
              pb: 4,
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", gap: "16px" }}>
              <Skeleton
                variant="rounded"
                width={smallScreen ? 160 : 200}
                height={smallScreen ? 30 : 40}
                sx={{ ...skeletonStyle }}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? 100 : 130}
                height={smallScreen ? 30 : 40}
                sx={{ ...skeletonStyle }}
              />
            </Box>{" "}
            <Box sx={{ display: "flex", gap: "16px" }}>
              <Skeleton
                variant="rounded"
                width={smallScreen ? 20 : 30}
                height={smallScreen ? 20 : 30}
                sx={{ ...skeletonStyle }}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? 20 : 30}
                height={smallScreen ? 20 : 30}
                sx={{ ...skeletonStyle }}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? 20 : 30}
                height={smallScreen ? 20 : 30}
                sx={{ ...skeletonStyle }}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? 20 : 30}
                height={smallScreen ? 20 : 30}
                sx={{ ...skeletonStyle }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <br />

      {/* rest of fields and suggested cards  */}
      <Box
        sx={{
          padding: smallScreen ? "0px 20px" : "0px 30px",
          display: "flex",
          gap: "30px",
          height: "auto",
          alignItems: "flex-start",
        }}
      >
        {/* fields  */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "30px",
            flexDirection: "column",
          }}
        >
          {/* skills  */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212126",
              padding: "20px 30px",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={skeletonStyle}
            />
            <br />
            <Skeleton
              variant="text"
              width="100%"
              height={1}
              sx={skeletonStyle}
            />
            <br />
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Skeleton
                variant="rounded"
                width={80}
                height={30}
                sx={{ ...skeletonStyle, borderRadius: "30px" }}
              />
              <Skeleton
                variant="rounded"
                width={80}
                height={30}
                sx={{ ...skeletonStyle, borderRadius: "30px" }}
              />
              <Skeleton
                variant="rounded"
                width={80}
                height={30}
                sx={{ ...skeletonStyle, borderRadius: "30px" }}
              />
              <Skeleton
                variant="rounded"
                width={80}
                height={30}
                sx={{ ...skeletonStyle, borderRadius: "30px" }}
              />
            </Box>
          </Box>

          {/* description  */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212126",
              padding: "20px 30px",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={skeletonStyle}
            />
            <br />
            <Skeleton
              variant="text"
              width="100%"
              height={1}
              sx={skeletonStyle}
            />
            <br />
            <Box sx={{}}>
              <Skeleton
                variant="text"
                width="100%"
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width="100%"
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={30}
                sx={skeletonStyle}
              />
            </Box>
          </Box>

          {/* internships  */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212126",
              padding: "20px 30px",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={skeletonStyle}
            />
            <br />
            <Skeleton
              variant="text"
              width="100%"
              height={1}
              sx={skeletonStyle}
            />
            <br />
            <Box sx={{}}>
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
            </Box>
          </Box>

          {/* projects  */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212126",
              padding: "20px 30px",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={skeletonStyle}
            />
            <br />
            <Skeleton
              variant="text"
              width="100%"
              height={1}
              sx={skeletonStyle}
            />
            <br />
            <Box sx={{}}>
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
            </Box>
          </Box>

          {/* PORs  */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212126",
              padding: "20px 30px",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={skeletonStyle}
            />
            <br />
            <Skeleton
              variant="text"
              width="100%"
              height={1}
              sx={skeletonStyle}
            />
            <br />
            <Box sx={{}}>
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="text"
                width={130}
                height={20}
                sx={skeletonStyle}
              />
              <br />
            </Box>
          </Box>
        </Box>

        {/* suggested cards   */}
        <Box sx={{ display: smallScreen && "none" }}>
          <Skeleton variant="text" width={200} height={30} sx={skeletonStyle} />
          <br />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ProileCardSkeleton />
            <ProileCardSkeleton />
            <ProileCardSkeleton />
            <ProileCardSkeleton />
            <ProileCardSkeleton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicViewSkeleton;
