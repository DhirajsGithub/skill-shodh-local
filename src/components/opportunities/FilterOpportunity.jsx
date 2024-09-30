import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalInfo } from "../../store";

const FilterOpportunity = ({ tab }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  return (
    <Box
      sx={{
        width: "100%",
        padding: smallScreen ? "15px 20px" : "20px 30px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        display: "flex",
      }}
    >
      <Box
        onClick={() => dispatch(setModalInfo("filterOpportunitiesModal"))}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{ fontSize: smallScreen ? "16px" : "20px" }}
          variant="subtitle2"
        >
          Filters
        </Typography>
        <FilterAltOutlinedIcon
          sx={{
            color: "#8B8B8B",
            width: "20px",
            height: "20px",
          }}
        />
      </Box>
    </Box>
    // <Box
    //   sx={{
    //     width: "100%",
    //     padding: smallScreen ? "15px 20px" : "20px 30px",
    //     borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
    //   }}
    // >
    //   <TextField
    //     onChange={(event) => setSearchVal(event.target.value)}
    //     value={searchVal}
    //     autoComplete="off"
    //     placeholder="Search with filters"
    //     inputProps={{
    //       style: {
    //         color: "#888",
    //         fontSize: "16px",
    //         fontWeight: 400,
    //         padding: 0,
    //       },
    //     }}
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           {tab === "newOpportunities" && (
    //             <FilterAltOutlinedIcon
    //               onClick={() =>
    //                 dispatch(setModalInfo("filterOpportunitiesModal"))
    //               }
    //               sx={{
    //                 color: "#8B8B8B",
    //                 width: "20px",
    //                 height: "20px",
    //                 cursor: "pointer",
    //               }}
    //             />
    //           )}
    //         </InputAdornment>
    //       ),
    //     }}
    // sx={{
    //   "& fieldset": { border: "none" },
    //   border: "1px solid rgba(136, 136, 136, 0.20)",
    //   borderRadius: "62px",
    //   padding: smallScreen ? "10px 15px" : "10px 32px",
    //   "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
    //     paddingLeft: "0px",
    //   },
    //   width: smallScreen ? "100%" : "500px",
    //   background: "#26262F",
    // }}
    //   />
    // </Box>
  );
};

export default FilterOpportunity;
