import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
// import plusSvg from "../../../assets/Plus.svg";
import plusSvg from "../../assets/Plus.svg";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import Wrapper from "./Wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  handleNextButtonClick,
  setOnboardingFields,
  setSignUpField,
} from "../../store";
import { isValidateFile, isValidateString } from "../../utils/validations.js";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import {
  isuseravai,
  nextstep1,
  uploadbannerpic,
  uploadprofilepic,
} from "../../utils/api.js";
import LoadingScreen from "../generalComponents/LoadingScreen.jsx";
import UploadButton from "../Buttons/UploadButton.jsx";

const BasicDetails = React.forwardRef((props, ref) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  let { basicDetails } = useSelector((state) => state.onboardingSlice);
  const { firstName, lastName } = useSelector((state) => state.signUpSlice);
  const { profileImg, bannerImg, userName, shortBio, longBio } = basicDetails;

  const [firstNameError, setFirstNameError] = useState({});
  const [lastNameError, setLastNameError] = useState({});
  const [userNameError, setUserNameError] = useState({});
  const [shortBioError, setShortBioError] = useState({});
  const [longBioError, setLongBioError] = useState({});
  const [profileImgError, setProfileImgError] = useState({});
  const [profileImgUploading, setprofileImgUploading] = useState(false);
  const [bannerImgError, setBannerImgError] = useState({});
  const [bannerImgUploading, setbannerImgUploading] = useState(false);
  const [userNameTemp, setUserNameTemp] = useState(userName);
  const [userNameTaken, setUserNameTaken] = useState(false);
  const [checkingUserName, setCheckingUserName] = useState(false);
  const [bannerImgFile, setBannerImgFile] = useState("");
  const [loading, setLoading] = useState(false);

  const addStep1Data = async () => {
    try {
      setLoading(true);
      let res = await nextstep1(
        profileImg,
        bannerImg,
        firstName,
        lastName,
        userName,
        "",
        longBio
      );

      setLoading(false);
      if (res && res.status === true) {
        dispatch(handleNextButtonClick());
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleNextClick = () => {
    const firstNameError = isValidateString(firstName, 2, 20);
    const lastNameError = isValidateString(lastName, 2, 20);
    const userNameError = isValidateString(userName, 5, 20);
    //const shortBioError = isValidateString(shortBio, 2, 70);
    const longBioError = isValidateString(longBio, 2, 300);
    const profileImgError = isValidateFile(profileImg);
    const bannerImgError = isValidateFile(bannerImg);
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setUserNameError(userNameError);
    //setShortBioError(shortBioError);
    setLongBioError(longBioError);
    // setProfileImgError(profileImgError);
    // setBannerImgError(bannerImgError);

    const isValid =
      !firstNameError &&
      !lastNameError &&
      !userNameError &&
      //!shortBioError &&
      !longBioError &&
      !profileImgUploading &&
      !bannerImgUploading;

    if (isValid) {
      addStep1Data();
    }
  };
  useImperativeHandle(ref, () => {
    return {
      handleNextClick,
    };
  });

  const handleChooseBannerImageClicked = () => {
    document.getElementById("choose-banner-img-56702").click();
  };
  const handleChooseProfileImageClicked = () => {
    document.getElementById("choose-profile-img-54369").click();
  };

  const handleProfileImgChange = async (file) => {
    setProfileImgError({});
    try {
      setprofileImgUploading(true);
      let res = await uploadprofilepic(file);
      setprofileImgUploading();
      if (res.status === true) {
        dispatch(
          setOnboardingFields({
            field: "basicDetails.profileImg",
            value: res.data,
          })
        );
      }
      setprofileImgUploading();
    } catch (error) {
      setprofileImgUploading();
    }
  };

  const bannerImgChangeHandler = async (file) => {
    setBannerImgError({});
    try {
      setbannerImgUploading(true);
      let res = await uploadbannerpic(file);
      setbannerImgUploading();
      if (res.status === true) {
        dispatch(
          setOnboardingFields({
            field: "basicDetails.bannerImg",
            value: res.data,
          })
        );
      }
      setbannerImgUploading();
    } catch (error) {
      setbannerImgUploading();
    }
  };

  const debounceFunc = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const checkUsernamexists = async (text) => {
    try {
      setCheckingUserName(true);
      let res = await isuseravai(text);
      setCheckingUserName(false);
      if (res.status === false) {
        setUserNameTaken(true);
      }
      if (res.status === true) {
        setUserNameTaken(false);
        dispatch(
          setOnboardingFields({
            field: "basicDetails.userName",
            value: text,
          })
        );
      }
    } catch (error) {
      setCheckingUserName(false);
    }
  };

  const optimizedFn = useCallback(debounceFunc(checkUsernamexists), []);
  const userNameChange = (text) => {
    setUserNameTemp(text);
    optimizedFn(text);
  };

  const deleteProfileBannerImg = () => {
    dispatch(
      setOnboardingFields({
        field: "basicDetails.bannerImg",
        value: "",
      })
    );
    setBannerImgFile("");
  };

  return (
    <Wrapper>
      <LoadingScreen loading={loading} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: smallScreen ? "70px" : "100px",
            height: smallScreen ? "70px" : "100px",
            position: "relative",
          }}
        >
          <Avatar
            onClick={handleChooseProfileImageClicked}
            src={profileImg}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#27272C",
            }}
          />

          <input
            id="choose-profile-img-54369"
            type="file"
            style={{
              display: "none",
              visibility: "hidden",
              width: "0",
              height: "0",
            }}
            onChange={(e) => {
              handleProfileImgChange(e.target.files[0]);
            }}
            onFocus={() => setProfileImgError({})}
          />
          <Box
            onClick={handleChooseProfileImageClicked}
            src={plusSvg}
            component="img"
            sx={{
              position: "absolute",
              bottom: "0%",
              right: "2%",
              cursor: "pointer",
              width: smallScreen ? "25px" : "35px",
              height: smallScreen ? "25px" : "35px",
              zIndex: 11,
            }}
          />
        </Box>

        {profileImgUploading && (
          <Box sx={{ width: "20%", mt: 1 }}>
            <LinearProgress />
          </Box>
        )}
        {profileImgError?.isError && (
          <Typography
            sx={{ color: "#FF4242", marginTop: "4px" }}
            variant="body2"
          >
            {profileImgError?.message}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <input
            id="choose-banner-img-56702"
            type="file"
            style={{
              display: "none",
              visibility: "hidden",
              width: "0",
              height: "0",
            }}
            value={bannerImgFile}
            onChange={(e) => {
              bannerImgChangeHandler(e.target.files[0]);
              setBannerImgFile(e.target.value);
            }}
            onFocus={() => setBannerImgError({})}
          />
          {bannerImg && (
            <Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Typography variant="body1">Profile Banner</Typography>
                <CloseIcon
                  onClick={deleteProfileBannerImg}
                  sx={{ color: "#fff", cursor: "pointer" }}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${bannerImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginTop: "8px",
                  color: "white",
                  height: smallScreen ? 100 : 140,
                  position: "relative",

                  textAlign: "center",
                }}
              />
            </Box>
          )}

          {!bannerImg && (
            <UploadButton
              leftIcon={
                <AddIcon
                  sx={{ width: "25px", height: "25px", color: "#888" }}
                />
              }
              handleOnClick={handleChooseBannerImageClicked}
              name={bannerImg ? "Uploaded" : "Upload banner image"}
            />
          )}
        </Box>
        {bannerImgUploading && (
          <Box sx={{ width: "100%", mt: 1 }}>
            <LinearProgress />
          </Box>
        )}
        {bannerImgError?.isError && (
          <Typography
            sx={{ color: "#FF4242", marginTop: "4px" }}
            variant="body2"
          >
            {bannerImgError?.message}
          </Typography>
        )}
      </Box>

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
            dispatch(
              setSignUpField({
                field: "firstName",
                value: text,
              })
            )
          }
          error={firstNameError}
          onFocus={() => setFirstNameError({})}
          value={firstName}
          label="First Name*"
          placeholder="ex: Aryan"
        />
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setSignUpField({
                field: "lastName",
                value: text,
              })
            )
          }
          error={lastNameError}
          onFocus={() => setLastNameError({})}
          value={lastName}
          label="Last Name*"
          placeholder="ex: Vishwakarma"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) => {
            userNameChange(text);
          }}
          error={userNameError}
          onFocus={() => setUserNameError({})}
          value={userNameTemp}
          label="Username*"
          placeholder="type your username"
        />
        {checkingUserName && (
          <Typography variant="body2">checking username...</Typography>
        )}
        {!checkingUserName && userNameTaken && (
          <Typography
            sx={{ color: "#FF4242", marginTop: "4px", marginLeft: "15px" }}
            variant="body2"
          >
            Username is not available
          </Typography>
        )}
        {!checkingUserName && userNameTemp.length > 0 && !userNameTaken && (
          <Typography
            sx={{ color: "#428D2F", marginTop: "4px", marginLeft: "15px" }}
            variant="body2"
          >
            Username is available
          </Typography>
        )}
      </Box>
      {/* <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "basicDetails.shortBio",
                value: text,
              })
            )
          }
          error={shortBioError}
          onFocus={() => setShortBioError({})}
          value={shortBio}
          label="Short Bio*"
          maxLength={70}
          placeholder="Maximum 70 characters"
        />
      </Box> */}
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "basicDetails.longBio",
                value: text,
              })
            )
          }
          error={longBioError}
          onFocus={() => setLongBioError({})}
          value={longBio}
          label="Bio*"
          rows={4}
          maxLength={300}
          multiline={true}
          placeholder="Maximum 300 characters"
        />
      </Box>
    </Wrapper>
  );
});

export default BasicDetails;
