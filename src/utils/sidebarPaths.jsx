import { Box } from "@mui/material";
import homeIcon from "../assets/navBar_icons/bxs-home.svg.svg";
import opportunityIcon from "../assets/navBar_icons/bxs-trophy.svg.svg";
import teamIcon from "../assets/navBar_icons/bxs-group.svg.svg";
import settingIcon from "../assets/navBar_icons/bxs-brightness.svg.svg";
import supportIcon from "../assets/navBar_icons/bx-support.svg.svg";
import contactUsIcon from "../assets/navBar_icons/bxs-phone.svg.svg";
import aboutUsIcon from "../assets/navBar_icons/bxs-help-circle.svg.svg";
import referIcon from "../assets/navBar_icons/Refer.svg"

const paths = [
  {
    name: "Home",
    path: "/",
    id: 1,
    icon: () => <Box component="img" src={homeIcon} alt="SkillShodh Home Icon"/>,
    isSecured: false,
    isPublic: true,
    category: "menu",
  },
  {
    name: "Opportunities",
    path: "/opportunities",
    id: 2,
    icon: () => <Box component="img" src={opportunityIcon} alt="SkillShodh Opportunity Icon"/>,
    isSecured: false,
    isPublic: false,
    category: "menu",
  },
  {
    name: "Teams",
    path: "/teams",
    id: 3,
    icon: () => <Box component="img" src={teamIcon} alt="SkillShodh Team Icon"/>,
    isSecured: false,
    isPublic: false,
    category: "menu",
  },
  {
    name: "Refer & Win",
    path: "/refer&win",
    id: 9,
    icon: () => <Box component="img" src={referIcon} alt="SkillShodh Refer & Win Icon"/>,
    isSecured: false,
    isPublic: false,
    category: "menu",
  },
  {
    name: "Settings",
    path: "/settings",
    id: 4,
    icon: () => <Box component="img" src={settingIcon} alt="SkillShodh Settings Icon"/>,
    isSecured: true,
    isPublic: true,
    category: "settings",
  },
  {
    name: "Support",
    path: "/support",
    id: 6,
    icon: () => <Box component="img" src={supportIcon} alt="SkillShodh Support Icon"/>,
    isSecured: true,
    isPublic: false,
    category: "settings",
  },

  {
    name: "Contact Us",
    path: "/contactUs",
    id: 7,
    icon: () => <Box component="img" src={contactUsIcon} alt="SkillShodh ContactUs Icon"/>,
    isSecured: true,
    isPublic: false,
    category: "settings",
  },
  {
    name: "About us",
    path: "/aboutUs",
    id: 8,
    icon: () => <Box component="img" src={aboutUsIcon} alt="SkillShodh AboutUs Icon"/>,
    isSecured: true,
    isPublic: false,
    category: "settings",
  },
];

const categories = [
  { name: "menu", id: 1 },
  { name: "settings", id: 2 },
];

export { paths, categories };
