// Helper function to format chat date
import moment from "moment";
const formatChatDate = (date) => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  const chatDate = moment(date).startOf("day");

  if (chatDate.isSame(today)) {
    return "Today";
  } else if (chatDate.isSame(yesterday)) {
    return "Yesterday";
  } else {
    return moment(date).format("MMMM Do YYYY");
  }
};

// Group chats by date
const groupedChatsHelper = (chats) => {
  const groupedChats = chats.reduce((acc, chat) => {
    const chatDate = formatChatDate(chat.time);
    if (!acc[chatDate]) {
      acc[chatDate] = [];
    }
    acc[chatDate].push(chat);
    return acc;
  }, {});
  return groupedChats;
};

export { formatChatDate, groupedChatsHelper };
