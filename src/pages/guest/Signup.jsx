import { useMediaQuery, Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../../components/LoginSignupComponents/Layout";
import Heading from "../../components/LoginSignupComponents/Heading";
import LoginSignupInput from "../../components/LoginSignupComponents/LoginSignupInput";

import LoginSignupFooter from "../../components/LoginSignupComponents/LoginSignupFooter";
import Banner from "../../components/LoginSignupComponents/Banner";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalData,
  setModalInfo,
  setSignUpField,
  setUserAuthentication,
} from "../../store";
import {
  isValidateString,
  isValidtePassword,
  isvalidateEmail,
} from "../../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import {
  getcurrentuser,
  githublogin,
  googlelogin,
  signup,
} from "../../utils/api";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const Signup = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const breakScreen = useMediaQuery("(max-width:900px)");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { firstName, lastName, email, password } = useSelector(
    (state) => state.signUpSlice
  );
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState({});
  const [firstNameError, setFirstNameError] = useState({});
  const [lastNameError, setLastNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [referralCode, setReferralCode] = useState(
    localStorage.getItem("referral_code")
  );

  const getUserData = async () => {
    try {
      setLoading(true);

      let res = await getcurrentuser();
      console.log(res);
      if (res && res.data && res.status) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const userSignUp = async () => {
    try {
      setLoading(true);
      let res = await signup(
        email,
        password,
        firstName,
        lastName,
        referralCode
      );

      if (res && res.status === true) {
        dispatch(
          setModalData({
            inboxButton: "Inbox",
            title: "Success",
            message:
              "Successfully sent email to " +
              email +
              " please open the link in your inbox to verify your email.",
          })
        );
        dispatch(setModalInfo("successModal"));
      } else {
        dispatch(setModalData({ title: "Error", message: res.message }));
        dispatch(setModalInfo("errorModal"));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSignUpButtonClick = () => {
    const firstNameError = isValidateString(firstName, 2, 20);
    const lastNameError = isValidateString(lastName, 2, 20);
    const emailError = isvalidateEmail(email);
    const passwordError = isValidtePassword(password);
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    if (!firstNameError && !lastNameError && !emailError && !passwordError) {
      userSignUp();
    } else {
      return;
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
title={SEOContent.SignUp.title}
description={SEOContent.SignUp.description}
keywords={SEOContent.SignUp.keywords} />
      <Box
        sx={{
          width: smallScreen ? "100%" : "55%",

          //   height: "100%",
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
          heading={"Sign Up"}
          subheading="Welcome to SkillShodh please fill the details"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: smallScreen ? "20px" : "30px",
          }}
        >
          <Box sx={{ marginTop: smallScreen ? "22px" : "40px" }}></Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: smallScreen ? "20px" : "30px",
              flexWrap: smallScreen && "wrap",
              alignSelf: "stretch",
              // marginTop: smallScreen ? "22px" : "70px",
            }}
          >
            <LoginSignupInput
              onChangeHandler={(text) =>
                dispatch(setSignUpField({ field: "firstName", value: text }))
              }
              value={firstName}
              onFocus={() => setFirstNameError({})}
              error={firstNameError}
              placeholder="ex: Aryan"
              label="First Name"
            />

            <LoginSignupInput
              onChangeHandler={(text) =>
                dispatch(setSignUpField({ field: "lastName", value: text }))
              }
              onFocus={() => setLastNameError({})}
              value={lastName}
              error={lastNameError}
              placeholder="ex: Vishwakarma"
              label="Last Name"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: smallScreen && "wrap",
            }}
          >
            <LoginSignupInput
              onFocus={() => {
                setEmailError({});
              }}
              error={emailError}
              onChangeHandler={(text) =>
                dispatch(setSignUpField({ field: "email", value: text }))
              }
              value={email}
              type="email"
              placeholder="ex: example123@gmail.com"
              label="Email*"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: smallScreen && "wrap",
            }}
          >
            <LoginSignupInput
              onFocus={() => {
                setPasswordError({});
              }}
              error={passwordError}
              onChangeHandler={(text) =>
                dispatch(setSignUpField({ field: "password", value: text }))
              }
              value={password}
              type="password"
              placeholder="At least 8 character"
              label="Password*"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: smallScreen && "wrap",
            }}
          >
            <LoginSignupInput
              onChangeHandler={(text) => setReferralCode(text)}
              value={referralCode}
              placeholder="At least 8 character"
              label="Referral Code (optional)"
            />
          </Box>
        </Box>

        <LoginSignupFooter
          handleGoogleButtonClick={handleGoogleButtonClick}
          handleGitHubButtonClick={handleGitHubButtonClick}
          handleNextButtonClick={handleSignUpButtonClick}
          page="signin"
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

export default Signup;
