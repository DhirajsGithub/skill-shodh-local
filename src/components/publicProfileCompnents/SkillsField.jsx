import React from "react";
import FieldLayout from "./FieldLayout";
import skillChipLevelStyle from "../../styles/styles";
import { Box, Chip } from "@mui/material";

const SkillsField = ({ skills }) => {
  return (
    <FieldLayout name="Skills">
      <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {skills?.map((skill, index) => {
          return (
            <Chip
              key={index}
              sx={{
                ...skillChipLevelStyle(skill?.level),
                padding: "8px 16px",
              }}
              label={skill?.name}
            />
          );
        })}
      </Box>
    </FieldLayout>
  );
};

export default SkillsField;
