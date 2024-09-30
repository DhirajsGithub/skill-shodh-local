import axios from "axios";
import { suggestSkills } from "./skillssugestions";
import { encrypt } from "./encrypt";
import { baseurl } from "./api";

//CHECKED
const search = async (text, skills, colleges) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      text: text,
      skills: skills,
      colleges: colleges,
    });
    await axios({
      url: baseurl + "search",
      method: "POST",
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
};

//CHECKED
const loadmore = async (text, skills, colleges, userspresent) => {
  try {
    var usernames = userspresent.map((a) => a.username);
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      text: text,
      skills: skills,
      colleges: colleges,
      usernames: usernames,
    });
    await axios({
      url: baseurl + "loadmore",
      method: "POST",
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
};

//CHECKED
const getfilterskills = async (search, selected) => {
  try {
    const skills = suggestSkills(search, selected);
    return { status: true, message: "", data: skills };
  } catch (e) {
    return { status: false, message: "", data: "" };
  }
};

export { search, loadmore, getfilterskills };
