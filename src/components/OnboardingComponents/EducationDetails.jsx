import React, { useEffect, useImperativeHandle, useState } from "react";
import Wrapper from "./Wrapper";
import {
  Autocomplete,
  Box,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import { useDispatch, useSelector } from "react-redux";
import { isValidateString } from "../../utils/validations";
import { handleNextButtonClick, setOnboardingFields } from "../../store";
import { addcollege, getcolleges, nextstep2 } from "../../utils/api";
import LoadingScreen from "../generalComponents/LoadingScreen";

const CustomPaper = (props) => {
  return (
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
};

const EducationDetails = React.forwardRef((props, ref) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { educationDetails } = useSelector((state) => state.onboardingSlice);
  const { school, college, yearOfGraduation } = educationDetails;
  const [schoolError, setSchoolError] = useState({});
  const [collegeError, setCollegeError] = useState({});
  const [yearOfGraduationError, setyearOfGraduationError] = useState({});
  const [suggestedClgs, setSuggestedClgs] = useState([]);
  const [selectedFromList, setSelectedFromList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");

  const addStep2Data = async () => {
    try {
      setLoading(true);
      let res = await nextstep2(school, college, yearOfGraduation);
      setLoading(false);
      if (res && res.status === true) {
        if (!selectedFromList) {
          let res = await addcollege(college);
          console.log(res);
        }
        dispatch(handleNextButtonClick());
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleNextClick = () => {
    // const schoolError = isValidateString(school, 2);
    const collegeError = isValidateString(college, 3);
    const yearOfGraduationError = isValidateString(yearOfGraduation, 1, 9999);
    setSchoolError(schoolError);
    setCollegeError(collegeError);
    setyearOfGraduationError(yearOfGraduationError);
    const isValid = !collegeError && !yearOfGraduationError;
    if (isValid) {
      addStep2Data();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      handleNextClick,
    };
  });

  const handleCollegeChange = (event, value) => {
    setCollegeSearch(value);

    setSelectedFromList(true);
    dispatch(
      setOnboardingFields({
        field: "educationDetails.college",
        value: value,
      })
    );
  };

  const fetchClgs = async () => {
    let res = await getcolleges(collegeSearch, []);

    if (res.status) {
      let temp = res.data.map((clg) => clg.name);
      setSuggestedClgs(temp);
      console.log(temp);
    }
  };
  useEffect(() => {
    fetchClgs();
  }, [collegeSearch]);

  return (
    <Wrapper>
      <LoadingScreen loading={loading} />
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "educationDetails.school",
                value: text,
              })
            )
          }
          error={schoolError}
          onFocus={() => setSchoolError({})}
          value={school}
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
        <Autocomplete
          freeSolo
          PaperComponent={CustomPaper}
          disablePortal
          id="combo-box-demo"
          options={suggestedClgs}
          value={college}
          style={{ color: "#fff" }}
          onChange={handleCollegeChange}
          renderInput={(params) => (
            <TextField
              value={college}
              onChange={(event) => {
                setCollegeSearch(event.target.value);
                dispatch(
                  setOnboardingFields({
                    field: "educationDetails.college",
                    value: event.target.value,
                  })
                );
                setSelectedFromList(false);
              }}
              {...params}
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
                border: `1.5px solid ${
                  collegeError?.isError
                    ? "#FF4242"
                    : "rgba(136, 136, 136, 0.60)"
                }`,
                borderRadius: "10px",
                padding: smallScreen ? "5px 15px" : "5px 20px",
              }}
              placeholder="College Name"
            />
          )}
        />
        {collegeError?.isError && (
          <Typography
            sx={{ color: "#FF4242", marginTop: "4px", marginLeft: "15px" }}
            variant="body2"
          >
            {collegeError?.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) => {
            Number(text) >= 0 &&
              Number(text) < 9999 &&
              dispatch(
                setOnboardingFields({
                  field: "educationDetails.yearOfGraduation",
                  value: text,
                })
              );
          }}
          error={yearOfGraduationError}
          onFocus={() => setyearOfGraduationError({})}
          value={yearOfGraduation}
          label="Year of Graduation*"
          placeholder="YYYY"
          type="number"
          min={0}
          max={9999}
          maxLength={4}
        />
      </Box>
    </Wrapper>
  );
});

export default EducationDetails;
