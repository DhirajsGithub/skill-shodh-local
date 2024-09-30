import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { Link } from "react-router-dom";
import skillChipLevelStyle from "../../styles/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ProfileCard = ({ cardData }) => {
  return (
    <Card
      sx={{
        // maxWidth: headerSearchFocus && "260px",
        minWidth: "260px",
        //maxWidth: "260px",
        width: "260px",
        borderRadius: "10px",
        backgroundColor: "#212126",
        flexGrow: 1,
      }}
    >
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={"/profile/" + cardData?.username}
      >
        <CardActionArea>
          <CardContent
            sx={{
              padding: "20px",
              gap: "12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={cardData?.profile || defaultProfileImg}
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography variant="body1">
                    {cardData?.name_first + " " + cardData?.name_last}
                  </Typography>{" "}
                  {cardData?.online === true && (
                    <FiberManualRecordIcon
                      sx={{ color: "#24FF00", width: "7px", height: "7px" }}
                    />
                  )}
                </Box>

                <Typography variant="subtitle2">
                  @{cardData?.username}
                </Typography>
              </Box>
            </Box>
            <Typography gutterBottom variant="subtitle2" component="div">
              {cardData?.bio?.length > 50
                ? cardData?.bio?.slice(0, 50) + "..."
                : cardData?.bio}
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {cardData?.skillslevel?.slice(0, 4).map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    sx={{
                      ...skillChipLevelStyle(skill?.level),
                      padding: "8px 16px",
                    }}
                    label={skill?.name}
                  />
                );
              })}
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProfileCard;
