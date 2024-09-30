import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingScreen from "./components/generalComponents/LoadingScreen";
import { getcurrentuser } from "./utils/api";
import {
  setBasicDetails,
  setEducationDetails,
  setSignUpField,
  setSkillDetails,
  setSnackBarInfo,
  setSocialDetails,
  setUserAuthentication,
} from "./store";
import { Alert, Box, Snackbar } from "@mui/material";
import NotificatonDrawer from "./components/Modals/NotificatonDrawer";
import DashboardFilterModal from "./components/Modals/DashboardFilterModal";
import ChatsDrawer from "./components/Modals/ChatsDrawer";
import ErrorModal from "./components/Modals/ErrorModal";
import SuccessModal from "./components/Modals/SuccessModal";
import ForgetPasswordModal from "./components/Modals/ForgetPasswordModal";
import OnboardingWarningModal from "./components/Modals/OnboardingWarningModal";

const RoutesWrapper = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.authSlice);
  const { snackBarInfoData } = useSelector((state) => state.generalSlice);

  const getUserData = async () => {
    console.log("getting user data");
    try {
      setLoading(true);
      let res = await getcurrentuser();
      if (res && res.data && res.status === true) {
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

  useEffect(() => {
    if (user) {
      dispatch(
        setBasicDetails({
          profileImg: user.profile || "",
          bannerImg: user.banner || "",
          userName: user.username || "",
          shortBio: user.sbio || "",
          longBio: user.bio || "",
        })
      );
      dispatch(setSignUpField({ field: "email", value: user.email || "" }));
      dispatch(
        setSignUpField({ field: "firstName", value: user.name_first || "" })
      );
      dispatch(
        setSignUpField({ field: "lastName", value: user.name_last || "" })
      );
      dispatch(
        setEducationDetails({
          school: user.school || "",
          college: user.college || "",
          yearOfGraduation: user.graduation || "",
        })
      );

      dispatch(
        setSocialDetails({
          resume: user.resume || "",
          linkedIn: user.linkedin || "",
          github: user.git || "",
          instgram: user.insta || "",
          portfolio: user.portfolio || "",
        })
      );

      dispatch(
        setSkillDetails({ field: "skills", value: user.skillslevel || [] })
      );
      dispatch(
        setSkillDetails({
          field: "internshipDetails",
          value: user.interns || [],
        })
      );
      dispatch(
        setSkillDetails({ field: "projectDetails", value: user.projects || [] })
      );
      dispatch(setSkillDetails({ field: "porDetails", value: user.por || [] }));
    }
  }, [user]);
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        // display: "flex",
        width: "100%",
        height: "100vh",

        // overflow: "hidden",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarInfoData?.showSnackBar}
        onClose={() =>
          dispatch(
            setSnackBarInfo({
              showSnackBar: false,
              snackBarInfo: { type: "", msg: "" },
            })
          )
        }
        autoHideDuration={3000}
      >
        <Alert
          onClose={() =>
            dispatch(
              setSnackBarInfo({
                showSnackBar: false,
                snackBarInfo: { type: "", msg: "" },
              })
            )
          }
          severity={snackBarInfoData?.snackBarInfo?.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfoData?.snackBarInfo?.msg}
        </Alert>
      </Snackbar>
      <NotificatonDrawer />
      <DashboardFilterModal />
      <ChatsDrawer />
      <ErrorModal />
      <SuccessModal />
      <ForgetPasswordModal />
      <OnboardingWarningModal />
      <LoadingScreen loading={loading} />
      {!loading && <Outlet />}
    </Box>
  );
};

export default RoutesWrapper;
