import axios from "axios";
import { baseurl, supabase } from "./api";

const myreferraldata = async () => {
    try {
      var token = (await supabase.auth.getSession()).data.session.access_token;
      var result = { status: false, message: "Error", data: "" };
      await axios({
        url: baseurl + "myreferraldata",
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

  export {
    myreferraldata
  }