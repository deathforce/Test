import {
  PROJECT_GET,
  PROJECT_POST,
  PROJECT_POST_ERR,
  PROJECT_GET_ERR,
} from "../constants/projects";
import { userService } from "../services/userService";

export const getProject = (projectData) => ({
  type: PROJECT_GET,
  payload: projectData,
});

export const postProject = (projectData) => ({
  type: PROJECT_POST,
  payload: projectData,
});

export const errorPost = (errorMessage) => ({
  type: PROJECT_POST_ERR,
  payload: errorMessage,
});
export const errorGet = (errorMessage) => ({
  type: PROJECT_GET_ERR,
  payload: errorMessage,
});

export const getProject = (projectId) => (dispatch) => {
  console.log("im here ");
  dispatch(loggingIn(true));
  userService
    .login(username, password)
    .then(async (res) => {
      await dispatch(loggedIn(res.data));
      //await navigate("Home");
    })
    .catch((err) => {
      dispatch(errorLogIn("Wrong username or password"));
    })
    .finally(() => {
      dispatch(loggingIn(false));
    });
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));
  await userService
    .logout(getState)
    .then((res) => {
      dispatch(loggedOut());
    })
    .catch((err) => {
      dispatch(errorLogOut("Error logging out."));
    })
    .finally(() => {
      dispatch(loggingOut(false));
    });
};
