//var secret_key = import.meta.env.VITE_ENCRYPT;
//import CryptoJS from "crypto-js";

const encrypt = async (data) => {
    //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
    return JSON.stringify(data);
}
export {
    encrypt
}