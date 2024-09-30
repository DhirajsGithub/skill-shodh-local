import axios from "axios";
import { encrypt } from "./encrypt";
import { baseurl, supabase } from "./api";

//CHECKED
const createoppo = async (data, user) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var bydetails = {
      profile: user.profile,
      name_first: user.name_first,
      name_last: user.name_last,
      username: user.username,
    };
    data.bydetails = bydetails;
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({ data });
    await axios({
      url: baseurl + "createoppo",
      method: "POST",
      headers: {
        Authorization: token,
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
};

//CHECKED
const newoppo = async (email, skills, college, paidonly, companyonly) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var user = (await supabase.auth.getUser()).data.user;
    var token =
      user == null
        ? null
        : (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      skills: skills,
      college: college,
      paidonly: paidonly,
      companyonly: companyonly,
    });
    console.log(data);
    await axios({
      url: baseurl + "newoppo",
      method: "POST",
      headers: {
        Authorization: token,
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
};

//CHECKED
const newoppoloadmore = async (email, skills, college, codes) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var user = (await supabase.auth.getUser()).data.user;
    var token =
      user == null
        ? null
        : (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      skills: skills,
      college: college,
      codes: codes,
    });
    await axios({
      url: baseurl + "newoppoloadmore",
      method: "POST",
      headers: {
        Authorization: token,
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
};

//CHECKED
const applyoppo = async (code, answers, cv, user) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      answers: answers,
      cv: cv,
      applybydetails: {
        profile: user.profile,
        name_first: user.name_first,
        name_last: user.name_last,
        username: user.username,
      },
      skills: user.skills,
    });
    await axios({
      url: baseurl + "applyoppo",
      method: "POST",
      headers: {
        Authorization: token,
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
};

//CHECKED
const appliedoppo = async (email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "appliedoppo",
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
const createdoppo = async (email) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "createdoppo",
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
const applications = async (code, relevance, skills) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      relevance: relevance,
    });
    await axios({
      url: baseurl + "applications",
      method: "POST",
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
const hireoppo = async (id) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      id: id,
    });
    await axios({
      url: baseurl + "hireoppo",
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
const deleteoppo = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "deleteoppo",
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
const findoppoapply = async (code, email, college) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var user = (await supabase.auth.getUser()).data.user;
    var token =
      user == null
        ? null
        : (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
      college: college,
    });
    await axios({
      url: baseurl + "findoppoapply",
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
const stopaccepting = async (code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      code: code,
    });
    await axios({
      url: baseurl + "stopaccepting",
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

export {
  createoppo,
  newoppo,
  applyoppo,
  appliedoppo,
  createdoppo,
  applications,
  hireoppo,
  deleteoppo,
  findoppoapply,
  stopaccepting,
  newoppoloadmore,
};
