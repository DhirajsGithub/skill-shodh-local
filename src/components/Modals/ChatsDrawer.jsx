import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EastIcon from "@mui/icons-material/East";
import SearchIcon from "@mui/icons-material/Search";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import WestIcon from "@mui/icons-material/West";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { setChatWith, setModalData, setModalInfo } from "../../store";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoodIcon from "@mui/icons-material/Mood";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseIcon from "@mui/icons-material/Close";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import {
  chatmessages,
  chatmessagesloadmore,
  chatpersons,
  updatelastread,
  uploadchatfiles,
} from "../../utils/chatsapi";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import PersonChatSkeleton from "./ChatsComponents/PersonChatSkeleton";
import ChatWithSkeleton from "./ChatsComponents/ChatWithSkeleton";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import ReactPlayer from "react-player";
import MediaPlayer from "../generalComponents/MediaPlayer";
import DateLabel from "../generalComponents/DateLabel";
import { groupedChatsHelper } from "../../Helpers/GroupedChats";
import { Link } from "react-router-dom";
import { isUserDeleted } from "../../Helpers/chatsHelper";
import { baseurl, supabase } from "../../utils/api";
import { encrypt } from "../../utils/encrypt";
let socket = await io.connect(baseurl, {
  transports: ["websocket"],
});
socket.on("connect", async (value) => {
  var token = (await supabase.auth.getSession()).data.session?.access_token;
  if (token != null) {
    var data = {
      token: token,
      company: 0,
    };
    socket.emit("init", data);
  }
});

export { socket };

const PersonChat = ({ profileImg, name, lastMessage, person }) => {
  const dispatch = useDispatch();
  const handlePersonClick = () => {
    dispatch(setChatWith({ chatOpen: true, person: person }));
  };
  const isMsgOpen =
    new Date(person?.last_msgtime) > new Date(person?.last_read);

  return (
    <Box
      onClick={() => handlePersonClick()}
      sx={{
        display: "flex",
        padding: "10px 20px",
        alignItems: "flex-start",
        gap: "10px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        background: isMsgOpen ? "#28282D" : "#212126",
        width: "100%",
        cursor: "pointer",
        opacity: isUserDeleted(person?.to) ? 0.5 : 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            sx={{ width: "45px", height: "45px", borderRadius: "50%" }}
            src={profileImg}
          />
          {person?.data?.online && (
            <CircleIcon
              sx={{
                color: "#23AD00",
                width: "10px",
                height: "10px",
                position: "absolute",
                bottom: "10%",
                right: "0%",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "95%" }}>
            <Typography sx={{ wordBreak: "break-all" }} variant="h6">
              {isUserDeleted(person?.to) ? "Deleted User" : name}
            </Typography>
            <Typography
              sx={{ marginTop: "5px", wordBreak: "break-all" }}
              variant="subtitle2"
            >
              {lastMessage?.length > 50
                ? lastMessage?.slice(0, 50) + "..."
                : lastMessage}
            </Typography>
          </Box>
          {isMsgOpen && (
            <Box>
              <FiberManualRecordIcon
                sx={{ color: "#F00", width: "8px", height: "8px" }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const PeopleList = ({ user, peopleSearch }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const filteredPeople = people.filter((person) => {
    return (person?.data?.first_name + person?.data?.last_name)
      ?.trim()
      ?.toLowerCase()
      ?.includes(peopleSearch?.replace(/\s/g, "").toLowerCase());
  });
  const fetchPeople = async () => {
    try {
      setLoading(true);
      let res = await chatpersons(user?.email);
      if (res && res.status === true && res.data) {
        setPeople(res.data);
      } else {
        setModalData({
          title: "Couldn't Fetch People",
          message: res?.message || "Something went wrong",
        });
        setModalInfo("errorModal");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    socket.off("messagereceived")
    socket.on("messagereceived", (payload) => {
      fetchPeople();
    });
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [user]);
  return (
    <Box sx={{ height: smallScreen ? "60%" : "70%", overflow: "scroll" }}>
      {!loading &&
        filteredPeople?.map((person, index) => {
          return (
            <PersonChat
              key={person?._id}
              profileImg={person?.data?.profile}
              name={person?.data?.first_name + " " + person?.data?.last_name}
              lastMessage={person?.last_msgtxt}
              person={person}
            />
          );
        })}
      {!loading && filteredPeople?.length === 0 && (
        <Typography sx={{ padding: "20px", textAlign: "center" }}>
          No user found
        </Typography>
      )}
      {loading &&
        Array.from({ length: 8 }).map((_, index) => (
          <PersonChatSkeleton key={index} />
        ))}
    </Box>
  );
};

const NormalHeader = ({ user }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "15px",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
      }}
    >
      <Avatar
        sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
        src={user?.profile}
      />
      <Typography variant="h5">Messaging</Typography>
    </Box>
  );
};

const ChatHeader = ({ user, handleSettingClick }) => {
  const dispatch = useDispatch();
  const handleBackClick = () => {
    dispatch(setChatWith({ chatOpen: false, person: {} }));
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderTop: "1px solid rgba(139, 139, 139, 0.20)",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        marginTop: "10px",
      }}
    >
      <WestIcon
        onClick={handleBackClick}
        sx={{ color: "#fff", width: "24px", height: "24px", cursor: "pointer" }}
      />
      <Typography variant="subtitle1">Messaging</Typography>
      <Link to="/settings">
        <SettingsIcon
          onClick={handleSettingClick}
          sx={{
            color: "#fff",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      </Link>
    </Box>
  );
};

const MessageReceived = ({ message }) => {
  if (message?.meet && message?.meetid) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          alignItems: "center",
          margin: "5px 0px",
        }}
      >
        <Box
          sx={{
            maxWidth: "95%",

            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <Box sx={{ margin: "5px 0px" }}>
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/meet/" + message?.meetid}
            >
              <Box>
                <Button
                  sx={{
                    display: "flex",
                    width: "100%",
                    padding: "8px 16px",
                    textTransform: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50px",
                    backgroundColor: "#5773FF",
                    color: "#fff",
                    ":hover": {
                      boxShadow: "4px 4px 8px #4b4b55c2",
                      backgroundColor: "#5773FF",
                    },
                  }}
                  startIcon={
                    <VideoCallIcon sx={{ color: "#fff", fontSize: "20px" }} />
                  }
                >
                  Join Meet Now
                </Button>
              </Box>
            </a>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontSize: "10px", color: "#888" }} variant="body2">
            {moment(message?.time).format("hh:mm A")}
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        alignItems: "flex-start",
        margin: "5px 0px",
      }}
    >
      <Box
        sx={{
          maxWidth: "95%",
          border: "1px solid var(--Symentic-Gray-20, #343434)",
          borderRadius: "10px 10px 10px 0px",
          padding: "8px",
        }}
      >
        {message.doclink?.length > 0 && (
          <Box sx={{ margin: "5px 0px" }}>
            <MediaPlayer
              doclink={message.doclink}
              extension={message.extension}
              height={"200px"}
              width="100%"
              filename={message.filename}
              size={message.size}
              sent={false}
              personalChat={true}
              compFor="chats"
            />
          </Box>
        )}

        <Typography sx={{ wordBreak: "break-all" }} variant="body2">
          {message?.msg
            ? message?.msg
            : message.doclink?.length > 0 && message.filename}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ fontSize: "10px", color: "#888" }} variant="body2">
          {moment(message?.time).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};
const MessageSent = ({ message }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        alignItems: "flex-end",
        margin: "5px 0px",
      }}
    >
      <Box
        sx={{
          maxWidth: "95%",
          border: "1px solid var(--Symentic-Gray-20, #343434)",
          backgroundColor: "#fff",
          borderRadius: "10px 10px 0px 10px",
          padding: "8px",
        }}
      >
        {message.doclink?.length > 0 && (
          <Box sx={{ margin: "5px 0px" }}>
            <MediaPlayer
              doclink={message.doclink}
              extension={message.extension}
              height={"200px"}
              width="100%"
              filename={message.filename}
              size={message.size}
              sent={true}
              personalChat={true}
              compFor="chats"
            />
          </Box>
        )}
        <Typography
          sx={{ color: "#000", wordBreak: "break-all", maxWidth: "100%" }}
          variant="body2"
        >
          {message?.msg
            ? message?.msg
            : message.doclink?.length > 0 && message.filename}
        </Typography>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Typography sx={{ fontSize: "10px", color: "#888" }} variant="body2">
          {moment(message?.time).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};

const ChatWith = ({ person, user }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const verySmallScreen = useMediaQuery("(max-width:360px)");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useRef(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const [userIsActive, setUserIsActive] = useState(person?.data?.online);
  const [loadMoreCliked, setLoadMoreClicked] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [loadMoreChatsLength, setLoadMoreChatsLength] = useState(0);
  const [selectedFileInfo, setSelectedFileInfo] = useState({
    doclink: "",
    extension: "",
    filename: "",
    size: "",
    associatedText: "",
  });
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    socket.on("messagereceived", (payload) => {
      if (person.to == payload.user) {
        setChats((chats) => [...chats, { ...payload, _id: uuidv4() }]);
        updatelastread(user.email, person.to);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("userjoined", (payload) => {
      if (person.to == payload) {
        //make user online status true
        setUserIsActive(true);
      }
    });
  }, [socket, person]);

  useEffect(() => {
    socket.on("usergone", (payload) => {
      if (person.to == payload) {
        //make user online status false
        setUserIsActive(false);
      }
    });
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      let res = await chatmessages(user?.email, person?.to);
      if (res && res.status === true && res.data) {
        setChats(res.data?.chats);
      } else {
        setModalData({
          title: "Couldn't Fetch Messages",
          message: res?.message || "Something went wrong",
        });
        setModalInfo("errorModal");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [person, user]);

  useEffect(() => {
    if (ref) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const handleSend = async (associatedText, isFile = false) => {
    setShowEmojiPicker(false);
    setScrollToBottom(true);
    if (file) {
      uploadchatfilesFunc();
      setFile(null);
      setText("");
      return;
    }
    if (!text && !isFile) return;
    var data = await encrypt({
      // this order matters for associatedText to assicoate with any media
      msg: associatedText || text,
      to: person?.to,
      user: user?.email,
      time: new Date(),
      doclink: selectedFileInfo.doclink,
      extension: selectedFileInfo.extension,
      filename: selectedFileInfo.filename,
      size: selectedFileInfo.size,
    });

    socket.emit("messagesend", data);
    setChats([
      ...chats,
      {
        msg: associatedText || text,
        send: true,
        time: new Date(),
        doclink: selectedFileInfo.doclink,
        extension: selectedFileInfo.extension,
        filename: selectedFileInfo.filename,

        _id: uuidv4(),
        size: selectedFileInfo.size,
      },
    ]);
    setText("");
  };

  const handleEmojiClick = (emojiData, event) => {
    setText(text + emojiData.emoji);
  };

  useEffect(() => {
    if (!fileUploading && selectedFileInfo.doclink.length > 0) {
      handleSend(selectedFileInfo.associatedText, true);
      handleCloseIconClick();
    }
  }, [fileUploading, selectedFileInfo, file]);

  useEffect(() => {
    if (file) {
      setSelectedFileInfo((prvData) => {
        return { ...prvData, associatedText: text };
      });
    }
  }, [text, file]);

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

  const handleFileChange = (file) => {
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
    setSelectedFileInfo({
      doclink: "",
      extension: "",
      filename: "",
      size: "",
      associatedText: "",
    });
    setFile(null);
    setText("");
    setFileValue("");
    setFileUploading(false);
  };

  const fetchLoadMorePersonalText = async () => {
    setLoadMoreClicked(true);
    setScrollToBottom(false);
    if (chats.length === 0) return;
    setLoading(true);
    let res = await chatmessagesloadmore(
      user?.email,
      person?.to,
      chats[0]?.time
    );

    setLoading(false);
    if (!res.message) {
      setShowLoadMore(false);
    }
    if (res.status) {
      setLoadMoreChatsLength(res.data.chats.length ?? 0);
      setChats([...res.data.chats, ...chats]);
    }
  };
  const groupedChats = groupedChatsHelper(chats);
  let count = 0;
  return (
    <Box
      sx={{
        width: "100%",
        height: smallScreen ? "88%" : "90%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px 20px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          backgroundColor: "#28282D",
          borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            sx={{ width: "45px", height: "45px", borderRadius: "50%" }}
            src={person?.data?.profile}
          />
          {userIsActive && (
            <CircleIcon
              sx={{
                color: "#23AD00",
                width: "10px",
                height: "10px",
                position: "absolute",
                bottom: "10%",
                right: "0%",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "90%" }}>
            <Typography sx={{ wordBreak: "break-all" }} variant="h6">
              {person?.data?.first_name + " " + person?.data?.last_name}
            </Typography>
            {userIsActive && (
              <Typography sx={{ marginTop: "2px" }} variant="subtitle2">
                Active now
              </Typography>
            )}
          </Box>
          {/* <Box>
            <LocalPhoneIcon
              sx={{
                width: "24px",
                height: "24px",
                color: "#fff",
                cursor: "pointer",
              }}
            />
          </Box> */}
        </Box>
      </Box>
      <Box
        onClick={() => setShowEmojiPicker(false)}
        sx={{
          height: "100",
          flexGrow: 1,
          flexBasis: 0,
          overflow: "scroll",
          scrollbarWidth: "1px",
          scrollbarColor: "#888",
          padding: "10px 15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {chats.length >= 30 && showLoadMore && !loading && (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="text"
              sx={{ color: "#5773FF", textTransform: "none" }}
              onClick={fetchLoadMorePersonalText}
            >
              Load More
            </Button>
          </Box>
        )}
        {loading && <ChatWithSkeleton />}
        {!loading &&
          Object.keys(groupedChats).map((dateLabel, indexOut) => (
            <div key={dateLabel}>
              <DateLabel label={dateLabel} />
              {groupedChats[dateLabel].map((chat, indexInner) => (
                <Box
                  key={chat._id}
                  ref={
                    count++ <= loadMoreChatsLength && !scrollToBottom
                      ? ref
                      : null
                  }
                >
                  {chat.send ? (
                    <MessageSent message={chat} />
                  ) : (
                    <MessageReceived message={chat} />
                  )}
                </Box>
              ))}
            </div>
          ))}

        <Box ref={scrollToBottom ? ref : null} />
      </Box>

      {(file || fileUploading) && (
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            width: "90%",
            right: "1%",
            border: "1px solid var(--Symentic-Gray-20, #343434)",
            borderRadius: "10px 10px 0px 10px;",
            background: "#fff",
            padding: "8px",
            maxHeight: "100px",
            overflowY: "scroll",
            overflowX: "hidden",
            zIndex: 2,
          }}
        >
          {fileUploading && <LinearProgress />}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginBottom: "5px",
              alignItems: "flex-start",
              width: "100%",
              marginTop: "5px",
            }}
          >
            <CloseIcon
              onClick={() => {
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
              sx={{
                color: "#000",

                wordBreak: "break-all",
                maxWidth: "65%",
              }}
            >
              {selectedFileInfo?.filename}
            </Typography>
            <Typography sx={{ color: "#000", minWidth: "20%" }}>
              {(selectedFileInfo?.size / 1000000)?.toFixed(2)} MB
            </Typography>
          </Box>
          <Divider />
          <Typography
            sx={{ color: "#000", wordBreak: "break-all" }}
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
          gap: "15px",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(136, 136, 136, 0.20)",
          bottom: 0,
        }}
      >
        <Box
          onClick={() => setShowEmojiPicker(false)}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          <input
            accept="*"
            id="choose-personal-chat-file-56702"
            type="file"
            style={{
              display: "none",
              visibility: "hidden",
              width: "0",
              height: "0",
            }}
            onChange={(e) => {
              handleFileChange(e.target.files[0]);
            }}
            value={fileValue}
          />
          {(selectedFileInfo.filename || fileUploading) && (
            <CloseIcon
              onClick={handleCloseIconClick}
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
              onClick={() => {
                setShowEmojiPicker(false);

                document
                  .getElementById("choose-personal-chat-file-56702")
                  .click();
              }}
              sx={{
                color: "#888",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            />
          )}
          <TextField
            onChange={(e) =>
              !fileUploading &&
              (file
                ? setSelectedFileInfo({
                    ...selectedFileInfo,
                    associatedText: e.target.value,
                  })
                : setText(e.target.value))
            }
            multiline
            maxRows={3}
            value={file ? selectedFileInfo.associatedText : text}
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
              scrollbarWidth: "1px",
              scrollbarColor: "#888",
              width: "100%",
              "& .css-8pxvwv-MuiInputBase-root-MuiOutlinedInput-root": {
                padding: "0px !important",
              },
              "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px !important",
              },
            }}
            placeholder="Write a message...."
          />
        </Box>
        <Box sx={{ position: "absolute", bottom: "13%", right: "5%" }}>
          {/* default width and height is 350 X 450 */}
          <EmojiPicker
            width={verySmallScreen ? 250 : 320}
            onEmojiClick={handleEmojiClick}
            open={showEmojiPicker}
            background="black"
            theme="dark"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <MoodIcon
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            sx={{
              color: "#888",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />
          {/* <KeyboardVoiceOutlinedIcon
            onClick={() => {
              setShowEmojiPicker(false);
            }}
            sx={{
              color: "#888",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          /> */}
          <SendOutlinedIcon
            type="submit"
            onClick={() => {
              setShowEmojiPicker(false);
              !isUserDeleted(person?.to) && handleSend();
            }}
            sx={{
              color: "#5773FF",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              opacity: isUserDeleted(person?.to) ? 0.5 : 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const ChatsDrawer = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { chatWithData } = useSelector((state) => state.generalSlice);
  const { chatOpen, person } = chatWithData;
  const [peopleSearch, setPeopleSearch] = useState("");
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(setModalInfo(""));
  };

  const handleSettingClick = () => {};

  return (
    <Drawer
      sx={{
        height: "100%",
        position: "sticky",
        display: "flex",
        // width: "238px",
        top: 0,
        bottom: 0,
        zIndex: 999,
      }}
      anchor={"right"}
      open={modalInfo === "chatScreenDrawer"}
      onClose={handleOnClose}
    >
      <Box
        sx={{
          width: smallScreen ? "100vw" : "370px",
          height: "100%",

          overflow: "scroll",
          backgroundColor: "#212126",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "60px",
            justifyContent: "start",
            position: "sticky",
            top: "0%",
            zIndex: 999,
          }}
        >
          <Box
            onClick={handleOnClose}
            sx={{
              margin: "20px",
              cursor: "pointer",
            }}
          >
            <EastIcon sx={{ color: "#fff" }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: chatOpen ? "calc(100% - 70px)" : "100%",
          }}
        >
          {!chatOpen && <NormalHeader user={user} />}
          {chatOpen && (
            <ChatHeader handleSettingClick={handleSettingClick} user={user} />
          )}
          {!chatOpen && (
            <Box sx={{ padding: "12px 30px" }}>
              <TextField
                onChange={(e) => setPeopleSearch(e.target.value)}
                inputProps={{
                  style: {
                    color: "#888",
                    fontSize: smallScreen ? "16px" : "18px",
                    fontWeight: 400,
                    padding: 0,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& fieldset": { border: "none" },
                  border: "1px solid rgba(139, 139, 139, 0.20)",

                  backgroundColor: "#26262F",

                  borderRadius: "40px",
                  padding: "6px 16px",

                  width: "100%",

                  "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                    paddingLeft: "0px !important",
                  },
                }}
                placeholder="Search"
              />
            </Box>
          )}
          {!chatOpen && <PeopleList peopleSearch={peopleSearch} user={user} />}
          {chatOpen && <ChatWith person={person} user={user} />}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatsDrawer;
