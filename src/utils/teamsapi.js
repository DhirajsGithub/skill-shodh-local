import axios from "axios";
import { encrypt } from "./encrypt";
import { baseurl, supabase } from "./api";

//CHECKED
const createteam = async (dp, name, desc, email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      dp: dp,
      name: name,
      desc: desc,
    });
    await axios({
      url: baseurl + "createteam",
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

//CHECKED
const searchteam = async (code, captchaValue) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "searchteam",
      method: "POST",
      headers: {
        Authorization: token,
        data: data,
      },
      data: { captchaValue },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const jointeam = async (code, email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "jointeam",
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

//CHECKED
const jointeam_fromnoti = async (id) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      id: id,
    });
    await axios({
      url: baseurl + "jointeam_fromnoti",
      method: "POST",
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

//CHECKED
const getteams = async () => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "getteams",
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
const getteamdetails = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "getteamdetails",
      method: "GET",
      headers: {
        Authorization: token,
        data: data,
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
const getteammembers = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "getteammembers",
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

//CHECKED
const addteammember = async (code, email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      user: email,
    });
    await axios({
      url: baseurl + "addteammember",
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

//CHECKED
const deleteteam = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code
    });
    await axios({
      url: baseurl + "deleteteam",
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

//CHECKED
const leaveteam = async (code, email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code
    });
    await axios({
      url: baseurl + "leaveteam",
      method: "GET",
      headers: {
        Authorization: token,
        data: data,
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
const uploadteamdp = async (file) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(11);
    const { data, error } = await supabase.storage
      .from("Team_Data")
      .upload("dp/" + name + ".png", file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("Team_Data")
        .createSignedUrl("dp/" + name + ".png", 3153600000);
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

//CHECKED
const uploadteamfiles = async (file, extension) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(15);
    const { data, error } = await supabase.storage
      .from("Team_Data")
      .upload("files/" + name + "." + extension, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("Team_Data")
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

//CHECKED
const getteamchats = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code
    });
    await axios({
      url: baseurl + "getteamchats",
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

//CHECKED
const getteamchatsloadmore = async (code, time) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code
    });
    await axios({
      url: baseurl + "getteamchatsloadmore",
      method: "POST",
      headers: {
        Authorization: token,
        data: data
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
const updateteamdp = async (file, code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(11);
    const { data, error } = await supabase.storage
      .from("Team_Data")
      .upload("dp/" + name + ".png", file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("Team_Data")
        .createSignedUrl("dp/" + name + ".png", 3153600000);
      if (error != null) {
        result = { status: false, message: error.message, data: "" };
      } else {

        var token = (await supabase.auth.getSession()).data.session.access_token;
        var datu = await encrypt({
          code: code,
          dp: data.signedUrl
        });
        await axios({
          url: baseurl + "updateteamdp",
          method: "GET",
          headers: {
            Authorization: token,
            data: datu

          },
        }).then((res) => {
          result = { ...res.data, data: data.signedUrl };
        });
      }
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const updateteamname = async (code, name) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      name: name,
    });
    await axios({
      url: baseurl + "updateteamname",
      method: "GET",
      headers: {
        Authorization: token,
        data: data,
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
const updateteamdesc = async (code, desc) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      desc: desc,
    });
    await axios({
      url: baseurl + "updateteamdesc",
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

//CHECKED
const getteamresouces = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "getteamresouces",
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

const change_team_noti_user = async (email, code, value) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    await axios({
      url: baseurl + "change_team_noti_user",
      method: "POST",
      data: {
        user: email,
        code: code,
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

export {
  createteam,
  searchteam,
  jointeam,
  getteams,
  getteamdetails,
  getteammembers,
  addteammember,
  deleteteam,
  leaveteam,
  uploadteamdp,
  uploadteamfiles,
  getteamchats,
  updateteamdp,
  updateteamname,
  updateteamdesc,
  getteamresouces,
  change_team_noti_user,
  jointeam_fromnoti,
  getteamchatsloadmore
};
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
