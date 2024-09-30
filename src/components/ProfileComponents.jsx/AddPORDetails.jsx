import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActionButton from "../Buttons/ActionButton";
import React, { useEffect, useState } from "react";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import DatePicker from "../generalComponents/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setSkillDetails } from "../../store";

const AddPORDetails = ({ handleUpdatePors }) => {
  const dispatch = useDispatch();
  const { skillDetails } = useSelector((state) => state.onboardingSlice);
  const initialPorDetails = skillDetails.porDetails || [];
  const [porArray, setPorArray] = useState(initialPorDetails);
  const smallScreen = useMediaQuery("(max-width:768px)");

  const isValidPOR = (por) => {
    const requiredFields = ["startDate", "role", "description"];
    if (!por.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => por[field]);
  };

  const updatePOR = (index, changes) => {
    // serialzing dates to iso string
    if (Object.keys(changes)?.includes("startDate")) {
      changes.startDate = new Date(changes.startDate).toISOString();
    }
    if (Object.keys(changes)?.includes("endDate")) {
      changes.endDate = new Date(changes.endDate).toISOString();
    }
    const newPorArray = porArray.map((por, i) => {
      if (i === index) {
        return { ...por, ...changes };
      }
      return por;
    });
    setPorArray(newPorArray);
  };

  const handleAddPorClick = () => {
    const lastPor = porArray[porArray.length - 1];

    if (
      lastPor?.startDate === "" ||
      lastPor?.role === "" ||
      lastPor?.description === "" ||
      (!lastPor?.currentlyWorking && lastPor?.endDate === "")
    ) {
      return; // If the last POR has empty required fields, do nothing
    }

    setPorArray([
      ...porArray,
      {
        startDate: "",
        endDate: "",
        role: "",
        description: "",
        isExpanded: true,
        currentlyWorking: false,
      },
    ]);
  };

  useEffect(() => {
    // Filter valid POR and dispatch them to Redux
    // const validPorArray = porArray.filter(isValidPOR);
    handleUpdatePors(porArray);
  }, [porArray, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "start",
        gap: "20px",
        width: "100%",
        // marginTop: internshipDetailsExpand && "10px",
      }}
    >
      {porArray.map((por, index) => {
        return (
          <Box sx={{ width: "100%" }} key={index}>
            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  {index + 1}. Position of Resposiblity
                </Typography>
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  const isExpanded = !por.isExpanded;
                  updatePOR(index, { isExpanded });
                }}
              >
                {por.isExpanded ? (
                  <ExpandLessIcon sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                )}
              </Box>
            </Box>

            {por.isExpanded && (
              <Box
                sx={{
                  marginTop: "15px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) => {
                      updatePOR(index, { role: text });
                    }}
                    value={por?.role}
                    placeholder="Your Role"
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: smallScreen ? "20px" : "30px",
                      flexWrap: smallScreen && "wrap",
                      alignSelf: "stretch",
                    }}
                  >
                    <DatePicker
                      date={por.startDate}
                      onChangeDate={(date) => {
                        const newDates = {};
                        if (
                          new Date(date?.toISOString()) > new Date(por?.endDate)
                        ) {
                          newDates.endDate = date;
                        }
                        newDates.startDate = date;
                        updatePOR(index, newDates);
                      }}
                      placeholder="Start Date"
                    />
                    <DatePicker
                      disabled={por?.currentlyWorking}
                      date={por?.currentlyWorking ? new Date() : por?.endDate}
                      onChangeDate={(date) => {
                        const newDates = {};
                        if (
                          new Date(date?.toISOString()) < new Date(por?.endDate)
                        ) {
                          newDates.startDate = date;
                        }
                        newDates.endDate = date;
                        updatePOR(index, newDates);
                      }}
                      placeholder="End Date"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      checked={por?.currentlyWorking}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            updatePOR(index, {
                              currentlyWorking: e.target.checked,
                            })
                          }
                          sx={{
                            color: "#888",
                            "&.Mui-checked": {
                              color: "#5773FF",
                            },
                          }}
                        />
                      }
                      label="Currently Working Here"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) => {
                      updatePOR(index, { description: text });
                    }}
                    value={por?.description}
                    multiline={true}
                    rows={4}
                    placeholder="Description"
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "16px",
                    }}
                  >
                    <Typography
                      onClick={() =>
                        setPorArray(porArray.filter((_, i) => i !== index))
                      }
                      sx={{
                        color: "#FF4242",
                        cursor: "pointer",
                        ":hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Delete
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <ActionButton handleOnClick={handleAddPorClick} name="Add POR" />
      </Box>
    </Box>
  );
};

export default AddPORDetails;
