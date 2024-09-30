import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../Buttons/ActionButton";
import CircleIcon from "@mui/icons-material/Circle";
import upArrow from "../../assets/upArrow.svg";

const LinksBox = ({ linksArray, name }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >
      <Typography sx={{ fontWeight: "400" }} variant="h6">
        {name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        {name === "Socials" &&
          linksArray?.map((link, index) => {
            return (
              <a
                key={index}
                style={{
                  color: "#FFF",
                  textDecoration: "none",
                }}
                target="_blank"
                href={link.path}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#888",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  variant="h6"
                >
                  {link.name}
                </Typography>
              </a>
            );
          })}
        {name !== "Socials" &&
          linksArray?.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.path}
                style={{
                  color: "#FFF",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#888",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  variant="h6"
                >
                  {link.name}
                </Typography>
              </Link>
            );
          })}
      </Box>
    </Box>
  );
};

const Footer = ({ handleScrollToTopClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const linksData = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Opportunities",
      path: "/opportunities",
    },
    {
      name: "Teams",
      path: "/teams",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  const supportLinks = [
    { name: "Support", path: "/support" },
    { name: "Contact Us", path: "/contactUs" },
    { name: "About us", path: "/aboutUs" },
  ];

  const socialsLinks = [
    { name: "Instagram", path: "https://www.instagram.com/skillshodh/" },
    { name: "LinkedIn", path: "http://linkedin.com/company/skillshodh/" },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        bottom: "0%",
        backgroundColor: "#212126",
        padding: smallScreen ? "30px 20px 20px 20px" : "30px 40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: smallScreen && "row-reverse",
          flexWrap: smallScreen && "wrap-reverse",
          gap: smallScreen ? "30px" : "70px",
        }}
      >
        <Box sx={{ width: smallScreen ? "100%" : "40%" }}>
          {!smallScreen && <Typography variant="h3">SkillShodh</Typography>}
          <Box sx={{ marginTop: !smallScreen && "40px" }}>
            <Typography variant="body1">
              Subscribe our News letter to always be up to date with latest
              features and updates
            </Typography>
            <Box sx={{ marginTop: "12px" }}>
              <TextField
                // onChange={(event) =>
                //   dispatch(
                //     setCompleteActionModalFields({
                //       field: "title",
                //       value: event.target.value,
                //     })
                //   )
                // }
                // value={title}
                autoComplete="off"
                placeholder="Enter your email"
                inputProps={{
                  style: {
                    color: "#888",
                    fontSize: "16px",
                    fontWeight: 400,
                    padding: 0,
                  },
                }}
                sx={{
                  "& fieldset": { border: "none" },
                  border: "1px solid rgba(136, 136, 136, 0.20)",
                  borderRadius: "10px",
                  padding: smallScreen ? "10px 15px" : "20px 16px",
                  "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
                    paddingLeft: "0px",
                  },
                  width: "100%",
                  backgroundColor: "#18181D",
                }}
              />
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <ActionButton name="Subscribe" />
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: smallScreen ? "100%" : "60%" }}>
          {smallScreen && (
            <Typography sx={{ marginBottom: "20px" }} variant="h4">
              SkillShodh
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: !smallScreen && "50px",
              justifyContent: "space-between",

              width: "100%",
            }}
          >
            <LinksBox name="Quick Links" linksArray={linksData} />
            <LinksBox name="Support Links" linksArray={supportLinks} />
            <LinksBox name="Socials" linksArray={socialsLinks} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",

          justifyContent: smallScreen ? "center" : "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            marginTop: smallScreen ? "30px" : "40px",
            display: "flex",

            alignItems: "center",
            justifyContent: smallScreen && "center",
          }}
        >
          <Typography sx={{ fontSize: smallScreen && "10px" }} variant="body2">
            Skillshodh {new Date().getFullYear()}
          </Typography>
          <CircleIcon sx={{ color: "#888", widht: "6px", height: "6px" }} />

          <Typography
            sx={{ fontSize: smallScreen && "10px" }}
            variant="subtitle2"
          >
            All right reserved{" "}
            <Link
              style={{ textDecoration: "none", color: "#5773FF" }}
              to="/privacyPolicy"
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
        {!smallScreen && (
          <Box
            onClick={() => handleScrollToTopClick()}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <Typography variant="body2">Back To Top</Typography>
            <Box
              sx={{ width: "20px", height: "20px" }}
              src={upArrow}
              alt="Back To Top"
              component="img"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Footer;
