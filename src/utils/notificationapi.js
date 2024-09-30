import axios from "axios";
import { baseurl, supabase } from "./api";
import { encrypt } from "./encrypt";

//CHECKED
const getnotifications = async (email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "getnotifications",
      method: "GET",
      headers: {
        Authorization: token,
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
const clearnotifications = async (email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "clearnotifications",
      method: "GET",
      headers: {
        Authorization: token,
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
const updatenotifications = async (id) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      id: id,
    });
    await axios({
      url: baseurl + "updatenotifications",
      method: "GET",
      headers: {
        Authorization: token,
        data: data
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

export { getnotifications, clearnotifications, updatenotifications };
