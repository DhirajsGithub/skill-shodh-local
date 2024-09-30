import { Box, Button, Drawer, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  setChatWith,
  setJoinTeamData,
  setModalInfo,
  setTeamClickedData,
  setTeamsModalInfo,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "../Buttons/PrimaryButton";
import blueDot from "../../assets/blueDot.svg";
import EastIcon from "@mui/icons-material/East";
import {
  clearnotifications,
  getnotifications,
  updatenotifications,
} from "../../utils/notificationapi";
import moment from "moment";
import NotificationSkeleton from "./NotificationSkeleton";
import { getteamdetails } from "../../utils/teamsapi";
import { useNavigate } from "react-router-dom";
import { socket } from "./ChatsDrawer";

const NotificationCard = ({ notification, handleNotificationClick, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleViewNotificationClick = async (type) => {
    handleNotificationClick(notification._id);
    if (type === "personal_chats") {
      const reqData = {
        data: {
          first_name: notification?.senderdata?.name_first,
          last_name: notification?.senderdata?.name_last,
          profile: notification?.senderdata?.profile,
        },
        to: notification?.data,
        user: user?.email,
      };
      dispatch(setChatWith({ chatOpen: true, person: reqData }));
      dispatch(setModalInfo("chatScreenDrawer"));
    } else if (type === "team_chats") {
      const data = await getteamdetails(notification?.data);
      if (data?.data) {
        dispatch(setModalInfo(""));
        dispatch(setTeamClickedData({ data: data.data, open: true }));
      }

      navigate("/teams");
    } else if (type === "team_add") {
      const data = await getteamdetails(notification?.data);
      if (data?.data) {
        dispatch(setModalInfo(""));
        dispatch(setJoinTeamData(data.data));
        dispatch(setTeamsModalInfo("teamNameAndCode"));
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        padding: "20px",
        backgroundColor: !notification.read && "#28282D",
        borderBottom: "1px solid rgba(139, 139, 139, 0.2)",
        position: "relative",
      }}
    >
      <Box
        onClick={() => handleNotificationClick(notification._id)}
        sx={{
          gap: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        {!notification.read && (
          <Box
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            component="img"
            src={blueDot}
          />
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="subtitle1">{notification?.title}</Typography>

          <Typography sx={{ fontSize: "10px" }} variant="body2">
            .
          </Typography>

          <Typography sx={{ fontSize: "14px" }} variant="subtitle2">
            {moment(notification?.time)?.fromNow()}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px !important" }} variant="body1">
            {notification?.message}
          </Typography>
        </Box>
      </Box>
      <Button
        sx={{
          "& .css-1td94c4-MuiButtonBase-root-MuiButton-root": {
            padding: "0px !important",
            alignItems: "flex-start",
          },
        }}
        onClick={() => handleViewNotificationClick(notification.type)}
        variant="text"
      >
        <Typography variant="body2">{notification.button_text}</Typography>
      </Button>
    </Box>
  );
};

export default function NotificatonDrawer() {
  const { isAuthenticated, user } = useSelector((state) => state.authSlice);
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const [notifications, setNotifications] = useState([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(setModalInfo(""));
  };
  const fetchNotifications = async () => {
    try {
      setFetchingNotifications(true);
      let res = await getnotifications(user.email);
      setFetchingNotifications(false);

      if (res.status) {
        setNotifications(res.data);
      }
    } catch (error) {
      setFetchingNotifications(false);
    }
  };

  useEffect(() => {
    socket.on("notireceive", (payload) => {
      setNotifications((notifications) => [{...payload}, ...notifications]);
    });
  }, []);

  const clearAllNotifications = async () => {
    try {
      let res = await clearnotifications(user.email);
      if (res.status) {
        setNotifications([]);
      }
    } catch (error) {}
  };

  const handleNotificationClick = async (id) => {
    const res = await updatenotifications(id);
    if (res.status) {
      setNotifications((prev) => {
        return prev.map((notification) => {
          if (notification._id === id) {
            notification.read = true;
          }
          return notification;
        });
      });
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [user]);

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
      open={modalInfo === "notificationDrawer"}
      onClose={handleOnClose}
    >
      <Box
        sx={{
          width: smallScreen ? "100vw" : "370px",
          height: "100%",
          // minHeight: "500px",
          overflow: "scroll",
          backgroundColor: "#212126",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
            display: "flex",
            justifyContent: "start",
            padding: "16px 20px",
          }}
        >
          <Typography variant="h4">Notifications</Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderTop: "1px solid rgba(139, 139, 139, 0.2)",
              width: "100%",
            }}
          >
            {fetchingNotifications &&
              Array.from(Array(5).keys()).map((item, index) => {
                return <NotificationSkeleton key={index} />;
              })}
            {notifications?.map((notification, index) => {
              return (
                <NotificationCard
                  user={user}
                  handleNotificationClick={handleNotificationClick}
                  key={notification._id}
                  notification={notification}
                />
              );
            })}
          </Box>
        </Box>

        {notifications?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <Typography variant="h6">No New Notifications</Typography>
          </Box>
        )}

        {notifications?.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "end", margin: "20px" }}>
            <Typography
              onClick={clearAllNotifications}
              variant="h6"
              sx={{
                color: "#5773FF",
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Clear All
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
