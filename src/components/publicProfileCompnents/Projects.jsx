import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CommonInfo from "./CommonInfo";
import FieldLayout from "./FieldLayout";
import moment from "moment";

const Project = ({ project }) => {
  const duration =
    moment(project.startDate).format("Do MMMM YYYY") +
    " - " +
    moment(project.endDate).format("Do MMMM YYYY");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <CommonInfo field="Project Name" value={project.projectName} />
      {project?.currentlyWorking ? (
        <CommonInfo
          field="Duration"
          value={
            moment(project.startDate).format("Do MMMM YYYY") +
            " - Currently Working"
          }
        />
      ) : (
        <CommonInfo field="Duration" value={duration} />
      )}
      <CommonInfo field="Role" value={project.role} />
      <CommonInfo field="Description" value={project.description} />
      {project?.projectUrl && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="body1">
            Project URL
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
              href={project.projectUrl}
            >
              {project.projectUrl}
            </a>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const Projects = ({ projects }) => {
  return (
    <FieldLayout name="Projects" sx={{ width: "100%" }}>
      {projects?.length === 0 && (
        <Typography variant="subtitle2">No Projects to show</Typography>
      )}
      {projects?.length > 0 &&
        projects.map((project, index) => (
          <Box sx={{ width: "100%" }} key={index}>
            <Project project={project} />
            <br />
            <Divider color="#888" />
            <br />
          </Box>
        ))}
    </FieldLayout>
  );
};

export default Projects;
