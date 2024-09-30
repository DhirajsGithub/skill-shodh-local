import axios from "axios";
import { baseurl, supabase } from "./api";
import { encrypt } from "./encrypt";

//CHECKED
const getproviders = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return { status: true, message: '', data: user.app_metadata.providers };
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const changepass = async (newpass) => {
  try {
    const {
      data,
      error,
    } = await supabase.auth.updateUser({ password: newpass })
    if (error) {
      return { status: false, message: error.message, data: '' };
    } else {
      return { status: true, message: '', data: '' };
    }

  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};


//CHECKED
const change_dm_noti = async (email, value) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      value: value
    });
    await axios({
      url: baseurl + "change_dm_noti",
      method: "POST",
      headers: {
        Authorization: token
      },
      data: {
        data: data,

      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    console.log(e)
    return { status: false, message: e.message, data: "" };
  }
}

//CHECKED
const change_teams_noti = async (email, value) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      value: value
    });
    await axios({
      url: baseurl + "change_teams_noti",
      method: "POST",
      headers: {
        Authorization: token
      },
      data: {
        data: data,
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
}

//CHECKED
const change_teams_add = async (email, value) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      value: value
    });
    await axios({
      url: baseurl + "change_teams_add",
      method: "POST",
      headers: {
        Authorization: token
      },
      data: {
        data: data
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
}

export {
  getproviders,
  changepass,
  change_dm_noti,
  change_teams_noti,
  change_teams_add
}