import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { LinkedIn } from "@mui/icons-material";

const contactUsDetails = [
  // {
  //   field: "Phone Number",
  //   value: "+91 9370241519",
  //   icon: <PhoneIcon sx={{ color: "#fff" }} />,
  //   pref: "tel:",
  // },
  {
    field: "Support Email",
    value: "support@skillshodh.in",
    icon: <MailIcon sx={{ color: "#fff" }} />,
    pref: "mailto:",
  },
  {
    field: "LinkedIn Page",
    value: "linkedin.com/company/skillshodh",
    icon: <LinkedIn sx={{ color: "#fff" }} />,
    pref: "https://www.",
  },
  {
    field: "Instagram",
    value: "instagram.com/skillshodh",
    icon: <InstagramIcon sx={{ color: "#fff" }} />,
    pref: "https://",
  },

  // {
  //   field: "Twitter",
  //   value: "twitter.com/skillshodh",
  //   icon: <XIcon sx={{ color: "#fff" }} />,
  //   pref: "https://",
  // },
];

export default contactUsDetails;
