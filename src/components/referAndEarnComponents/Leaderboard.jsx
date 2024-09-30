import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import rank1 from "../../assets/1st.png";

import rank2 from "../../assets/2nd.png";

import rank3 from "../../assets/3rd.png";

const LeaderboardItem = ({ rank, name, avatar, backgroundColor }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: 2,
        height: "85px",
        backgroundColor,
        // borderRadius: 1,
        // mb: 2,
      }}
    >
      {rank == 1 && (
        <Avatar src={rank1} sx={{ mr: 2, width: "40px", height: "40px" }} />
      )}
      {rank == 2 && (
        <Avatar src={rank2} sx={{ mr: 2, width: "40px", height: "40px" }} />
      )}
      {rank == 3 && (
        <Avatar src={rank3} sx={{ mr: 2, width: "40px", height: "40px" }} />
      )}
      {rank > 3 && (
        <Typography
          variant="h6"
          sx={{
            mr: 2,
            minWidth: 24,
            width: "40px",
            height: "40px",
            fontWeight: "400",
            borderRadius: "39px",
            backgroundColor: "#ffffff",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
          }}
        >
          {rank}
        </Typography>
      )}
      <Avatar src={avatar} sx={{ mr: 2, width: "45px", height: "45px" }} />
      {rank < 4 && (
        <Typography variant="body1" sx={{ color: "black" }}>
          {name}
        </Typography>
      )}
      {rank > 3 && <Typography variant="body1">{name}</Typography>}
    </Box>
  );
};

const Leaderboard = ({ refererData }) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery("(max-width:768px)");
  // const leaderboardData = [
  //   {
  //     name: "Viraj Sharma",
  //     avatar: "/path-to-viraj-avatar.jpg",
  //     color: theme.palette.error.light,
  //   },
  //   {
  //     name: "Raj Shikhawat",
  //     avatar: "/path-to-raj-avatar.jpg",
  //     color: theme.palette.primary.light,
  //   },
  //   {
  //     name: "Samey Raina",
  //     avatar: "/path-to-samey-avatar.jpg",
  //     color: theme.palette.success.light,
  //   },
  //   {
  //     name: "Rajveer Singh",
  //     avatar: "/path-to-rajveer-avatar.jpg",
  //     color: theme.palette.grey[800],
  //   },
  //   {
  //     name: "karan Nayak",
  //     avatar: "/path-to-karan-avatar.jpg",
  //     color: theme.palette.grey[800],
  //   },
  // ];
  const leaderboardData = refererData?.leaderboard?.sort(
    (a, b) => a?.rank - b?.rank
  );

  const getBgColor = (rank) => {
    if (rank === 1) {
      return theme.palette.error.light;
    } else if (rank === 2) {
      return theme.palette.primary.light;
    } else if (rank === 3) {
      return "#C9FF57";
    } else {
      return theme.palette.grey[800];
    }
  };

  return (
    <Box sx={{ width: "100%", margin: "auto" }}>
      <Box
        sx={{
          borderRadius: "15px",
          background: "#212126",
          padding: smallScreen ? "15px" : "25px",
        }}
      >
        <Typography sx={{ mb: smallScreen ? 2 : 3 }} variant="h4">
          Leaderboard
        </Typography>
        <Box
          sx={{
            maxHeight: "500px",
            overflowY: "scroll",
            borderTopLeftRadius: "15px", // Rounded top-left corner
            borderTopRightRadius: "15px", // Rounded top-right corner
            borderBottomLeftRadius: "15px", // Rounded bottom-left corner
            borderBottomRightRadius: "15px", // Rounded bottom-right corner
            // Optional: Add padding inside the box
          }}
        >
          {leaderboardData.map((item, index) => (
            <LeaderboardItem
              key={index}
              rank={index + 1}
              name={item?.name_first + " " + item?.name_last}
              avatar={item?.profile}
              backgroundColor={getBgColor(item?.rank)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Leaderboard;
