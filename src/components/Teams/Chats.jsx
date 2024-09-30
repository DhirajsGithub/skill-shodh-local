import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { getteamchats, getteamchatsloadmore } from "../../utils/teamsapi";
import { useSelector } from "react-redux";
import moment from "moment";
import ChatsSkeleton from "./ChatsSkeleton";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { socket } from "../Modals/ChatsDrawer";
import MediaPlayer from "../generalComponents/MediaPlayer";
import { uploadchatfiles } from "../../utils/chatsapi";
import DateLabel from "../generalComponents/DateLabel";
import { v4 as uuidv4 } from "uuid";
import { groupedChatsHelper } from "../../Helpers/GroupedChats";
import { encrypt } from "../../utils/encrypt";

const MessageReceived = ({ chat }) => {
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
      <Avatar
        src={chat?.sender?.profile}
        sx={{ width: "35px", height: "35px" }}
      />
      <Box
        sx={{
          maxWidth: smallScreen ? "95%" : "70%",
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
          <Typography
            sx={{ color: "red", wordBreak: "break-all", marginBottom: "5px" }}
            variant="h6"
          >
            {chat?.sender?.name_first + " " + chat?.sender?.name_last}
          </Typography>

          {chat.doclink.length > 0 && (
            <Box sx={{ marginBottom: "5px" }}>
              <MediaPlayer
                doclink={chat.doclink}
                extension={chat.extension}
                height={"200px"}
                width={"100%"}
                filename={chat.filename}
                size={chat.size}
                sent={false}
                compFor="chats"
              />
            </Box>
          )}

          <Typography
            sx={{ width: "100%", wordBreak: "break-all" }}
            variant="body1"
          >
            {chat?.txt ? chat?.txt : chat.doclink.length > 0 && chat.filename}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "10px" }} variant="subtitle2">
          {moment(chat?.time).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};
const MessageSent = ({ chat }) => {
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
          maxWidth: smallScreen ? "95%" : "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px 10px 0px 10px;",
            background: "#fff",
            padding: "10px",
            width: "100%",
          }}
        >
          {chat.doclink.length > 0 && (
            <Box sx={{ margin: "5px 0px" }}>
              <MediaPlayer
                doclink={chat.doclink}
                extension={chat.extension}
                height={"200px"}
                width={"100%"}
                filename={chat.filename}
                size={chat.size}
                sent={true}
                compFor="chats"
              />
            </Box>
          )}
          <Typography
            variant="body1"
            sx={{
              color: "#000",
              width: "100%",
              wordBreak: "break-all",
            }}
          >
            {chat?.txt ? chat?.txt : chat.doclink.length > 0 && chat.filename}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: "10px" }} variant="subtitle2">
          {moment(chat?.time).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};

const Chats = ({ team, handleSidePanelIconClick, handleBackClick }) => {
  const scrollBottom = useRef();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const verySmallScreen = useMediaQuery("(max-width:360px)");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const [newText, setNewText] = useState("");
  const [chats, setChats] = useState([]);
  const [loadMoreCliked, setLoadMoreClicked] = useState(false);
  const [addToResouces, setAddToResources] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [loadMoreChatsLength, setLoadMoreChatsLength] = useState(0);
  const [selectedFileInfo, setSelectedFileInfo] = useState({
    doclink: "",
    extension: "",
    filename: "",
    size: "",
    associatedText: "",
  });
  const [file, setFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiData, event) => {
    setNewText(newText + emojiData.emoji);
  };
  const getChats = async () => {
    try {
      setLoading(true);
      let res = await getteamchats(team?.code);
      setLoading(false);
      if (res.status === true) {
        setChats(res.data);
        socket.off("teammsgreceived");
        socket.on("teammsgreceived", (payload) => {
          if (
            team?.code == payload.teamcode &&
            user.email != payload.sendermail
          ) {
            setChats((prvChats) => {
              return [...prvChats, payload];
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleSendButtonClick = async (fileAssociatedText, isFile = false) => {
    setShowEmojiPicker(false);
    setScrollToBottom(true);
    if (file) {
      uploadchatfilesFunc();
      setFile(null);
      setNewText("");
      return;
    }
    if (!newText && !isFile) return;
    var data = await encrypt({
      teamcode: team?.code,
      sender: {
        name_first: user?.name_first,
        name_last: user?.name_last,
        profile: user?.profile,
      },
      sendermail: user?.email,
      time: new Date(),
      // this order matters for fileAssociatedText to assicoate with any media
      txt: fileAssociatedText || newText,
      uploadtor: fileUploading
        ? false
        : addToResouces && selectedFileInfo.doclink.length > 0
        ? true
        : false,
      doclink: selectedFileInfo.doclink,
      extension: selectedFileInfo.extension,
      filename: selectedFileInfo.filename,
      size: selectedFileInfo.size,
    });
    socket.emit("teammsgsend", data);
    setChats((prvChats) => {
      return [
        ...prvChats,
        {
          sender: {
            name_first: user?.name_first,
            name_last: user?.name_last,
            profile: user?.profile,
          },
          sendermail: user?.email,
          time: new Date(),
          txt: fileAssociatedText || newText,
          uploadtor: fileUploading
            ? false
            : addToResouces && selectedFileInfo.doclink.length > 0
            ? true
            : false,
          doclink: selectedFileInfo.doclink,
          extension: selectedFileInfo.extension,
          filename: selectedFileInfo.filename,
          size: selectedFileInfo.size,
          _id: uuidv4(),
        },
      ];
    });
    setNewText("");
  };
  const handleTextChange = (text) => {
    setNewText(text);
  };

  useEffect(() => {
    if (scrollBottom) {
      scrollBottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  useEffect(() => {
    getChats();
    setShowLoadMore(true);
    setLoadMoreChatsLength(0);
    setScrollToBottom(true);
  }, [team]);
  useEffect(() => {
    if (!fileUploading && selectedFileInfo.doclink.length > 0) {
      handleSendButtonClick(selectedFileInfo.associatedText, true);
      handleCloseIconClick();
    }
  }, [fileUploading, selectedFileInfo, file]);

  useEffect(() => {
    if (file) {
      setSelectedFileInfo((prvData) => {
        return { ...prvData, associatedText: newText };
      });
    }
  }, [newText, file]);

  const uploadchatfilesFunc = async () => {
    if (file) {
      setFileUploading(true);
      let res = await uploadchatfiles(file, selectedFileInfo.extension);
      if (res.status) {
        setSelectedFileInfo((prvData) => {
          return { ...prvData, doclink: res.data };
        });
      }
      setFileUploading(false);
    }
  };
  const handleFileChange = async (file) => {
    const type = file.type.split("/")[1];
    if (!type) {
      alert("Unsupported file");
      return;
    }
    setSelectedFileInfo({
      doclink: "",
      extension: type,
      filename: file.name,
      size: file.size,
      associatedText: "",
    });
    setFile(file);
  };
  const handleCloseIconClick = () => {
    setAddToResources(false);
    setSelectedFileInfo({
      doclink: "",
      extension: "",
      filename: "",
      size: "",
      associatedText: "",
    });
    setFile(null);
    setNewText("");
    setFileUploading(false);
  };

  const fetchLoadMoreChats = async () => {
    setLoadMoreClicked(true);
    setScrollToBottom(false);
    if (chats.length === 0) return;
    setLoading(true);
    let res = await getteamchatsloadmore(team?.code, chats[0].time);
    setLoading(false);
    if (!res.message) {
      setShowLoadMore(false);
    }

    if (res.status) {
      setLoadMoreChatsLength(res.data.length ?? 0);
      setChats((prvChats) => {
        return [...res.data, ...prvChats];
      });
    }
  };
  console.log(chats);
  console.log(showLoadMore);
  const groupedChats = groupedChatsHelper(chats);
  const handleAddToResourcesChange = (val) => {
    setAddToResources(val);
  };
  let count = 0;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* chats header  */}
      <ChatHeader
        handleSidePanelIconClick={handleSidePanelIconClick}
        handleBackClick={handleBackClick}
      />

      {/* chats  */}
      <Box
        onClick={() => setShowEmojiPicker(false)}
        sx={{
          padding: "0px 16px 16px 16px",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {chats.length >= 30 && showLoadMore && !loading && (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="text"
              sx={{ color: "#5773FF" }}
              onClick={fetchLoadMoreChats}
            >
              Load More
            </Button>
          </Box>
        )}
        {loading && <ChatsSkeleton />}
        {!loading &&
          Object.keys(groupedChats).map((dateLabel) => (
            <div key={dateLabel}>
              <DateLabel label={dateLabel} />
              {groupedChats[dateLabel].map((chat, index) => (
                <Box
                  ref={
                    count++ <= loadMoreChatsLength && !scrollToBottom
                      ? scrollBottom
                      : null
                  }
                  key={chat._id}
                >
                  {chat.sendermail === user?.email ? (
                    <MessageSent id={chat._id} chat={chat} />
                  ) : (
                    <MessageReceived id={chat._id} chat={chat} />
                  )}
                </Box>
              ))}
            </div>
          ))}
        <Box ref={scrollToBottom ? scrollBottom : null} />
      </Box>

      <Box sx={{ position: "absolute", bottom: "10%", right: "5%" }}>
        {/* default width and height is 350 X 450 */}
        <EmojiPicker
          width={verySmallScreen ? 250 : 350}
          onEmojiClick={handleEmojiClick}
          open={showEmojiPicker}
          background="black"
          theme="dark"
        />
      </Box>

      {/* chat footer  */}
      <ChatFooter
        addToResouces={addToResouces}
        handleAddToResourcesChange={handleAddToResourcesChange}
        handleFileChange={handleFileChange}
        text={newText}
        file={file}
        fileUploading={fileUploading}
        selectedFileInfo={selectedFileInfo}
        handleCloseIconClick={handleCloseIconClick}
        handleTextChange={handleTextChange}
        handleSendButtonClick={handleSendButtonClick}
        handleEmojiButtonClick={handleEmojiButtonClick}
      />
    </Box>
  );
};

export default Chats;
