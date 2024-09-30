import axios from "axios";
import { baseurl, supabase } from "./api";
import { encrypt } from "./encrypt";

//CHECKED
const recommendation = async () => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var session = (await supabase.auth.getSession()).data.session;
    var token = session ? session.access_token : null
    await axios({
      url: baseurl + "recommendation",
      method: "GET",
      headers: {
        Authorization: token
      }
    }).then((res) => {
      result = res.data;
    });

    return result;
  } catch (e) {
    console.log(e)
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const loadrecom = async (domain, present) => {
  try {
    var usernames = present.map((a) => a.username);
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      domain: domain,
      present: usernames,
    });
    await axios({
      url: baseurl + "loadrecom",
      method: "POST",
      data: {
        data: data
      },
    }).then((res) => {
      result = res.data;
    });
    return result;
  } catch (e) {
    console.log(e)
    return { status: false, message: e.message, data: "" };
  }
};

export { recommendation, loadrecom };
