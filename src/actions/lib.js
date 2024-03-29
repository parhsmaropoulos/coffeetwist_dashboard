import axios from "axios";
// import app from "../firebase/base";
import { config } from "../utils/headers";
import { current_url } from "../utils/util";
// import { CREATE_CATEGORY, CREATE_ITEM, SNACKBAR_ERROR } from "./actions";

export const auth_get_request = async (url) => {
  let auth_config = config;
  auth_config.headers.Authorization = `Bearer ${localStorage.getItem(
    "firToken"
  )}`;
  try {
    const res = await axios.get(current_url + url, auth_config);
    return res.data.data;
  } catch (e) {
    return e.response;
  }
};

export async function get_request(url) {
  try {
    let auth_config = config;
    const res = await axios.get(current_url + url, auth_config);
    // console.log(res);
    return res.data.data;
  } catch (e) {
    return e.response;
  }
}

export async function put_request(url, data) {
  try {
    let auth_config = config;
    const res = await axios.put(current_url + url, data, auth_config);
    // console.log(res);
    return res.data;
  } catch (e) {
    return e.response;
  }
}

export async function post_request(url, data) {
  try {
    let auth_config = config;
    const res = await axios.post(current_url + url, data, auth_config);
    return res.data;
  } catch (e) {
    return e.response;
  }
}

export async function accept_sse(url, data) {
  try {
    let auth_config = config;
    await axios.post(current_url + url, data, auth_config);
    return true;
  } catch (e) {
    return e.response;
  }
}

// export const auth_post_request =
//   (url, data, dispatch_type) => async (dispatch) => {
//     try {
//       const token = await app
//         .auth()
//         .currentUser.getIdToken(/* forceRefresh */ true);
//       let auth_config = config;
//       auth_config.headers.Authorization = `Bearer ${token}`;

//       if (dispatch_type === CREATE_ITEM || dispatch_type === CREATE_CATEGORY) {
//         auth_config.headers["Content-Type"] = "multipart/form-data";
//       }

//       try {
//         const res = await axios.post(current_url + url, data, auth_config);
//         // console.log(res);

//         dispatch({
//           type: dispatch_type,
//           data: res.data.data,
//         });
//         return res;
//       } catch (e) {
//         console.log(e.response);
//         dispatch({
//           type: SNACKBAR_ERROR,
//           message: "Error with post request",
//         });
//       }
//     } catch (e) {
//       //handle e
//       dispatch({
//         type: SNACKBAR_ERROR,
//         message: "Error with token",
//       });
//     }
//   };

// export const post_request = (url, data, dispatch_type) => async (dispatch) => {
//   try {
//     let auth_config = config;
//     try {
//       const res = await axios.post(current_url + url, data, auth_config);
//       console.log(res);
//       dispatch({
//         type: dispatch_type,
//         data: res.data.data,
//       });
//       return res;
//     } catch (e) {
//       console.log(e);
//       dispatch({
//         type: SNACKBAR_ERROR,
//         message: "Error with get request",
//       });
//     }
//   } catch (e) {
//     //handle e
//     dispatch({
//       type: SNACKBAR_ERROR,
//       message: "Error with token",
//     });
//   }
// };

// export const auth_put_request =
//   (url, data, dispatch_type) => async (dispatch) => {
//     try {
//       const token = await app
//         .auth()
//         .currentUser.getIdToken(/* forceRefresh */ true);
//       let auth_config = config;
//       auth_config.headers.Authorization = `Bearer ${token}`;
//       try {
//         const res = await axios.put(current_url + url, data, auth_config);
//         dispatch({
//           type: dispatch_type,
//           data: res.data.data,
//         });
//         return res;
//       } catch (e) {
//         dispatch({
//           type: SNACKBAR_ERROR,
//           message: "Error with put request",
//         });
//       }
//     } catch (e) {
//       //handle e
//       dispatch({
//         type: SNACKBAR_ERROR,
//         message: "Error with token",
//       });
//     }
//   };

// export const auth_delete_request = (url, dispatch_type) => async (dispatch) => {
//   try {
//     const token = await app
//       .auth()
//       .currentUser.getIdToken(/* forceRefresh */ true);
//     let auth_config = config;
//     auth_config.headers.Authorization = `Bearer ${token}`;
//     try {
//       const res = await axios.delete(current_url + url, auth_config);
//       dispatch({
//         type: dispatch_type,
//         data: res.data.data,
//       });
//       return res;
//     } catch (e) {
//       dispatch({
//         type: SNACKBAR_ERROR,
//         message: "Error with delete request",
//       });
//     }
//   } catch (e) {
//     //handle e
//     dispatch({
//       type: SNACKBAR_ERROR,
//       message: "Error with token",
//     });
//   }
// };
