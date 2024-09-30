import React, { useState } from "react";
import Wrapper from "./Wrapper";
import { Box, Typography, useMediaQuery } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import ActionButton from "../Buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import { getcurrentuser } from "../../utils/api";
import { setUserAuthentication } from "../../store";
import LoadingScreen from "../generalComponents/LoadingScreen";
import { useDispatch } from "react-redux";

const LastStep = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      setLoading(true);

      let res = await getcurrentuser();
      if (res && res.status) {
        dispatch(setUserAuthentication(res.data));
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleEnterSkillShodhClick = () => {
    getUserData();
  };
  return (
    <Wrapper>
      <LoadingScreen loading={loading} />
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">
          Thanks for filling the details your profile is ready to be seen
        </Typography>
        <br />

        <Typography sx={{ fontWeight: "400" }} variant="h5">
          Lets enter the world of skills
        </Typography>
        <br />
        <br />
        <Box
          sx={{
            width: smallScreen ? "100%" : "60%",
          }}
        >
          <ActionButton
            handleOnClick={handleEnterSkillShodhClick}
            rightIcon={
              <EastIcon sx={{ color: "#FFF", width: "18px", height: "18px" }} />
            }
            name="Enter SkillShodh"
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default LastStep;
