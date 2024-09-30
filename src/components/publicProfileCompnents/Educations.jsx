import { Box } from "@mui/material";
import React from "react";
import FieldLayout from "./FieldLayout";
import CommonInfo from "./CommonInfo";

const Educations = ({ school, college, graduationyear }) => {
  console.log(college);
  return (
    <FieldLayout name="Education">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        {school?.length > 0 && <CommonInfo field="School" value={school} />}
        <CommonInfo field="Collegeukug" value={college} />
        <CommonInfo field="Year Of Graduation" value={graduationyear} />
      </Box>
    </FieldLayout>
  );
};

export default Educations;
