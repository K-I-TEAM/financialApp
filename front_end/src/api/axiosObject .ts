import axios from "axios";

import Auth from "./../store/user/auth";

export const AxiosObject = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
AxiosObject.interceptors.request.use(
  async (config) => {
    try {
      const session = await Auth.currentSession();
      config.headers = {
        "x-access-token": `${session.getIdToken().getJwtToken()}`,
      };
      console.log('token',config.headers);
      
    } catch (err) {
      config.headers = {
        "x-access-token": `${sessionStorage.getItem("id_token")}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
