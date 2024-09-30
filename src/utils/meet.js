import axios from "axios";
import { encrypt } from "./encrypt";
import { baseurl, supabase } from "./api";

//CHECKED
const get_meetdata = async (meet_id) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var token = (await supabase.auth.getSession()).data.session.access_token;
    var data = await encrypt({
      meet_id: meet_id,
    });
    await axios({
      url: baseurl + "get_meetdata",
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

export {
  get_meetdata
}