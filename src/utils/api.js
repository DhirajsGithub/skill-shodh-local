import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { suggestSkills } from "./skillssugestions";
import { encrypt } from "./encrypt";
var baseurl = import.meta.env.VITE_APP_BASE_URL;
var projecturl = import.meta.env.VITE_APP_PROJECT_URL;
var anonkey = import.meta.env.VITE_APP_ANON_KEY;
const clientUrl = import.meta.env.VITE_CLIENT_BASE_URL;
const supabase = createClient(projecturl, anonkey);

const getauth = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == null) {
      return { status: false, message: "", data: "" };
    } else {
      return { status: true, message: "", data: user };
    }
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const getcurrentuser = async () => {
  try {
    var result = { status: false, message: "Error", data: "" };
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == null) {
      result = { status: false, message: "", data: "" };
    } else {
      var userdata = await getuserdata();
      if (userdata.data) {
        result = userdata;
      } else {
        var userdata = (await supabase.auth.getUser()).data.user;
        var profilepic = userdata.user_metadata.avatar_url;
        var name = userdata.user_metadata.name.split(" ");
        var name_first = name[0];
        var name_last = name[1];
        var token = (await supabase.auth.getSession()).data.session
          .access_token;
          var referral = localStorage.getItem("referral_code");
          console.log('myreferral')
          console.log(referral)
        var data = await encrypt({
          name_first: name_first,
          name_last: name_last,
          profile: profilepic,
          referral: referral
        });
        await axios({
          url: baseurl + "stepssignup",
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
      }
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const getuserdata = async () => {
  try {
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var result = { status: false, message: "Error", data: "" };
    await axios({
      url: baseurl + "getuserdata",
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
const googlelogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const githublogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const signup = async (uemail, upass, name_first, name_last, referral_code) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: uemail,
      password: upass,
    });
    if (error) {
      result = { status: false, message: error.message, data: "" };
    } else {
      var data = await encrypt({
        email: uemail,
        name_first: name_first,
        name_last: name_last,
        referral_code: referral_code
      });
      await axios({
        url: baseurl + "signup",
        method: "GET",
        headers: {
          data: data,
        },
      }).then((res) => {
        result = res.data;
      });
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const login = async (uemail, upass) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: uemail,
      password: upass,
    });
    if (session != null) {
      result = { status: true, message: "", data: "" };
    } else {
      result = { status: false, message: error.message, data: "" };
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const forgetpass = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: clientUrl + "settings?openChangePassModal=true",
    });
    if (error == null) {
      return { status: true, message: "", data: "" };
    } else {
      return { status: false, message: error, data: "" };
    }
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const signout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error == null) {
      return { status: true, message: "", data: "" };
    } else {
      return { status: false, message: error, data: "" };
    }
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const isuseravai = async (username) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      username: username,
    });
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "isuseravai",
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
const uploadprofilepic = async (file) => {
  try {
    //file should not be null here
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(5);
    const { data, error } = await supabase.storage
      .from("User_Data")
      .upload(
        (await supabase.auth.getUser()).data.user.id +
          "/profile/" +
          name +
          ".png",
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("User_Data")
        .createSignedUrl(
          (await supabase.auth.getUser()).data.user.id +
            "/profile/" +
            name +
            ".png",
          3153600000
        );
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
const uploadbannerpic = async (file) => {
  try {
    //file should not be null here
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(5);
    const { data, error } = await supabase.storage
      .from("User_Data")
      .upload(
        (await supabase.auth.getUser()).data.user.id +
          "/banner/" +
          name +
          ".png",
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("User_Data")
        .createSignedUrl(
          (await supabase.auth.getUser()).data.user.id +
            "/banner/" +
            name +
            ".png",
          3153600000
        );
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
const uploadresume = async (file) => {
  try {
    //file should not be null here
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(5);
    const { data, error } = await supabase.storage
      .from("User_Data")
      .upload(
        (await supabase.auth.getUser()).data.user.id +
          "/resume/" +
          name +
          ".pdf",
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("User_Data")
        .createSignedUrl(
          (await supabase.auth.getUser()).data.user.id +
            "/resume/" +
            name +
            ".pdf",
          3153600000
        );
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
const uploadinterncertificate = async (file, ispdf) => {
  try {
    //file should not be null here
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(5);
    if (ispdf) {
      const { data, error } = await supabase.storage
        .from("User_Data")
        .upload(
          (await supabase.auth.getUser()).data.user.id +
            "/interns/" +
            name +
            ".pdf",
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      if (error != null) {
        result = { status: false, message: error.message, data: "" };
      } else {
        const { data, error } = await supabase.storage
          .from("User_Data")
          .createSignedUrl(
            (await supabase.auth.getUser()).data.user.id +
              "/interns/" +
              name +
              ".pdf",
            3153600000
          );
        if (error != null) {
          result = { status: false, message: error.message, data: "" };
        } else {
          result = { status: true, message: "", data: data.signedUrl };
        }
      }
    } else {
      const { data, error } = await supabase.storage
        .from("User_Data")
        .upload(
          (await supabase.auth.getUser()).data.user.id +
            "/interns/" +
            name +
            ".png",
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      if (error != null) {
        result = { status: false, message: error.message, data: "" };
      } else {
        const { data, error } = await supabase.storage
          .from("User_Data")
          .createSignedUrl(
            (await supabase.auth.getUser()).data.user.id +
              "/interns/" +
              name +
              ".png",
            3153600000
          );
        if (error != null) {
          result = { status: false, message: error.message, data: "" };
        } else {
          result = { status: true, message: "", data: data.signedUrl };
        }
      }
    }
    return result;
  } catch (e) {
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const nextstep1 = async (
  profilepic,
  bannerpic,
  name_first,
  name_last,
  username,
  sbio,
  bio
) => {
  console.log(
    profilepic,
    bannerpic,
    name_first,
    name_last,
    username,
    sbio,
    bio
  );
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      profile: profilepic,
      banner: bannerpic,
      name_first: name_first,
      name_last: name_last,
      username: username,
      sbio: sbio,
      bio: bio,
    });
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "step1",
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
    return { status: false, message: "Error:", data: "" };
  }
};

//CHECKED
const nextstep2 = async (school, college, graduation) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      school: school,
      college: college,
      graduation: graduation,
    });
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "step2",
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
    return { status: false, message: "Error:", data: "" };
  }
};

//CHECKED
const nextstep3 = async (skills, skillslevel, interns, projects, por) => {
  try {
    const internmonths = getinternmonths(interns);
    const points = generatepoints(skillslevel, internmonths, projects, por);
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      skills: skills,
      skillslevel: skillslevel,
      interns: interns,
      projects: projects,
      por: por,
      points: points,
    });
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "step3",
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
    return { status: false, message: "Error:", data: "" };
  }
};

//CHECKED
const nextstep4 = async (insta, linkedin, git, portfolio, resume) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      insta: insta,
      linkedin: linkedin,
      git: git,
      portfolio: portfolio,
      resume: resume,
    });
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "step4",
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
    console.log(result);
    return result;
  } catch (e) {
    return { status: false, message: "Error:", data: "" };
  }
};

//CHECKED
const getpublicprofile = async (username) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    //var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      username: username,
    });
    await axios({
      url: baseurl + "getpublicprofile",
      method: "GET",
      headers: {
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
const reportuser = async (useremail) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      user: useremail,
    });
    await axios({
      url: baseurl + "reportuser",
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
const getsuggestionskills = async (search, selected) => {
  try {
    selected = selected.map((item) => item.name);
    const skills = suggestSkills(search, selected);
    return { status: true, message: "", data: skills };
  } catch (e) {
    return { status: false, message: "", data: "" };
  }
};

//CHECKED
const getcolleges = async (text, selected) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      text: text,
      selected: selected,
    });
    await axios({
      url: baseurl + "getcolleges",
      method: "POST",
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
const addcollege = async (name) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      name: name,
    });
    await axios({
      url: baseurl + "addcollege",
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
const addskillsreq = async (skill) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      skill: skill,
    });
    await axios({
      url: baseurl + "addskillsreq",
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
const delete_user = async (reason) => {
  try {
    var {
      data: { user },
    } = await supabase.auth.getUser();
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      id: user.id,
      reason: reason,
    });
    await axios({
      url: baseurl + "delete_user",
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
const companyprofile = async (id) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      id: id,
    });
    await axios({
      url: baseurl + "companyprofile",
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

const unreadchatscount = async () => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    await axios({
      url: baseurl + "unreadchatscount",
      method: "GET",
      headers: {
        Authorization: token,
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

export {
  getcurrentuser,
  getuserdata,
  getauth,
  googlelogin,
  githublogin,
  signup,
  login,
  signout,
  isuseravai,
  getpublicprofile,
  reportuser,
  uploadprofilepic,
  uploadbannerpic,
  uploadresume,
  uploadinterncertificate,
  nextstep1,
  nextstep2,
  nextstep3,
  nextstep4,
  getsuggestionskills,
  addskillsreq,
  getcolleges,
  addcollege,
  forgetpass,
  delete_user,
  companyprofile,
  unreadchatscount,
  supabase,
  baseurl,
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

function generatepoints(skillslevel, internmonths, projects, por) {
  let beginer = skillslevel.filter((a) => a.level == 1).length;
  let intermediate = skillslevel.filter((a) => a.level == 2).length;
  let advance = skillslevel.filter((a) => a.level == 3).length;
  const points_skills = beginer + 2 * intermediate + 3 * advance;
  const points_intern = 10 * internmonths;
  const points_projects = 10 * projects.length;
  const points_por = 15 * por.length;
  const points = points_skills + points_intern + points_projects + points_por;
  return points;
}

function getinternmonths(interns) {
  var days = 0;
  for (let i = 0; i < interns.length; i++) {
    var start_date = interns[i]["startDate"];
    var end_date = interns[i]["endDate"];
    var curently = interns[i]['currentlyWorking'];
    const diffTime = (curently)?Math.abs(Date.parse(new Date()) - Date.parse(start_date)) : 
    Math.abs(Date.parse(end_date) - Date.parse(start_date));
    console.log(diffTime)
    days += Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
  var months = Math.round(days / 30);
  return months;
}

//remaining
//getsuggestionskills
//need to test intern months, will be checked after implementation
