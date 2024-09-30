import {
  Alert,
  Avatar,
  Box,
  LinearProgress,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import LoadingScreen from "../generalComponents/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import Wrapper from "./Wrapper";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import bannerDefaultImg from "../../assets/banner_default.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import Footer from "./Footer";
import {
  isuseravai,
  nextstep1,
  uploadbannerpic,
  uploadprofilepic,
} from "../../utils/api";
import { setBasicDetails, setSignUpField, updateUser } from "../../store";

const BasicDetails = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  let { basicDetails } = useSelector((state) => state.onboardingSlice);

  const { firstName, lastName } = useSelector((state) => state.signUpSlice);
  const { profileImg, bannerImg, userName, shortBio, longBio } = basicDetails;
  const [profileImgUploading, setProfileImgUploading] = useState(false);
  const [bannerImgUploading, setBannerImgUploading] = useState(false);
  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [userNameTemp, setUserNameTemp] = useState(userName);
  const [shortBioTemp, setShortBioTemp] = useState(shortBio);
  const [tempProfileImg, setTempProfileImg] = useState(profileImg);
  const [tempBannerImg, setTempBannerImg] = useState(bannerImg);
  const [longBioTemp, setLongBioTemp] = useState(longBio);
  const [checkingUserName, setCheckingUserName] = useState(false);
  const [userNameTaken, setUserNameTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChooseBannerImageClicked = () => {
    document.getElementById("choose-banner-img-56702-profile").click();
  };
  const handleChooseProfileImageClicked = () => {
    document.getElementById("choose-profile-img-54369-profile").click();
  };

  const bannerImgChangeHandler = async (file) => {
    try {
      setBannerImgUploading(true);
      let res = await uploadbannerpic(file);

      setBannerImgUploading(false);
      if (res.status === true) {
        setTempBannerImg(res.data);
      }
    } catch (error) {
      setBannerImgUploading(false);
    }
  };
  const handleProfileImgChange = async (file) => {
    try {
      setProfileImgUploading(true);
      let res = await uploadprofilepic(file);

      setProfileImgUploading(false);
      if (res.status === true) {
        setTempProfileImg(res.data);
      }
    } catch (error) {
      setProfileImgUploading(false);
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

  const updateUserDetails = () => {
    dispatch(
      updateUser({
        profile: tempProfileImg,
        banner: tempBannerImg,
        name_first: fName,
        name_last: lName,
        username: userNameTemp,
        sbio: shortBioTemp,
        bio: longBioTemp,
      })
    );
  };
  const updateOnboardingSlice = () => {
    dispatch(
      setBasicDetails({
        profileImg: tempProfileImg,
        bannerImg: tempBannerImg,
        userName: userNameTemp,
        shortBio: shortBioTemp,
        longBio: longBioTemp,
      })
    );
    dispatch(setSignUpField({ field: "firstName", value: fName }));
    dispatch(setSignUpField({ field: "lastName", value: lName }));
  };

  const handleSaveClick = async () => {
    try {
      if (
        userNameTaken ||
        userNameTemp.length === 0 ||
        bannerImgUploading ||
        profileImgUploading
      ) {
        return;
      }
      setLoading(true);
      let res = await nextstep1(
        tempProfileImg,
        tempBannerImg,
        fName,
        lName,
        userNameTemp,
        shortBioTemp,
        longBioTemp
      );
      console.log(res);
      if (res.status) {
        updateUserDetails();
        updateOnboardingSlice();
        setShowSnackbar(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <LoadingScreen loading={loading} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={5000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Basic Details Updated Successfully
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: !smallScreen && "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${
              tempBannerImg ? tempBannerImg : bannerDefaultImg
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            color: "white",
            height: smallScreen ? 100 : 200,
            position: "relative",

            textAlign: "center",
          }}
        />
        <Box
          onClick={handleChooseBannerImageClicked}
          sx={{
            cursor: "pointer",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EditIcon
            sx={{
              width: smallScreen ? "14px" : "24px",
              height: smallScreen ? "14px" : "24px",
              color: "#fff",
            }}
          />
          <Typography variant="body1">Change Banner Image</Typography>
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
              accept="image/*"
              id="choose-banner-img-56702-profile"
              type="file"
              style={{
                display: "none",
                visibility: "hidden",
                width: "0",
                height: "0",
              }}
              onChange={(e) => {
                bannerImgChangeHandler(e.target.files[0]);
              }}
            />
          </Box>
          {bannerImgUploading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: smallScreen ? "70px" : "100px",
            height: smallScreen ? "70px" : "100px",
            position: "relative",
            top: smallScreen ? "-35px" : "-50px",
          }}
        >
          <EditIcon
            onClick={handleChooseProfileImageClicked}
            sx={{
              color: "#fff",
              width: smallScreen ? "20px" : "35px",
              height: smallScreen ? "20px" : "35px",
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 11,
            }}
          />

          <Avatar
            onClick={handleChooseProfileImageClicked}
            src={tempProfileImg ? tempProfileImg : defaultProfileImg}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#27272C",
            }}
          />
          {profileImgUploading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}

          <input
            accept="image/*"
            id="choose-profile-img-54369-profile"
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
          />
        </Box>
      </Box>

      <Wrapper>
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
            onChangeHandler={(text) => setFName(text)}
            value={fName}
            label="First Name*"
            placeholder="ex: Aryan"
          />
          <LoginSignupInput
            onChangeHandler={(text) => setLName(text)}
            value={lName}
            label="Last Name*"
            placeholder="ex: Vishwakarma"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => {
              userNameChange(text);
            }}
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
            onChangeHandler={(text) => setShortBioTemp(text)}
            value={shortBioTemp}
            label="Short Bio*"
            maxLength={70}
            placeholder="Maximum 70 characters"
          />
        </Box> */}
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setLongBioTemp(text)}
            value={longBioTemp}
            label="Bio*"
            rows={4}
            maxLength={300}
            multiline={true}
            placeholder="Maximum 300 characters"
          />
        </Box>
      </Wrapper>
      <Footer handleSaveClick={handleSaveClick} />
    </Box>
  );
};

export default BasicDetails;

let p = {
  _id: "66659bf4becfa501f0549d7c",

  email: "sanikamkadam2101@gmail.com",
  step: 4,
  settings: {
    dm_noti: true,
    teams_noti: true,
    teams_add: true,
  },

  college: "college",
  graduation: "2026",
  school: "school",
  interns: [],
  points: 20,
  por: [],
  projects: [],
  skills: [
    "Express.js",
    "HTML",
    "JavaScript",
    "React.js",
    "TypeScript",
    "Angular",
    "PostgreSQL",
    "Vue.js",
    "MongoDB",
    "Responsive Web Design",
  ],
  skillslevel: [
    {
      name: "Express.js",
      level: 2,
      id: "9985ff7a-9fe3-4f89-9ba6-69cbf673d3ba",
    },
    {
      name: "HTML",
      level: 2,
      id: "e8bb6863-7494-4f0f-9751-e38c17b03b15",
    },
    {
      name: "JavaScript",
      level: 2,
      id: "0d5c8c07-11cb-4904-a052-03c4a8180885",
    },
    {
      name: "React.js",
      level: 2,
      id: "e4941b0d-384d-48a2-84d5-a5120fee7b6e",
    },
    {
      name: "TypeScript",
      level: 2,
      id: "fd569c3b-2281-469b-9c36-7bc6c4c9ad80",
    },
    {
      name: "Angular",
      level: 2,
      id: "5b3b5c55-8a85-4cf4-a358-a83dc08c4b98",
    },
    {
      name: "PostgreSQL",
      level: 2,
      id: "5341a71b-959e-4ff4-91ad-d3fa05011daa",
    },
    {
      name: "Vue.js",
      level: 2,
      id: "4c4ec3ea-0197-4a80-95dc-ee7baad6a0aa",
    },
    {
      name: "MongoDB",
      level: 2,
      id: "24d46206-b269-4fd0-bf48-b6b63ee21eea",
    },
    {
      name: "Responsive Web Design",
      level: 2,
      id: "360b0650-ba06-4324-b4f0-8c0ef9b6b780",
    },
  ],
  git: "",
  insta: "",
  linkedin: "",
  portfolio: "",
  resume: "",
  online: false,
  myteam: [
    "RK3HXqkTfmp",
    "LRXxbMM3zKY",
    "OkxqF6kPOPZ",
    "w1YuJrkN0F5",
    "5z2uUdyJwDB",
    "azCyQ1Kc0uK",
    "WcdDnUmVGuV",
    "NBhNLHs43uL",
    "WcdDnUmVGuV",
    "jBLDnFVth5I",
    "8lez8lOTExW",
    "2tJiKFLrePd",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "WcdDnUmVGuV",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "lq3Z7FCEiTZ",
    "SLoOCdUtiSC",
    "sdE6qktfagQ",
    "h3HZPWboO4E",
    "HUv5AuAT0Ve",
    "g4dclUlEduK",
    "ZzNvmYSmUdM",
    "6J3p4vfmFHJ",
    "z7Usj5uZxDW",
    "QoGwAZe1jqc",
    "5hbICoxiCNG",
    "TXL73ym4ldf",
    "o3ACNhk74Hg",
    "4nnZaanwR04",
    "dK7vzRP1AO8",
    "RuIx1FHgM0r",
  ],
  team_noti: [
    "RK3HXqkTfmp",
    "LRXxbMM3zKY",
    "OkxqF6kPOPZ",
    "w1YuJrkN0F5",
    "5z2uUdyJwDB",
    "azCyQ1Kc0uK",
    "WcdDnUmVGuV",
    "NBhNLHs43uL",
    "WcdDnUmVGuV",
    "jBLDnFVth5I",
    "8lez8lOTExW",
    "2tJiKFLrePd",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "WcdDnUmVGuV",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "lq3Z7FCEiTZ",
    "SLoOCdUtiSC",
    "sdE6qktfagQ",
    "h3HZPWboO4E",
    "HUv5AuAT0Ve",
    "g4dclUlEduK",
    "ZzNvmYSmUdM",
    "6J3p4vfmFHJ",
    "z7Usj5uZxDW",
    "QoGwAZe1jqc",
    "5hbICoxiCNG",
    "TXL73ym4ldf",
    "o3ACNhk74Hg",
    "4nnZaanwR04",
    "dK7vzRP1AO8",
    "RuIx1FHgM0r",
  ],
  team_temp_noti: [
    "RK3HXqkTfmp",
    "LRXxbMM3zKY",
    "OkxqF6kPOPZ",
    "w1YuJrkN0F5",
    "5z2uUdyJwDB",
    "azCyQ1Kc0uK",
    "WcdDnUmVGuV",
    "NBhNLHs43uL",
    "WcdDnUmVGuV",
    "jBLDnFVth5I",
    "8lez8lOTExW",
    "2tJiKFLrePd",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "WcdDnUmVGuV",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "YXWGBNeIZgO",
    "lq3Z7FCEiTZ",
    "SLoOCdUtiSC",
    "sdE6qktfagQ",
    "h3HZPWboO4E",
    "HUv5AuAT0Ve",
    "g4dclUlEduK",
    "ZzNvmYSmUdM",
    "6J3p4vfmFHJ",
    "z7Usj5uZxDW",
    "QoGwAZe1jqc",
    "5hbICoxiCNG",
    "TXL73ym4ldf",
    "o3ACNhk74Hg",
    "4nnZaanwR04",
    "dK7vzRP1AO8",
    "RuIx1FHgM0r",
  ],
  addedteam: [],
};
