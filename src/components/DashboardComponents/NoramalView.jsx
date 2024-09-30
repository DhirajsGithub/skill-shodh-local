import React, { useState } from "react";
import Banner from "./Banner";
import CardList from "./CardList";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SkeletonCardList from "./SkeletonCardList";

const NoramalView = ({ recommendationData, dataLoading }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [initalDomainLoad, setInitialDomainLoad] = useState(2);
  const data = recommendationData.slice(0, initalDomainLoad);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Banner
          heading="SkillShodh"
          buttonName="Create your team now"
          buttonIcon={
            <AddIcon sx={{ color: "#fff", width: "20px", height: "20px" }} />
          }
          body="Find your skilled partner , create team and start working on project’s. You can do all this thing in one place its SkillShod."
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          padding: smallScreen ? "20px 16px" : "20px 30px",
        }}
      >
        {data?.map((item, index) => (
          <CardList key={index} dataLoading={dataLoading} profilesData={item} />
        ))}
        {dataLoading && <SkeletonCardList />}
        {dataLoading && <SkeletonCardList />}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        {recommendationData.length > initalDomainLoad && (
          <ExpandMoreIcon
            onClick={() => setInitialDomainLoad(recommendationData?.length)}
            sx={{
              color: "#fff",
              height: "40px",
              width: "40px",
              cursor: "pointer",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default NoramalView;
