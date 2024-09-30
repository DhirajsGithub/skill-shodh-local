import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  LinearProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoodIcon from "@mui/icons-material/Mood";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseIcon from "@mui/icons-material/Close";

const ChatFooter = ({
  handleEmojiButtonClick,
  text,
  handleSendButtonClick,
  handleTextChange,
  selectedFileInfo,
  fileUploading,
  file,
  handleCloseIconClick,
  handleFileChange,
  handleAddToResourcesChange,
  addToResouces,
}) => {
  const [localFile, setLocalFile] = useState("");
  const smallScreen = useMediaQuery("(max-width:768px)");
  const handleAttachFileClick = () => {
    document.getElementById("choose-group-chat-file-56702").click();
  };

  return (
    <>
      {(file || fileUploading) && (
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            // backgroundColor: "#ccc",
            maxWidth: "80%",

            right: "1%",
            // transform: "translateX(-50%)",
            width: "auto",
            border: "1px solid var(--Symentic-Gray-20, #343434)",
            borderRadius: "10px 10px 0px 10px;",
            background: "#fff",
            padding: "8px",
            maxHeight: "130px",
            overflowY: "scroll",
            zIndex: 2,
          }}
        >
          {fileUploading && <LinearProgress />}
          <FormControlLabel
            sx={{ color: "#888" }}
            control={
              <Checkbox
                checked={addToResouces}
                onChange={(event) => {
                  handleAddToResourcesChange(event.target.checked);
                }}
                sx={{
                  color: "#888",
                  "&.Mui-checked": {
                    color: "#5773FF",
                  },
                  "& .css-1sb0jzw-MuiFormControlLabel-root .MuiFormControlLabel-label":
                    {
                      color: "#000",
                    },
                }}
              />
            }
            label={
              <Typography sx={{ color: "#000" }}>Add to Resources</Typography>
            }
          />

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginBottom: "5px",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <CloseIcon
              onClick={() => {
                setLocalFile("");
                handleCloseIconClick();
              }}
              sx={{
                color: "#000",
                // width: "24px",
                // height: "24px",
                cursor: "pointer",
              }}
            />

            <Typography
              sx={{ color: "#000", maxWidth: "90%", wordWrap: "break-word" }}
            >
              {selectedFileInfo?.filename}
            </Typography>
            <Typography sx={{ color: "#000", minWidth: "10%" }}>
              {(selectedFileInfo?.size / 1000000)?.toFixed(2)} MB
            </Typography>
          </Box>
          <Divider />
          <Typography
            sx={{ color: "#000", wordWrap: "break-word" }}
            variant="body1"
          >
            {selectedFileInfo.associatedText}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          padding: "16px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(136, 136, 136, 0.20)",
          bottom: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "flex-end",
            gap: "14px",
          }}
        >
          <input
            accept="*"
            id="choose-group-chat-file-56702"
            type="file"
            style={{
              display: "none",
              visibility: "hidden",
              width: "0",
              height: "0",
            }}
            value={localFile}
            onChange={(e) => {
              setLocalFile(e.target.value);
              handleFileChange(e.target.files[0]);
            }}
          />
          {(file || fileUploading) && (
            <CloseIcon
              onClick={() => {
                setLocalFile("");
                handleCloseIconClick();
              }}
              sx={{
                color: "#888",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            />
          )}
          {!file && !fileUploading && (
            <AttachmentIcon
              onClick={handleAttachFileClick}
              sx={{
                color: "#888",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            />
          )}

          <TextField
            onChange={(e) => !fileUploading && handleTextChange(e.target.value)}
            value={text}
            multiline
            maxRows={3}
            inputProps={{
              style: {
                color: "#888",
                fontSize: smallScreen ? "16px" : "18px",
                fontWeight: 400,
                padding: 0,
              },
            }}
            sx={{
              "& fieldset": { border: "none" },

              width: "100%",

              "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px !important",
              },
              "& .css-8pxvwv-MuiInputBase-root-MuiOutlinedInput-root": {
                padding: "0px !important",
              },
            }}
            placeholder="Write a message...."
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <MoodIcon
            onClick={handleEmojiButtonClick}
            sx={{
              color: "#888",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />
          {/* <KeyboardVoiceOutlinedIcon
            sx={{
              color: "#888",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          /> */}
          <SendOutlinedIcon
            onClick={() => {
              handleSendButtonClick();
              setLocalFile("");
            }}
            sx={{
              color: "#5773FF",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatFooter;
