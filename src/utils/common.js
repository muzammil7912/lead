// return the token from the session storage
export const getTokenSession = () => {
    return localStorage.getItem("token") || null;
  };
  
  // remove the token and user from the session storage
  export const removeTokenSession = () => {
    localStorage.clear();
  };
  
  // set the token and user from the session storage
  export const setTokenSession = (token) => {
    localStorage.setItem("token", token);
  };
  export const getTranslation = () => {
    return localStorage.getItem("translation") || "31";
  };
  export const getTranslationimg = () => {
    return localStorage.getItem("translationimg") || "en.svg";
  };
  export const setTranslation = (trans) => {
    localStorage.setItem("translation", trans);
  };
  export const setTranslationimg = (trans) => {
    localStorage.setItem("translationimg", trans);
  };
  





















//   import { encrypt, decrypt } from './encryptionUtils'; // Import your encryption utility functions

// // return the token from the session storage
// export const getTokenSession = () => {
//   const cookies = document.cookie.split(';');
//   let cookieToken = '';
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith('token=')) {
//       cookieToken = cookie.substring('token='.length, cookie.length);
//       break;
//     }
//   }
//     return cookieToken || null;
//   };
  
//   // remove the token and user from the session storage
//   export const removeTokenSession = () => {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i];
//         const eqPos = cookie.indexOf("=");
//         const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     }
//   };
  
//   // set the token and user from the session storage
//   export const setTokenSession = (token) => {
//     document.cookie = `token=${token}`;
//   };
//   export const getTranslation = () => {
    
//     return localStorage.getItem("translation") || "31";
//   };
//   export const getTranslationimg = () => {
//     return localStorage.getItem("translationimg") || "en.svg";
//   };
//   export const setTranslation = (trans) => {
//     localStorage.setItem("translation", trans);
//   };
//   export const setTranslationimg = (trans) => {
//     localStorage.setItem("translationimg", trans);
//   };
  