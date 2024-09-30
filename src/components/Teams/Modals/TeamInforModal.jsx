import {
  Alert,
  Avatar,
  Box,
  Divider,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "../../Buttons/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HelpIcon from "@mui/icons-material/Help";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import copyToClipboardSvg from "../../../assets/copy_to_clipboard.svg";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import {
  setTeamClickedData,
  setTeamInfodata,
  setTeamsModalInfo,
  updateTeamsList,
} from "../../../store";
import {
  addteammember,
  deleteteam,
  getteammembers,
  leaveteam,
  updateteamdesc,
  updateteamdp,
  updateteamname,
} from "../../../utils/teamsapi";
import CopyToClipboard from "react-copy-to-clipboard";
import { getpublicprofile } from "../../../utils/api";
const skeletonStyle = { bgcolor: "#8b8b8b" };

const RowLayout = ({ children }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        padding: smallScreen ? "10px 0px" : "15px 0px",
        borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
      }}
    >
      {children}
    </Box>
  );
};

const MemberComp = ({ member, isAdmin, isPending }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <RowLayout>
      <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Avatar
          src={member?.profile}
          sx={{
            width: smallScreen ? "35px" : "45px",
            height: smallScreen ? "35px" : "45px",
            opacity: isPending ? "0.5" : "1",
          }}
        />
        <Typography
          sx={{ color: isPending ? "#888" : "auto" }}
          variant={"body1"}
        >
          {member?.name_first + " " + member?.name_last}
        </Typography>
      </Box>
      {isAdmin && (
        <Typography sx={{ color: "#5773FF" }} variant="body2">
          Owner
        </Typography>
      )}
      {isPending && (
        <Typography sx={{ color: "#888" }} variant="subtitle2">
          Request Pending
        </Typography>
      )}
    </RowLayout>
  );
};

const MemberCompSkeleton = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <RowLayout>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: smallScreen ? "35px" : "45px",
            height: smallScreen ? "35px" : "45px",
            ...skeletonStyle,
          }}
        />
        <Skeleton
          width={100}
          variant="text"
          sx={{ fontSize: "1rem", ...skeletonStyle }}
        />
      </Box>
    </RowLayout>
  );
};

const TeamInforModal = () => {
  const dispatch = useDispatch();
  const { teamsModalInfo, teamInfoData } = useSelector(
    (state) => state.teamsSlice
  );
  const { user } = useSelector((state) => state.authSlice);
  const isAdmin = teamInfoData?.owner === user?.email;
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [teamImgUploading, setTeamImgUploading] = useState(false);
  const [teamImg, setTeamImg] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [showAddMemberAndSearch, setShowAddMemberAndSearch] = useState("");
  const [descriptionEditable, setDescriptionEditable] = useState(false);
  const [members, setMembers] = useState([]);
  const [fetchingMembers, setFetchingMembers] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [findSearchUsername, setFindSearchUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchedProfile, setSearchedProfile] = useState(null);
  const fetchMembers = async () => {
    try {
      let res = await getteammembers(teamInfoData.code);

      if (res.status) {
        let temp = res?.data?.pending.map((user) => ({
          ...user,
          isPending: true,
        }));
        setMembers([...res?.data?.members, ...temp]);
      } else {
        setMembers([]);
      }
      setFetchingMembers(false);
    } catch (error) {
      setFetchingMembers(false);
    }
  };

  useEffect(() => {
    if (teamInfoData?.code?.length > 0) {
      fetchMembers();
    }
  }, [teamInfoData]);

  useEffect(() => {
    if (teamInfoData) {
      setTeamName(teamInfoData?.name || "");
      setDescription(teamInfoData?.desc || "");
      setTeamImg(teamInfoData?.dp || "");
    }
  }, [teamInfoData]);
  const [teamNameImgEditable, setTeamNameImgEditable] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    maxHeight: "80vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    padding: "30px 20px",
    flexDirection: "column",
    // gap: smallScreen ? "20px" : "20px",
    maxWidth: "500px",
    borderRadius: "10px",
    border: "2px solid rgba(136, 136, 136, 0.2)",
    background: "#18181D",
    width: smallScreen ? "90%" : "570px",
    outline: "none",
  };

  const handleModalClose = () => {
    setShowSnackbar(false);
    setSnackBarInfo({ type: "", msg: "" });
    dispatch(setTeamsModalInfo(""));
    setMembers([]);
    setFetchingMembers(true);
    setTeamName("");
    setDescription("");
    setTeamImg("");
    setTeamNameImgEditable(false);
    setDescriptionEditable(false);
    setFindSearchUsername("");
    setSearchUsername("");
    setSearchedProfile(null);
    setShowAddMemberAndSearch("");
  };
  const handleTeamImgChangeClicked = () => {
    document.getElementById("choose-team-img-updated-56702").click();
  };
  const handleTeamImgUpdateChange = async (file) => {
    try {
      setTeamImgUploading(true);
      let res = await updateteamdp(file, teamInfoData?.code);
      if (res.status) {
        setTeamImg(res.data);
        dispatch(
          updateTeamsList({
            status: "update",
            id: teamInfoData?._id,
            data: { ...teamInfoData, dp: res.data },
          })
        );
        dispatch(
          setTeamClickedData({
            data: { ...teamInfoData, dp: res.data },
            open: true,
          })
        );
        dispatch(setTeamInfodata({ ...teamInfoData, dp: res.data }));

        setSnackBarInfo({
          type: "success",
          msg: "Team Image updated successfully",
        });

        setShowSnackbar(true);
      } else {
        setSnackBarInfo({ type: "error", msg: "Something went wrong" });
        setShowSnackbar(true);
      }
      setTeamImgUploading(false);
    } catch (error) {
      setTeamImgUploading(false);
    }
  };

  const updateTeamName = async () => {
    try {
      setUpdating(true);
      let res = await updateteamname(teamInfoData?.code, teamName);
      setUpdating(false);
      if (res.status) {
        dispatch(
          updateTeamsList({
            status: "update",
            id: teamInfoData?._id,
            data: { ...teamInfoData, name: teamName },
          })
        );
        dispatch(
          setTeamClickedData({
            data: { ...teamInfoData, name: teamName },
            open: true,
          })
        );
        dispatch(setTeamInfodata({ ...teamInfoData, name: teamName }));

        setSnackBarInfo({
          type: "success",
          msg: "Team name updated successfully",
        });
        setShowSnackbar(true);
      } else {
        setSnackBarInfo({ type: "error", msg: "Something went wrong" });
        setShowSnackbar(true);
      }
    } catch (error) {
      setUpdating(false);
    }
  };

  const updateTeamDesc = async () => {
    try {
      setUpdating(true);
      let res = await updateteamdesc(teamInfoData?.code, description);
      setUpdating(false);
      if (res.status) {
        dispatch(
          updateTeamsList({
            status: "update",
            id: teamInfoData?._id,
            data: { ...teamInfoData, desc: description },
          })
        );
        dispatch(
          setTeamClickedData({
            data: { ...teamInfoData, desc: description },
            open: true,
          })
        );
        dispatch(setTeamInfodata({ ...teamInfoData, desc: description }));
        setSnackBarInfo({
          type: "success",
          msg: "Team description updated successfully",
        });
        setShowSnackbar(true);
      } else {
        setSnackBarInfo({ type: "error", msg: "Something went wrong" });
        setShowSnackbar(true);
      }
    } catch (error) {
      setUpdating(false);
    }
  };

  const leaveTeamFunc = async () => {
    try {
      setUpdating(true);
      let res = await leaveteam(teamInfoData?.code, user?.email);
      if (res.status) {
        setSnackBarInfo({
          type: "success",
          msg: "Left team successfully",
        });
        dispatch(
          updateTeamsList({ status: "remove", data: teamInfoData?._id })
        );
        dispatch(setTeamClickedData({ data: null, open: false }));
        setShowSnackbar(true);
        handleClose();
        handleModalClose();
      }

      setUpdating(false);
    } catch (error) {
      setUpdating(false);
    }
  };
  const handleDeleteTeamClick = async () => {
    setUpdating(true);
    let res = await deleteteam(teamInfoData?.code);
    setUpdating(false);
    if (res.status) {
      setSnackBarInfo({
        type: "success",
        msg: "Team Deleted successfully",
      });
      dispatch(updateTeamsList({ status: "remove", data: teamInfoData?._id }));
      dispatch(setTeamClickedData({ data: null, open: false }));
      setShowSnackbar(true);
      handleClose();
      handleModalClose();
    }
  };

  const handleSerachByUserNameClick = async () => {
    if (searchedProfile) {
      console.log(teamInfoData);
      if (members.find((member) => member.email === searchedProfile?.email)) {
        setSearchedProfile(null);
        setShowSnackbar(true);
        setSnackBarInfo({
          type: "info",
          msg: "User already added or request being sent",
        });
        return;
      }
      setUpdating(true);
      let res = await addteammember(teamInfoData?.code, searchedProfile?.email);
      console.log(res);
      if (res.status) {
        setShowSnackbar(true);
        setSnackBarInfo({
          type: "success",
          msg: "Request sent successfully",
        });

        setMembers((prev) => [
          ...prev,
          { ...searchedProfile, isPending: true },
        ]);
      }
      setUpdating(false);
      setSearchedProfile(null);
      return;
    }
    try {
      setUpdating(true);
      let profile = await getpublicprofile(findSearchUsername);
      if (profile.status) {
        setSearchedProfile(profile.data?.info);
      } else {
        setSnackBarInfo({
          type: "error",
          msg: "No user found",
        });
        setShowSnackbar(true);
      }
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
    }
  };

  const filterMembers = members?.filter((member) => {
    return (member?.name_first + " " + member?.name_last)
      .toLowerCase()
      .includes(searchUsername.toLowerCase());
  });
  return (
    <Box>
      <Snackbar
        sx={{ position: "absolute" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
          position: "absolute",
          top: "0%",
        }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackBarInfo.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfo.msg}
        </Alert>
      </Snackbar>
      <Modal
        open={teamsModalInfo === "teamInfoModal"}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Team Information</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <MoreVertIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "#fff", cursor: "pointer" }}
              />
              <Menu
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#18181D",
                    borderRadius: "0px 10px 10px 10px",
                    border: "1px solid rgba(136, 136, 136, 0.20)",
                  },
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {isAdmin && (
                  <MenuItem
                    sx={{ color: "#FF2B2B" }}
                    onClick={handleDeleteTeamClick}
                  >
                    <RemoveCircleIcon
                      sx={{ color: "#FF2B2B", width: "20px", height: "20px" }}
                    />{" "}
                    &nbsp; Delete Team
                  </MenuItem>
                )}
                {/* <Divider
                  sx={{
                    border: "0.5px solid rgba(136, 136, 136, 0.20)",
                    margin: "0px !important",
                    padding: "0px !important",
                  }}
                /> */}
                {!isAdmin && (
                  <MenuItem
                    sx={{ color: "#FF2B2B" }}
                    onClick={() => {
                      leaveTeamFunc();
                    }}
                  >
                    <RemoveCircleIcon
                      sx={{ color: "#FF2B2B", width: "20px", height: "20px" }}
                    />{" "}
                    &nbsp; Leave Team
                  </MenuItem>
                )}
              </Menu>
              <CloseIcon
                onClick={handleModalClose}
                sx={{
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          <RowLayout>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                {!teamImgUploading && (
                  <Avatar
                    src={teamImg}
                    sx={{
                      width: smallScreen ? "45px" : "65px",
                      height: smallScreen ? "45px" : "65px",
                    }}
                  />
                )}
                {teamImgUploading && (
                  <Skeleton
                    variant="circular"
                    sx={{
                      width: smallScreen ? "45px" : "65px",
                      height: smallScreen ? "45px" : "65px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <input
                  accept="image/*"
                  id="choose-team-img-updated-56702"
                  type="file"
                  style={{
                    display: "none",
                    visibility: "hidden",
                    width: "0",
                    height: "0",
                  }}
                  onChange={(e) => {
                    handleTeamImgUpdateChange(e.target.files[0]);
                  }}
                />
                {teamNameImgEditable && (
                  <EditIcon
                    onClick={handleTeamImgChangeClicked}
                    sx={{
                      color: "#fff",
                      cursor: "pointer",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <TextField
                  sx={{
                    border: "none",
                    width: "100%",
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px",
                    },
                  }}
                  inputProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  id="standard-basic"
                  variant="standard"
                  fullWidth
                  placeholder="Team Name"
                  InputProps={{ disableUnderline: true }}
                  value={teamName}
                  onChange={(e) =>
                    teamNameImgEditable && setTeamName(e.target.value)
                  }
                />

                <Typography variant="subtitle2">
                  {teamInfoData?.members?.length} Members
                </Typography>
              </Box>
            </Box>
            {!teamNameImgEditable && isAdmin && (
              <EditIcon
                onClick={() => setTeamNameImgEditable(true)}
                sx={{ color: "#fff", cursor: "pointer" }}
              />
            )}
            {teamNameImgEditable && isAdmin && (
              <DoneIcon
                onClick={() => {
                  updateTeamName();
                  setTeamNameImgEditable(false);
                }}
                sx={{ color: "#fff", cursor: "pointer" }}
              />
            )}
          </RowLayout>

          <RowLayout>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                width: "80%",
              }}
            >
              <Typography variant="body1">Description</Typography>
              <TextField
                sx={{
                  border: "none",
                  width: "100%",
                  "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                    padding: "0px",
                  },
                }}
                inputProps={{
                  style: {
                    color: "#888",
                    fontSize: "16px",
                    fontWeight: "400",
                  },
                }}
                id="standard-basic"
                variant="standard"
                fullWidth
                placeholder="description"
                InputProps={{ disableUnderline: true }}
                value={description}
                onChange={(e) =>
                  descriptionEditable && setDescription(e.target.value)
                }
              />
            </Box>

            {!descriptionEditable && isAdmin && (
              <EditIcon
                onClick={() => setDescriptionEditable(true)}
                sx={{ color: "#fff", cursor: "pointer" }}
              />
            )}
            {descriptionEditable && isAdmin && (
              <DoneIcon
                onClick={() => {
                  updateTeamDesc();
                  setDescriptionEditable(false);
                }}
                sx={{ color: "#fff", cursor: "pointer" }}
              />
            )}
          </RowLayout>

          <RowLayout>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography variant="body1">Team Code</Typography>
              <CopyToClipboard
                text={teamInfoData?.code}
                onCopy={() => {
                  setSnackBarInfo({
                    type: "success",
                    msg: "Copied to clipboard",
                  });
                  setShowSnackbar(true);
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <Typography variant="subtitle2">
                    {teamInfoData?.code}{" "}
                  </Typography>
                  <Box
                    sx={{ cursor: "pointer", width: "15px", height: "15px" }}
                    component="img"
                    src={copyToClipboardSvg}
                  />
                </Box>
              </CopyToClipboard>
            </Box>
          </RowLayout>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",

              gap: "8px",

              padding: smallScreen ? "10px 0px" : "15px 0px",
              borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">All Members</Typography>
              {!showAddMemberAndSearch && (
                <Box sx={{ display: "flex", gap: "15px" }}>
                  {isAdmin && (
                    <PersonAddAltIcon
                      onClick={() => setShowAddMemberAndSearch("add")}
                      sx={{
                        color: "#fff",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  <SearchIcon
                    onClick={() => setShowAddMemberAndSearch("search")}
                    sx={{
                      color: "#fff",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              )}
              {showAddMemberAndSearch && (
                <CloseIcon
                  onClick={() => {
                    setSearchUsername("");
                    setShowAddMemberAndSearch("");
                    setFindSearchUsername("");
                  }}
                  sx={{
                    color: "#fff",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                />
              )}
            </Box>

            {showAddMemberAndSearch === "add" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {searchedProfile && (
                  <Box
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid #888",
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "5px 10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={searchedProfile?.profile}
                        sx={{
                          width: smallScreen ? "30px" : "40px",
                          height: smallScreen ? "30px" : "40px",
                        }}
                      />
                      <Typography variant={"body2"}>
                        {searchedProfile?.name_first +
                          " " +
                          searchedProfile?.name_last}
                      </Typography>
                    </Box>
                    <CloseIcon
                      onClick={() => setSearchedProfile(null)}
                      sx={{
                        width: "20px",
                        height: "20px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                )}
                {!searchedProfile && (
                  <TextField
                    sx={{
                      width: "100%",
                      "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                        padding: "0px",
                      },
                      border: "1px solid rgba(136, 136, 136, 0.20)",
                      borderRadius: "10px",
                      padding: "10px 20px",
                    }}
                    inputProps={{
                      style: {
                        color: "#888",
                        fontSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    placeholder="search by username"
                    InputProps={{ disableUnderline: true }}
                    value={findSearchUsername}
                    onChange={(e) => setFindSearchUsername(e.target.value)}
                  />
                )}
                <ActionButton
                  handleOnClick={handleSerachByUserNameClick}
                  fontSize="16px"
                  name={searchedProfile ? "Add" : "Search by Username"}
                />
              </Box>
            )}

            {showAddMemberAndSearch === "search" && (
              <TextField
                sx={{
                  width: "100%",
                  "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                    padding: "0px",
                  },
                  border: "1px solid rgba(136, 136, 136, 0.20)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                }}
                inputProps={{
                  style: {
                    color: "#888",
                    fontSize: "16px",
                    fontWeight: "400",
                  },
                }}
                id="standard-basic"
                variant="standard"
                fullWidth
                placeholder="search member..."
                InputProps={{ disableUnderline: true }}
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
              />
            )}
          </Box>

          <Box sx={{ overflowY: "scroll", minHeight: "50vh" }}>
            {fetchingMembers &&
              Array.from(Array(5).keys()).map((item, index) => {
                return <MemberCompSkeleton key={index} />;
              })}

            {!fetchingMembers &&
              filterMembers?.map((member, index) => {
                return (
                  <MemberComp
                    isAdmin={teamInfoData?.owner === member?.email}
                    key={member._id}
                    member={member}
                    isPending={member?.isPending}
                  />
                );
              })}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeamInforModal;
