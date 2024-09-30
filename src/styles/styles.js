const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  maxHeight: "80vh",
  overflowY: "scroll",
  padding: "20px",
  gap: "30px",
  scrollbarWidth: "none",
  flexDirection: "column",
  maxWidth: "490px",
  borderRadius: "10px",
  border: "2px solid rgba(136, 136, 136, 0.2)",
  background: "#18181D",
  outline: "none",
};

const skillChipLevelStyle = (level) => {
  if (level === 1) {
    return {
      backgroundColor: "#33402B",
      color: "#91FF6A",
    };
  }
  if (level === 2) {
    return {
      backgroundColor: "#40352B",
      color: "#FF976A",
    };
  }
  if (level === 3) {
    return {
      backgroundColor: "#402B32",
      color: "#FF6AA0",
    };
  }
};
const skeletonStyle = { bgcolor: "#8b8b8b" };

export { ModalStyle, skeletonStyle };

export default skillChipLevelStyle;
