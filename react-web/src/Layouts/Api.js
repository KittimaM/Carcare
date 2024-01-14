import axios from "axios";

const token = localStorage.getItem("token");

const postApi = async (url, jsonData, isUseToken = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isUseToken) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(url, jsonData, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// const getApi = async (url, token = null) => {
//   try {
//     let headers = {};
//     if (token) {
//       headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     const response = await axios.post(url, { headers });
//     const { status, msg } = response.data;
//     if (status == "SUCCESS") {
//       return msg;
//     } else {
//       console.log("status : ", status, " , msg : ", msg);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export const GetPermission = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/permission",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { status, msg } = response.data;
    if (status == "SUCCESS") {
      return msg;
    } else {
      console.log(msg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const GetAllRole = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/role/all"
    );
    const { status, msg } = response.data;
    if (status == "SUCCESS") {
      return msg;
    } else {
      console.log(msg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const PostAddRole = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/role", jsonData);
};

export const PostAddStaffUser = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/user/add", jsonData);
};

export const PostLogin = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/login", jsonData);
};
