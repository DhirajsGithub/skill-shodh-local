import React, { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "./Wrapper";
import LoadingScreen from "../generalComponents/LoadingScreen";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import Footer from "./Footer";
import { addcollege, getcolleges, nextstep2 } from "../../utils/api";
import { setEducationDetails, updateUser } from "../../store";

const CustomPaper = (props) => (
  <Paper
    sx={{
      backgroundColor: "#18181D",
      color: "#8B8B8B",
      fontSize: "16px",
      "& .MuiAutocomplete-input": {
        color: "#8B8B8B !important",
      },
    }}
    elevation={8}
    {...props}
  />
);

const EducationDetils = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { educationDetails } = useSelector((state) => state.onboardingSlice);
  const { school, college, yearOfGraduation } = educationDetails;
  const [tempSchool, setTempSchool] = useState(school);
  const [tempCollege, setTempCollege] = useState(college);
  const [suggestedClgs, setSuggestedClgs] = useState([]);
  const [selectedFromList, setSelectedFromList] = useState(false);
  const [tempYearOfGraduation, setTempYearOfGraduation] =
    useState(yearOfGraduation);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");

  const updateUserDetail = () => {
    dispatch(
      updateUser({
        school: tempSchool,
        college: tempCollege,
        graduation: tempYearOfGraduation,
      })
    );
  };

  const updateOnboardingSlice = () => {
    dispatch(
      setEducationDetails({
        school: tempSchool,
        college: tempCollege,
        yearOfGraduation: tempYearOfGraduation,
      })
    );
  };

  const handleSaveClick = async () => {
    if (!tempCollege || !tempYearOfGraduation) return;
    try {
      setLoading(true);
      let res = await nextstep2(tempSchool, tempCollege, tempYearOfGraduation);
      setLoading(false);
      if (res && res.status === true) {
        if (!selectedFromList) {
          await addcollege(tempCollege);
        }
        updateUserDetail();
        updateOnboardingSlice();
        setShowSnackbar(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCollegeChange = (event, value) => {
    setSelectedFromList(true);
    setTempCollege(value);
  };

  const fetchClgs = async () => {
    try {
      let res = await getcolleges(collegeSearch, []);
      if (res.status) {
        let temp = res.data.map((clg) => clg.name);
        setSuggestedClgs(temp);
      }
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    }
  };

  useEffect(() => {
    fetchClgs();
  }, [collegeSearch]);

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Wrapper>
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
            Education Details Updated Successfully
          </Alert>
        </Snackbar>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setTempSchool(text)}
            value={tempSchool}
            label="School"
            placeholder="School Name"
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box>
            <Typography variant="body1">College*</Typography>
          </Box>
          <div>
            <Autocomplete
              freeSolo
              PaperComponent={CustomPaper}
              disablePortal
              id="combo-box-demo"
              options={suggestedClgs}
              value={tempCollege}
              onChange={handleCollegeChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={tempCollege}
                  onChange={(event) => {
                    setCollegeSearch(event.target.value);
                    setTempCollege(event.target.value);
                    setSelectedFromList(false);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      color: "#8B8B8B",
                      fontSize: smallScreen ? "16px" : "20px",
                      fontWeight: 400,
                      padding: 0,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                      color: "#8B8B8B !important",
                    },
                    "& fieldset": { border: "none" },
                    border: `1.5px solid rgba(136, 136, 136, 0.60)`,
                    borderRadius: "10px",
                    padding: smallScreen ? "5px 15px" : "5px 20px",
                  }}
                  placeholder="College Name"
                />
              )}
            />
            {suggestedClgs.length === 0 && tempCollege && (
              <div
                style={{
                  color: "red",
                  marginTop: "8px",
                  fontSize: smallScreen ? "14px" : "16px",
                }}
              >
                College not found* (You can Enter Your College Full Name
                Manualy.)
              </div>
            )}
          </div>
        </Box>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) =>
              Number(text) >= 0 &&
              Number(text) < 9999 &&
              setTempYearOfGraduation(text)
            }
            value={tempYearOfGraduation}
            label="Year of Graduation*"
            placeholder="YYYY"
            type="number"
            min={1900}
            max={9999}
            maxLength={4}
          />
        </Box>
      </Wrapper>
      <Footer handleSaveClick={handleSaveClick} />
    </Box>
  );
};

export default EducationDetils;
