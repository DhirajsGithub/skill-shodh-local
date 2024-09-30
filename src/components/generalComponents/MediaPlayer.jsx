import { Box, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import {
  audioExtensions,
  documentExtensions,
  imageExtensions,
  videoExtensions,
} from "../../Helpers/FileAndMediaExtensions";

const MediaPlayer = ({
  extension,
  doclink,
  width,
  height,
  sent,
  filename,
  size,
  personalChat,
  compFor,
}) => {
  if (imageExtensions.includes(extension)) {
    return (
      <a
        href={doclink}
        target="_blank"
        download={doclink}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          component="img"
          src={doclink}
          alt="media"
          sx={{
            borderRadius:
              compFor === "chats"
                ? sent
                  ? "10px 10px 0px 10px"
                  : "10px 10px 10px 0px"
                : "5px",
            objectFit: "contain",
            width: width,
            height: height,
            border: "1px solid #ccc",
          }}
        />
      </a>
    );
  }
  if (videoExtensions.includes(extension)) {
    return (
      <ReactPlayer
        controls={true}
        width={width}
        height={height}
        url={doclink}
        style={{
          // border: "1px solid #ccc",
          borderRadius:
            compFor === "chats"
              ? sent
                ? "10px 10px 0px 10px"
                : "10px 10px 10px 0px"
              : "5px",
        }}
      />
    );
  }
  if (audioExtensions.includes(extension)) {
    return (
      <AudioPlayer
        // autoPlay
        style={{
          // minWidth: "300px",
          borderRadius:
            compFor === "chats"
              ? sent
                ? "10px 10px 0px 10px"
                : "10px 10px 10px 0px"
              : "5px",
        }}
        width={width}
        src={doclink}
        // onPlay={e => console.log("onPlay")}
        // other props here
      />
    );
  }
  if (documentExtensions.includes(extension)) {
    return (
      <a
        style={{
          textDecoration: "inherit",
          color: "inherit",
          display: "flex",
        }}
        href={doclink}
        target="_blank"
        download
      >
        <Box sx={{ display: "flex", gap: "4px" }}>
          <FilePresentIcon
            sx={{
              padding: "8px",
              color: "#000",
              backgroundColor: "#CECECE",
              borderRadius: "30px",
              width: "40px",
              height: "40px",
            }}
          />
          <Box sx={{}}>
            <Typography
              sx={{
                color: sent ? "#000" : "#fff",
                wordBreak: "break-all",
                textWrap: "wrap",
                maxWidth: "200px",
              }}
              variant={personalChat ? "body2" : "body1"}
            >
              {filename}
            </Typography>
            <Typography variant="subtitle2">
              {size ? (size / 1000000).toFixed(2) : "0.00"} MB
            </Typography>
          </Box>
        </Box>
      </a>
    );
  }
  return (
    <a
      style={{
        textDecoration: "none",

        color: "blue",
        borderRadius:
          compFor === "chats"
            ? sent
              ? "10px 10px 0px 10px"
              : "10px 10px 10px 0px"
            : "5px",
      }}
      href={doclink}
      target="_blank"
      download
    >
      <Typography>Unsuppoerted</Typography>
    </a>
  );
};

export default MediaPlayer;
