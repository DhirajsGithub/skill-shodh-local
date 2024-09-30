import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
const skeletonStyle = { bgcolor: "#8b8b8b" };

const MessageReceived = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "flex-end",
        marginBottom: "10px",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      <Skeleton variant="circular" width={35} height={35} sx={skeletonStyle} />

      <Box
        sx={{
          //   maxWidth: smallScreen ? "80%" : "60%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px 10px 10px 0px",
            border: "1px solid var(--Symentic-Gray-20, #343434)",
            padding: "10px",
          }}
        >
          <Skeleton variant="text" width={70} height={15} sx={skeletonStyle} />
          <Skeleton
            variant="text"
            width={smallScreen ? 200 : 300}
            height={18}
            sx={skeletonStyle}
          />
          <Skeleton
            variant="text"
            width={smallScreen ? 150 : 300}
            height={18}
            sx={skeletonStyle}
          />
        </Box>
        <Skeleton variant="text" width={20} height={10} sx={skeletonStyle} />
      </Box>
    </Box>
  );
};

const MessageSent = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "flex-end",
        marginBottom: "10px",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          maxWidth: smallScreen ? "80%" : "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px 10px 0px 10px;",
            padding: "10px",

            border: "1px solid var(--Symentic-Gray-20, #343434)",
          }}
        >
          <Skeleton
            variant="text"
            width={smallScreen ? 200 : 300}
            height={18}
            sx={skeletonStyle}
          />
          <Skeleton
            variant="text"
            width={smallScreen ? 150 : 300}
            height={18}
            sx={skeletonStyle}
          />
        </Box>
        <Skeleton variant="text" width={20} height={10} sx={skeletonStyle} />
      </Box>
    </Box>
  );
};

const ChatsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",

        // width: "100%",
      }}
    >
      {Array.from({ length: 10 }).map((_, index) =>
        index % 2 === 0 ? (
          <MessageReceived key={index} />
        ) : (
          <MessageSent key={index} />
        )
      )}
    </Box>
  );
};

export default ChatsSkeleton;
