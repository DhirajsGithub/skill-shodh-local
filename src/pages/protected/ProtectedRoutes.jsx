import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import { Box } from "@mui/material";
import { getcurrentuser } from "../../utils/api";
import { setModalInfo } from "../../store";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const getUserData = async () => {
    try {
      setLoading(true);
      let res = await getcurrentuser();
      if (res.status) {
        setUser(res.data);
      }
      setLoading(false);
      if (!res.status) {
        dispatch(setModalInfo("onboardingWarningModal"));
        return;
      }
      if (res && res.status === true && res.data && res.data.step !== 4) {
        navigate("/onboarding");
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [navigate]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LoadingScreen loading={loading} />
      {user?.step === 4 && <Outlet />}
    </Box>
  );
};

export default ProtectedRoutes;
