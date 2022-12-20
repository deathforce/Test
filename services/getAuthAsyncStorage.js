import AsyncStorage from "@react-native-async-storage/async-storage";
import { acc } from "react-native-reanimated";

export async function getAuthAsyncStorage() {
  const access_token = await AsyncStorage.getItem("userToken");
  const accessToken = access_token ? JSON.parse(access_token) : null;
  //const user = await AsyncStorage.getItem("userData");
  return {
    access_token: accessToken,
    //user: JSON.parse(user),
  };
}

export async function setAuthAsyncStorage(response) {
  console.log(response.access_token);
  const access_token = JSON.stringify(response.access_token);
  await AsyncStorage.setItem("userToken", access_token);
  //await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem("@userData");
  //await AsyncStorage.removeItem("userToken");
}
