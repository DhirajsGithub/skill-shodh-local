import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { loadrecom } from "../../utils/recommendationapi";

const CardList = ({ profilesData }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const ref = useRef();
  const [data, setData] = useState(profilesData?.data || []);
  const [dataLength, setDataLength] = useState(data.length);
  const [loading, setLoading] = useState(false);

  const loadMoreProfile = async () => {
    try {
      setLoading(true);
      if (profilesData?.loadmore) {
        let res = await loadrecom(profilesData?.name, data);

        if (res?.status === true && res?.message === true) {
          setData((prevData) => [...prevData, ...res?.data]);
          setDataLength(dataLength + res?.data.length);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // sroll horizontally
    if (ref.current) {
      ref.current.scrollLeft += smallScreen ? 200 : 400;
    }
  }, [data, loading]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0 10px",
          alignItems: "center",
        }}
      >
        <Chip
          sx={{
            backgroundColor: "#20394E",
            color: "#5AB3FF",
            padding: "8px 16px",
          }}
          label={
            profilesData?.name?.length > 30
              ? profilesData.name.slice(0, 30) + "..."
              : profilesData?.name
          }
        />

        <Typography
          onClick={loadMoreProfile}
          variant="h6"
          sx={{
            color: "#5773FF",
            cursor: "pointer",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          See all
        </Typography>
      </Box>
      <Box
        ref={ref}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          overflowX: "scroll",
          marginTop: "30px",
        }}
      >
        {data.map((item) => (
          <ProfileCard key={item._id} cardData={item} />
        ))}
      </Box>
    </Box>
  );
};

export default CardList;
