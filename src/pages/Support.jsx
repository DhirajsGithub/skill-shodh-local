import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoginSignupInput from "../components/LoginSignupComponents/LoginSignupInput";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import { support, uploadsupportfiles } from "../utils/support";
import { useSelector } from "react-redux";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const Support = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const [query, setQuery] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });

  const handleAddFileClick = () => {
    document.getElementById("choose-upload-file-56702-support").click();
  };

  const handleFileChange = async (file) => {
    const type = file.type.split("/")[1];
    setFileName(file.name);
    if (!type) {
      alert("file has not extension");
    }
    setUploadingFile(true);
    let res = await uploadsupportfiles(file, type);
    if (res.status && res.data) {
      setFileUrl(res.data);
    }
    setUploadingFile(false);
  };
  const handleSendClick = async () => {
    // if (!fileUrl) {
    //   setSnackBarInfo({ type: "info", msg: "please upload a file" });
    //   setShowSnackbar(true);
    //   return;
    // }
    if (!query) {
      setSnackBarInfo({ type: "info", msg: "please give a valid query" });
      setShowSnackbar(true);
      return;
    }
    if (user?.email) {
      let res = await support(query, user?.email, fileUrl);
      if (res.status) {
        setSnackBarInfo({
          type: "success",
          msg: "Query submitted successfully",
        });
        setShowSnackbar(true);
      }
    } else {
      alert("user not exist please signin");
    }
    setFileName("");
    setFile("");
    setFileUrl("");
    setQuery("");
  };
  return (
    <Box
      sx={{ width: "100%", padding: smallScreen ? "30px 20px" : "30px 50px" }}
    >
      <SEO
title={SEOContent.Support.title}
description={SEOContent.Support.description}
keywords={SEOContent.Support.keywords} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackBarInfo.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfo.msg}
        </Alert>
      </Snackbar>
      <Typography variant="h3">Support</Typography>
      <Box
        sx={{
          padding: smallScreen ? "16px 20px" : "30px",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: smallScreen ? "20px" : "30px",
          borderRadius: "10px",
          background: "#212126",
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{ fontSize: smallScreen ? "16px !important" : "18px" }}
          variant="body1"
        >
          For any questions or assistance you may have, don't hesitate to email
          our friendly support team. We're here to help you get the most out of
          your experience with our web app.
        </Typography>
        <LoginSignupInput
          multiline={true}
          rows={8}
          value={query}
          onChangeHandler={(text) => setQuery(text)}
          placeholder={"Please write your query"}
        />
        {uploadingFile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Box>
              <LinearProgress sx={{ width: "100px", marginBottom: "8px" }} />
              <Typography variant="body2">File uplading</Typography>
            </Box>
            <Button
              onClick={() => {
                setFile("");
                setUploadingFile(false);
                setFileUrl("");
              }}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <Box sx={{ flexGrow: smallScreen && 1 }}>
            <PrimaryButton
              handleOnClick={handleSendClick}
              rightIcon={<EastIcon sx={{ color: "#fff" }} />}
            >
              Send
            </PrimaryButton>
          </Box>
          <Box sx={{ flexGrow: smallScreen && 1 }}>
            <input
              accept="*"
              id="choose-upload-file-56702-support"
              type="file"
              style={{
                display: "none",
                visibility: "hidden",
                width: "0",
                height: "0",
              }}
              value={file}
              onChange={(e) => {
                handleFileChange(e.target.files[0]);
                setFile(e.target.value);
              }}
            />
            <Box>
              <Button
                onClick={handleAddFileClick}
                sx={{
                  display: "flex",
                  padding: "10px 30px",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  // gap: "10px",
                  fontSize: smallScreen ? "14px" : "16px",
                  fontWeight: 400,
                  color: "#fff",
                  borderRadius: "50px",
                  border: "1px solid #FFF",
                  textTransform: "none",
                  marginBottom: "8px",
                }}
                startIcon={<AddIcon sx={{ color: "#fff" }} />}
              >
                Add File
              </Button>
              {fileUrl && <Typography variant="body2">{fileName}</Typography>}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
