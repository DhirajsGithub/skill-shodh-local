import React, { useEffect, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { getteamresouces } from "../../utils/teamsapi";
import DateLabel from "../generalComponents/DateLabel";
import moment from "moment";
import { groupedChatsHelper } from "../../Helpers/GroupedChats";
import {
  audioExtensions,
  documentExtensions,
  imageExtensions,
  videoExtensions,
} from "../../Helpers/FileAndMediaExtensions";
import MediaPlayer from "../generalComponents/MediaPlayer";

const ResourceDetails = ({ resource }) => {
  const extension = resource?.extension;
  let uploadedWhat = "Unknown File Type";
  if (imageExtensions?.includes(extension)) {
    uploadedWhat = "Uploaded an Image";
  } else if (videoExtensions?.includes(extension)) {
    uploadedWhat = "Uploaded a Video";
  } else if (audioExtensions?.includes(extension)) {
    uploadedWhat = "Uploaded an Audio";
  } else if (documentExtensions?.includes(extension)) {
    uploadedWhat = "Uploaded a Document";
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        alignItems: "flex-end",
        width: "100%",
        gap: "10px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <Typography variant="body2">{resource?.name}</Typography>
          <FiberManualRecordIcon
            sx={{ width: "4px", height: "4px", color: "#fff" }}
          />
          <Typography variant="subtitle2">
            {" "}
            {moment(resource?.time).format("hh:mm A")}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", marginBottom: "5px" }}>
            <Box>
              <Typography sx={{ wordBreak: "break-all" }} variant="body2">
                {uploadedWhat}
              </Typography>
              {!documentExtensions?.includes(extension) && (
                <Typography sx={{ wordBreak: "break-all" }} variant="subtitle2">
                  {resource?.filename}
                </Typography>
              )}
            </Box>
            <Box>
              <a
                target="_blank"
                download
                style={{ textDecoration: "none", color: "inherit" }}
                href={resource?.doclink}
              >
                {" "}
                <FileDownloadIcon sx={{ color: "#fff", cursor: "pointer" }} />
              </a>
            </Box>
          </Box>
          <MediaPlayer
            doclink={resource?.doclink}
            extension={resource?.extension}
            height={"100px"}
            width={"100%"}
            filename={resource?.filename}
            size={resource?.size}
            compFor="resources"
          />
        </Box>
      </Box>
    </Box>
  );
};

const SidePanel = ({ handleSidePanelClose, team }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState(true);
  const [teamResources, setTeamResources] = useState([]);
  const fetchTeamResources = async () => {
    let res = await getteamresouces(team?.code);
    console.log(res);
    if (res.status) {
      setTeamResources(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTeamResources();
  }, [team]);

  const groupedResources = groupedChatsHelper(teamResources);
  return (
    <Box
      sx={{
        minWidth: smallScreen ? "100%" : "250px",
        borderLeft: "1px solid rgba(136, 136, 136, 0.20)",
        height: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        backgroundColor: "#212126",
      }}
    >
      <Box
        sx={{
          padding: "10px 20px",
          borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          height: "66px", // to match chatscreen height
          position: "sticky",
          top: "0%",
          backgroundColor: "#212126",
          zIndex: 99,
        }}
      >
        <Typography variant="h5">Resources</Typography>
        <CloseIcon
          onClick={handleSidePanelClose}
          sx={{ color: "#fff", cursor: "pointer" }}
        />
      </Box>
      {!loading ? (
        Object.keys(groupedResources).map((date, index) => (
          <Box key={index}>
            <DateLabel borderBottomWidth="0px" label={date} />

            {groupedResources[date].map((resource, index) => (
              <ResourceDetails key={index} resource={resource} />
            ))}
          </Box>
        ))
      ) : (
        <Typography sx={{ color: "#fff", padding: "10px 20px" }}>
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default SidePanel;
