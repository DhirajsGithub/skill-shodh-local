import React, { useEffect, useState } from "react";
import Layout from "../../components/LoginSignupComponents/Layout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Heading from "../../components/LoginSignupComponents/Heading";
import LoginSignupInput from "../../components/LoginSignupComponents/LoginSignupInput";
import LoginSignupFooter from "../../components/LoginSignupComponents/LoginSignupFooter";
import Banner from "../../components/LoginSignupComponents/Banner";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginField,
  setModalData,
  setModalInfo,
  setPageNumber,
  setUserAuthentication,
} from "../../store";
import { isValidtePassword, isvalidateEmail } from "../../utils/validations";
import {
  getcurrentuser,
  githublogin,
  googlelogin,
  login,
  supabase,
} from "../../utils/api";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import { socket } from "../../components/Modals/ChatsDrawer";
import SEOContent from "../../SEOContext";
import SEO from "../../SEO";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const smallScreen = useMediaQuery("(max-width:768px)");
  const breakScreen = useMediaQuery("(max-width:900px)");

  const { email, password } = useSelector((state) => state.loginSlice);
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      setLoading(true);

      let res = await getcurrentuser();

      if (res && res.data && res.status === true) {
        navigate("/");

        dispatch(setUserAuthentication(res.data));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const loginFun = async () => {
    try {
      setLoading(true);
      let res = await login(email, password);

      if (res && res.status === true) {
        var token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        var data = {
          token: token,
          company: 0,
        };
        socket.emit("init", data);
        await getUserData();
      } else {
        dispatch(setModalData({ title: "Error", message: res.message }));
        dispatch(setModalInfo("errorModal"));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleLoginButtonClick = () => {
    const emailError = isvalidateEmail(email);
    const passwordError = isValidtePassword(password);
    setEmailError(emailError);
    setPasswordError(passwordError);
    if (!emailError && !passwordError) {
      loginFun();
    } else {
      console.log("Error");
    }
  };

  const handleGoogleButtonClick = async () => {
    try {
      setLoading(true);
      let res = await googlelogin();
      res = await res.json();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleGitHubButtonClick = async () => {
    try {
      setLoading(true);
      let res = await githublogin();
      res = await res.json();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingScreen loading={loading} />;
  }
  return (
    <Layout>
      <SEO
title={SEOContent.Login.title}
description={SEOContent.Login.description}
keywords={SEOContent.Login.keywords} />
      <Box
        sx={{
          width: smallScreen ? "100%" : "55%",

          alignSelf: "stretch",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          to="/"
        >
          <Box
            sx={{
              cursor: "pointer",
              display: "inline-flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ color: "#5773FF", fontSize: "16px" }} />
            <Typography
              sx={{
                display: "inline",
                color: "#5773FF",
              }}
              variant="body1"
            >
              Home
            </Typography>
          </Box>
        </Link>
        <Heading
          heading={"Log In"}
          subheading="Hey, Welcome back Please Sign in"
        />
        <Box sx={{ marginTop: smallScreen ? "22px" : "40px" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: smallScreen ? "20px" : "30px",
          }}
        >
          <Box sx={{}}>
            <LoginSignupInput
              onFocus={() => {
                setEmailError({});
              }}
              error={emailError}
              onChangeHandler={(text) =>
                dispatch(setLoginField({ field: "email", value: text }))
              }
              type="email"
              placeholder="ex: example123@gmail.com"
              label="Email*"
              value={email}
            />
          </Box>
          <Box sx={{}}>
            <LoginSignupInput
              onFocus={() => {
                setPasswordError({});
              }}
              error={passwordError}
              onChangeHandler={(text) =>
                dispatch(setLoginField({ field: "password", value: text }))
              }
              placeholder="At least 8 character"
              label="Password*"
              type="password"
              value={password}
            />
            <br />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                onClick={() => dispatch(setModalInfo("forgetPasswordModal"))}
                sx={{
                  display: "inline",
                  color: "#5773FF",
                  cursor: "pointer",
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                Forgot Password ?
              </Typography>
            </Box>
          </Box>
        </Box>

        <LoginSignupFooter
          handleGoogleButtonClick={handleGoogleButtonClick}
          handleGitHubButtonClick={handleGitHubButtonClick}
          handleNextButtonClick={handleLoginButtonClick}
          page="login"
        />
      </Box>
      {!breakScreen && (
        <Box sx={{ width: "45%", alignSelf: "stretch", minHeight: "650px" }}>
          <Banner />
        </Box>
      )}
    </Layout>
  );
};

export default Login;
