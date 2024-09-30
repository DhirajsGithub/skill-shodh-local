import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../../styles/my-style.scss";
import {
  CallControls,
  PaginatedGridLayout,
  StreamTheme,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useDispatch, useSelector } from "react-redux";
import { get_meetdata } from "../../utils/meet";
import { setModalData, setModalInfo } from "../../store";
import { Box, Typography } from "@mui/material";
const CompanyMeet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meetId } = useParams();
  const [loading, setLoading] = useState(true);
  const [meetLinkExist, setMeetLinkExist] = useState(false);
  console.log("meet id ", meetId);
  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const fetchMeetData = async () => {
      setLoading(true);
      try {
        const value = await get_meetdata(meetId);
        if (value.staus) {
          // meet exists
          setMeetLinkExist(true);
        } else {
          // meet not exist or expired
          dispatch(setModalInfo("errorModal"));
          dispatch(
            setModalData({
              message: "Meeting not exist or expired",
              title: "Error",
            })
          );
          setMeetLinkExist(false);
        }
      } catch (error) {
        console.error("Failed to fetch meeting data", error);
        setMeetLinkExist(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetData();
  }, [meetId, dispatch]);


  if (meetLinkExist) {
    const name = `${user.name_first}_${user.name_last}`;
    const apiKey = import.meta.env.VITE_VCAPI;
    const user_data = {
      id: user.username,
      type: "guest",
      name: name,
      image: user.profile,
    };
    const client = new StreamVideoClient({ apiKey, user: user_data });
    const call = client.call("default", meetId);
    call.join().then(() => {
      //we can set loading false here
    })
    .catch((error) => {
      //we may get error. most probably no
    });;

    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <PaginatedGridLayout groupSize={4} />
            <CallControls
              onLeave={() => {
                navigate("/");
              }}
            />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    );
  }

  return (
    <Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ padding: "10px" }}>
          <Typography>Meeting not exist or expired</Typography>
          <Link to="/">Home </Link>
        </Box>
      )}
    </Box>
  );
};

export default CompanyMeet;
