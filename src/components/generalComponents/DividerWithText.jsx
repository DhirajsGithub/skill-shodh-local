import React from "react";
import { Grid, Divider, Typography } from "@mui/material";

const DividerWithText = ({
  children,
  color,
  height,
  borderBottomWidth,
  ...props
}) => (
  <Grid container alignItems="center" spacing={1} {...props}>
    <Grid item xs>
      <Divider
        sx={{
          borderColor: color,
          height,
          borderBottomWidth,
        }}
      />
    </Grid>
    <Grid item>
      <Typography variant="subtitle2">{children}</Typography>
    </Grid>
    <Grid item xs>
      <Divider
        sx={{
          borderColor: color,
          height,
          borderBottomWidth,
        }}
      />
    </Grid>
  </Grid>
);

export default DividerWithText;
