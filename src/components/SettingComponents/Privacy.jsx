import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import googleSvg from "../../assets/Google.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import githubSvg from "../../assets/githubSvg.svg";
import mailSvg from "../../assets/mailSvg.svg";

import { setChangePasswordInfo } from "../../store";
import { getproviders } from "../../utils/settingsapi";
import SkeletonScreens from "./SkeletonScreens";
import CommonMobileLayout from "./CommonMobileLayout";
import CommonDesktopLayout from "./CommonDesktopLayout";

const DesktopView = ({ providerDetails }) => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  return (
    <CommonDesktopLayout name="Privacy" subname="Account Information">
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0px",
            borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
          }}
        >
          <Typography sx={{ fontSize: "18px" }} variant="h5">
            Email Address
          </Typography>
          <Box>
            <Typography sx={{ fontSize: "18px" }} variant="h5">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "16px 0px",
            borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
          }}
        >
          <Typography sx={{ fontSize: "18px" }} variant="h5">
            Logged In With
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {providerDetails.includes("google") && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box
                  sx={{ color: "#fff", width: "24px", height: "24px" }}
                  component="img"
                  src={googleSvg}
                />
                <Typography sx={{ fontSize: "18px" }} variant="h5">
                  Google
                </Typography>
              </Box>
            )}
            {providerDetails.includes("github") && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box
                  sx={{ color: "#fff", width: "24px", height: "24px" }}
                  component="img"
                  src={githubSvg}
                />
                <Typography sx={{ fontSize: "18px" }} variant="h5">
                  GitHub
                </Typography>
              </Box>
            )}
            {providerDetails.includes("email") && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box
                  sx={{ color: "#fff", width: "24px", height: "24px" }}
                  component="img"
                  src={mailSvg}
                />
                <Typography sx={{ fontSize: "18px" }} variant="h5">
                  Email
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {providerDetails.includes("email") && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0px",
              borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
            }}
          >
            <Typography sx={{ fontSize: "18px" }} variant="h5">
              Password
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
              </Box>
              <Typography
                onClick={() =>
                  dispatch(setChangePasswordInfo({ open: true, data: null }))
                }
                sx={{
                  color: "#5773FF",
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                change password
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </CommonDesktopLayout>
  );
};

const MobileContentRow = ({
  label,
  value,
  img,
  providers,
  providerDetails,
}) => {
  const dispatch = useDispatch();
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography variant="subtitle1">{label}</Typography>
        {label === "Auth Provider" &&
          providers &&
          providers.map((provider) => {
            return (
              <Box
                key={provider.id}
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Box
                  sx={{ width: "20px", height: "20px" }}
                  component="img"
                  src={provider.img}
                />
                <Typography variant="h5">{provider.name}</Typography>
              </Box>
            );
          })}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {img && <Box component="img" src={img} />}
          <Typography variant="h5">{value}</Typography>

          {label === "Password" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
                <FiberManualRecordIcon
                  sx={{ width: "6px", height: "6px", color: "#fff" }}
                />
              </Box>
              <Typography
                onClick={() =>
                  dispatch(setChangePasswordInfo({ open: true, data: null }))
                }
                sx={{
                  color: "#5773FF",
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                change password
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

const MobileView = ({ handleBackClick, providerDetails }) => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const providers = [
    { name: "Google", img: googleSvg, id: 1 },
    { name: "GitHub", img: githubSvg, id: 2 },
    { name: "Email", img: mailSvg, id: 3 },
  ];
  const filterProviders = providers.filter((provider) => {
    return providerDetails.includes(provider.name.toLowerCase());
  });
  return (
    <CommonMobileLayout
      name="Privacy"
      handleBackClick={handleBackClick}
      subname="Account Information"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <MobileContentRow label="Email Address" value={user?.email} />
        <MobileContentRow
          label="Auth Provider"
          value=""
          providers={filterProviders}
        />

        {providerDetails?.includes("email") && (
          <MobileContentRow label="Password" value="" />
        )}
      </Box>
    </CommonMobileLayout>
  );
};

const Privacy = ({ handleBackClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [providerDetails, setProviderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProviderDetails = async () => {
    try {
      setLoading(true);
      const providers = await getproviders();
      setLoading(false);
      if (providers.status) {
        setProviderDetails(providers.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderDetails();
  }, []);

  if (loading) {
    return <SkeletonScreens />;
  } else {
    return (
      <Box>
        {smallScreen ? (
          <MobileView
            providerDetails={providerDetails}
            handleBackClick={handleBackClick}
          />
        ) : (
          <DesktopView providerDetails={providerDetails} />
        )}
      </Box>
    );
  }
};

export default Privacy;
