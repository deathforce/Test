import axios from "axios";
import { API_URL } from "../config/constants";
import {
  resetAuthAsyncStorage,
  setAuthAsyncStorage,
} from "./getAuthAsyncStorage";

function getProject(projectId) {
  console.log(`${API_URL}/api/auth/login`);
  return new Promise((resolve, reject) => {
    axios
      .post(`http://192.168.4.90:6500/api/auth/login`, {
        email: username,
        password,
      })
      .then(async (response) => {
        try {
          console.log(response.data);
          await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

async function logout(getState) {
  return new Promise((resolve, reject) => {
    const currentState = getState();
    const { token } = currentState.auth;
    axios
      .get(`${API_URL}/logout`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        resolve(response);
        await resetAuthAsyncStorage();
      })
      .catch((err) => reject(err));
  });
}

export const userService = {
  login,
  logout,
};
