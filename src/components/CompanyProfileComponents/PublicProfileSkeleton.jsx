import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
import { skeletonStyle } from "../../styles/styles.js";
import OpportunityCardSkeleton from "../opportunities/OpportunityCardSkeleton";

const PublicProfileSkeleton = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* Banner */}
        <Box sx={{ padding: smallScreen ? "0px" : "40px 30px 0px 30px" }}>
          <Box
            sx={{
              width: "100%",
              padding: smallScreen ? "20px" : "30px",
              background: "#212126",
              borderRadius: !smallScreen && "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Skeleton
                variant="circular"
                width={smallScreen ? "60px" : "120px"}
                height={smallScreen ? "60px" : "120px"}
                sx={skeletonStyle}
              />
              <Box>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: smallScreen ? "2rem" : "3rem",
                    ...skeletonStyle,
                    width: smallScreen ? "150px" : "300px",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: smallScreen ? "1rem" : "2rem",
                    ...skeletonStyle,
                    width: smallScreen ? "100px" : "200px",
                  }}
                />
              </Box>
            </Box>
            <br />
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Skeleton
                variant="rounded"
                width={smallScreen ? "20px" : "30px"}
                height={smallScreen ? "20px" : "30px"}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? "20px" : "30px"}
                height={smallScreen ? "20px" : "30px"}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? "20px" : "30px"}
                height={smallScreen ? "20px" : "30px"}
                sx={skeletonStyle}
              />
              <Skeleton
                variant="rounded"
                width={smallScreen ? "20px" : "30px"}
                height={smallScreen ? "20px" : "30px"}
                sx={skeletonStyle}
              />
            </Box>
          </Box>
        </Box>

        {/* rest field layout and opportunity cards  */}
        <Box
          sx={{
            width: "100%",
            padding: smallScreen ? "20px 15px" : "40px 30px",
            display: "flex",
            flexDirection: "column",
            gap: smallScreen ? "18px" : "25px",
          }}
        >
          {/* field layout 1 */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#212126",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "20px",
                borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "40%",
                }}
              />
            </Box>
            <Box sx={{ width: "100%", padding: "20px 30px" }}>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "90%",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "60%",
                }}
              />
            </Box>
          </Box>
          {/* field layout 2 */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#212126",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "20px",
                borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "40%",
                }}
              />
            </Box>
            <Box sx={{ width: "100%", padding: "20px 30px" }}>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "90%",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "60%",
                }}
              />
            </Box>
          </Box>
          {/* field layout 3 */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#212126",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "20px",
                borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "40%",
                }}
              />
            </Box>
            <Box sx={{ width: "100%", padding: "20px 30px" }}>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "90%",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  ...skeletonStyle,
                  width: "60%",
                }}
              />
            </Box>
          </Box>

          {/* opporunities card  */}
          <OpportunityCardSkeleton />
          <OpportunityCardSkeleton />
        </Box>
      </Box>
    </Box>
  );
};

export default PublicProfileSkeleton;
