import React, { useState, useEffect } from "react";
import { Platform, StatusBar, Image } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./reducers";
import { getAuthAsyncStorage } from "./services/getAuthAsyncStorage";
import Entypo from "@expo/vector-icons/Entypo";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { loggedIn } from "./actions/auth";
import * as Font from "expo-font";

enableScreens();

import Screens from "./navigation/Screens";
import { Images, materialTheme } from "./constants/";

const assetImages = [
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
  Images.Products.Auto,
  Images.Products.Motocycle,
  Images.Products.Watches,
  Images.Products.Makeup,
  Images.Products.Accessories,
  Images.Products.Fragrance,
  Images.Products.BMW,
  Images.Products.Mustang,
  Images.Products["Harley-Davidson"],
];

// cache product images
// products.map(product => assetImages.push(product.image));

// cache categories images
// Object.keys(categories).map(key => {
//   categories[key].map(category => assetImages.push(category.image));
// });

async function loadData() {
  const userStorage = await getAuthAsyncStorage();
  console.log(userStorage);
  if (userStorage.access_token) {
    await store.dispatch(
      loggedIn({
        access_token: userStorage.access_token,
      })
    );
  }
}

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const _loadResourcesAsync = async () => {
    console.log("im here2");
    await loadData();
    return Promise.all([...cacheImages(assetImages)]);
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        console.log("im here");
        await _loadResourcesAsync();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        console.log("im here3");
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  console.log(appIsReady);
  if (!appIsReady) {
    return null;
  } else {
    console.log("im here 5");
    return (
      <Provider store={store}>
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}
