import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CommonInfo from "./CommonInfo";
import FieldLayout from "./FieldLayout";
import moment from "moment";

const Por = ({ por }) => {
  const duration =
    moment(por.startDate).format("Do MMMM YYYY") +
    " - " +
    moment(por.endDate).format("Do MMMM YYYY");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <CommonInfo field="Role" value={por.role} />
      {por?.currentlyWorking ? (
        <CommonInfo
          field="Duration"
          value={
            moment(por.startDate).format("Do MMMM YYYY") +
            " - Currently Working"
          }
        />
      ) : (
        <CommonInfo field="Duration" value={duration} />
      )}

      <CommonInfo field="Description" value={por.description} />
    </Box>
  );
};

const PositionOfResponsibility = ({ pors }) => {
  return (
    <FieldLayout name="Position of Responsibility" sx={{ width: "100%" }}>
      {pors.length === 0 && (
        <Typography variant="subtitle2">
          No Positions of Responsibilities to show
        </Typography>
      )}
      {pors?.length > 0 &&
        pors?.map((por, index) => (
          <Box sx={{ width: "100%" }} key={index}>
            <Por por={por} />
            <br />
            <Divider color="#888" />
            <br />
          </Box>
        ))}
    </FieldLayout>
  );
};

export default PositionOfResponsibility;
