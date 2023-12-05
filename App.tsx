import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import GradientDiv from "./src/components/reusable/GradientDiv";

import { navigationRef } from "./src/utils/RootNavRef";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navbar from "./src/components/reusable/Navbar";
import useGetPageData from "./src/hooks/useGetPageData";

import LoginForm from "./src/components/reusable/LoginForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./src/components/SignupForm";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./src/utils/navigationTheme";
import HouseRoll from "./src/components/HouseRoll";
import { PaperProvider } from "react-native-paper";
import LandlordPage from "./src/components/LandlordPage";
import AddForm from "./src/components/AddForm";
import Signout from "./src/components/Signout";
import { jwtDecode } from "jwt-decode";
import * as SecureStorage from "expo-secure-store";
import HomeViewBody from "./src/components/HomeViewBody";
import Toast from "react-native-toast-message";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  _id: string;
}

const App = () => {
  const { houses, setHouses, searchQuery, handleSearchChange } =
    useGetPageData();

  useEffect(() => {
    SecureStorage.getItemAsync("token")
      .then((jwt: any) => {
        const user: User = jwtDecode(jwt);
        setUser(user);
        console.log(user);
      })
      .catch((ex) => {});
    Toast.show({
      position: "top",
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
      topOffset: 200,
    });
  }, []);

  const [user, setUser] = useState<User>();
  console.log(user);

  const Stack = createNativeStackNavigator();

  const HouseRollScreen = () => {
    return <HouseRoll setHouses={setHouses} user={user} houses={houses} />;
  };

  const LandlordScreen = () => {
    return <LandlordPage setHouses={setHouses} user={user} houses={houses} />;
  };
  const SignupScreen = () => {
    return <Signup setUser={setUser} user={user} />;
  };
  const AddFormScreen = () => {
    return <AddForm setUser={setUser} setHouses={setHouses} user={user} />;
  };
  const LoginFormScreen = () => {
    return <LoginForm user={user} setUser={setUser} />;
  };
  const SignoutFormScreen = () => {
    return <Signout user={user} setUser={setUser} />;
  };
  const HomeViewScreen = () => {
    return <HomeViewBody houses={houses} />;
  };

  return (
    <PaperProvider>
      <SafeAreaProvider style={{ backgroundColor: "#000021" }}>
        <>
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <Toast />
            <Navbar
              user={user}
              houses={houses}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="home" component={HouseRollScreen} />
              <Stack.Screen name="login" component={LoginFormScreen} />
              <Stack.Screen name="signup" component={SignupScreen} />
              <Stack.Screen name="my-assets" component={LandlordScreen} />
              <Stack.Screen name="add" component={AddFormScreen} />
              <Stack.Screen name="signout" component={SignoutFormScreen} />
              <Stack.Screen name="homeView" component={HomeViewScreen} />
            </Stack.Navigator>
          </NavigationContainer>

          {/* <FormTextInput value={"augah"} /> */}
          {/* <FormText route="route" text="text" linkText="God" /> */}
          {/* <FormRadioButton /> */}
          {/* <FormButton /> */}
        </>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
