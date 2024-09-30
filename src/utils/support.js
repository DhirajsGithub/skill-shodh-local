import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { baseurl, supabase } from "./api";
import { encrypt } from "./encrypt";

//CHECKED
const uploadsupportfiles = async (file, extension) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var name = makeid(15);
    const { data, error } = await supabase.storage
      .from("Support_DOCS")
      .upload("files/" + name + "." + extension, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error != null) {
      result = { status: false, message: error.message, data: "" };
    } else {
      const { data, error } = await supabase.storage
        .from("Support_DOCS")
        .createSignedUrl("files/" + name + "." + extension, 3153600000);
      if (error != null) {
        result = { status: false, message: error.message, data: "" };
      } else {
        result = { status: true, message: "", data: data.signedUrl };
      }
    }
    return result;
  } catch (e) {
    console.log(e.message)
    return { status: false, message: e.message, data: "" };
  }
};

//CHECKED
const support = async (text, email, fileurl) => {
  try {
    var result = { status: false, message: "Error", data: "" };
    var data = await encrypt({
      text: text,
      email: email,
      fileurl: fileurl
    });
    await axios({
      url: baseurl + "support",
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

export { uploadsupportfiles, support }

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