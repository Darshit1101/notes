import CryptoJS from 'crypto-js';

const _secretKey = process.env.REACT_APP_SECRET_KEY_FOR_CRYPTO;

export const encrypt = (plainStr) => {
  const encryptPWD = CryptoJS.AES.encrypt(plainStr, _secretKey).toString();
  return encryptPWD;
};