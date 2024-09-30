import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CommonInfo from "./CommonInfo";
import FieldLayout from "./FieldLayout";
import moment from "moment";

const Intern = ({ intern }) => {
  const duration =
    moment(intern.startDate).format("Do MMMM YYYY") +
    " - " +
    moment(intern.endDate).format("Do MMMM YYYY");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <CommonInfo field="Company" value={intern.companyName} />
      {intern?.currentlyWorking ? (
        <CommonInfo
          field="Duration"
          value={
            moment(intern.startDate).format("Do MMMM YYYY") +
            " - Currently Working"
          }
        />
      ) : (
        <CommonInfo field="Duration" value={duration} />
      )}

      <CommonInfo field="Role" value={intern.role} />
      <CommonInfo field="Description" value={intern.description} />
      {intern?.internshipCertificate && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="body1">
            Certificate / Offer Letter
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#5773FF",
              cursor: "pointer",
              width: "fit-content",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            variant="body1"
          >
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              target="_blank"
              href={intern.internshipCertificate}
              download={intern.internshipCertificate}
            >
              Download
            </a>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const Internships = ({ interns }) => {
  return (
    <FieldLayout name="Internship" sx={{ width: "100%" }}>
      {interns?.length === 0 && (
        <Typography variant="subtitle2">No Internships to show</Typography>
      )}
      {interns?.length > 0 &&
        interns.map((intern, index) => (
          <Box sx={{ width: "100%" }} key={index}>
            <Intern intern={intern} />
            <br />
            <Divider color="#888" />
            <br />
          </Box>
        ))}
    </FieldLayout>
  );
};

export default Internships;
