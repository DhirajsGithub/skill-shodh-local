import axios from "axios";
import { encrypt } from "./encrypt";
import { baseurl, supabase } from "./api";

//CHECKED
const chatpersons = async () => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "chatpersons",
      method: "GET",
      headers: {
        Authorization: token,
        company: 0
      },
    }).then((res) => {
      result = res.data;
      console.log(result);
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const chatmessages = async (email, otheremail) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      to: otheremail,
    });
    await axios({
      url: baseurl + "chatmessages",
      method: "GET",
      headers: {
        Authorization: token,
        data: data,
        company: 0,

      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const chatmessagesloadmore = async (email, otheremail, time) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      to: otheremail,
    });
    await axios({
      url: baseurl + "chatmessagesloadmore",
      method: "POST",
      headers: {
        Authorization: token,
        data: data,
        company: 0
      },
      data: {
        time: time
      }
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const updatelastread = async (email, otheremail) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      to: otheremail,
    });
    await axios({
      url: baseurl + "updatelastread",
      method: "GET",
      headers: {
        Authorization: token,
        data: data,
        company: 0
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const uploadchatfiles = async (file, extension) => {
  try {
    //file should not be null here
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(15);
    const { data, error } = await supabase.storage
      .from("Chats_Data")
      .upload("files/" + name + "." + extension, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("Chats_Data")
        .createSignedUrl("files/" + name + "." + extension, 3153600000);
      if (error != null) {
        result = { status: false, message: error.message, data: "" };
      } else {
        result = { status: true, message: "", data: data.signedUrl };
      }
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

const change_chat_noti_user = async (email, otheremail, value) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    await axios({
      url: baseurl + "change_chat_noti_user",
      method: "POST",
      data: {
        user: email,
        to: otheremail,
        value: value
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

export { chatpersons, chatmessages, uploadchatfiles, change_chat_noti_user, updatelastread, chatmessagesloadmore };
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
