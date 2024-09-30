import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";

import Onboarding from "./pages/guest/Onboarding";
import Signup from "./pages/guest/Signup";
import Login from "./pages/guest/Login";
import Home from "./pages/Home";
import Support from "./pages/Support";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Teams from "./pages/protected/Teams";
import Settings from "./pages/protected/Settings";
import Opportunities from "./pages/protected/Opportunities";
import Profile from "./pages/protected/Profile";
import ProtectedRoutes from "./pages/protected/ProtectedRoutes";
import HomeSearchView from "./pages/HomeSearchView";

import React from "react";
import RoutesWrapper from "./RoutesWrapper";
import PublicProfile from "./pages/PublicProfile";
import CompanyMeet from "./pages/protected/CompanyMeet";
import CompanyProfile from "./pages/protected/CompanyProfile";
import ReferAndEarn from "./pages/protected/ReferAndEarn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutesWrapper />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/search",
            element: <HomeSearchView />,
          },

          {
            path: "/contactUs",
            element: <ContactUs />,
          },

          {
            path: "/aboutUs",
            element: <AboutUs />,
          },
          {
            path: "/profile/:userName",
            element: <PublicProfile />,
          },
          {
            path: "/Opportunities",
            element: <Opportunities />,
          },

          {
            path: "/",
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/teams",
                element: <Teams />,
              },

              {
                path: "/settings",
                element: <Settings />,
              },

              {
                path: "/support",
                element: <Support />,
              },
              {
                path: "/meet/:meetId",
                element: <CompanyMeet />,
              },
              {
                path: "/refer&win",
                element: <ReferAndEarn />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/editprofile",
        element: <Profile />,
      },
      {
        path: "/company/:companyId",
        element: <CompanyProfile />,
      },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
