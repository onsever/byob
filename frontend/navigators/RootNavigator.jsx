import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../redux/features/authSlice";
import { getData } from "../utils/asyncStorage";
import AuthStackNavigator from "./AuthStackNavigator";
import OnBoardingScreen from "../screens/onboarding/OnBoardingScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // const userLoggedIn = useSelector(selectUser);
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const user = await getData("user");
  //     if (user) dispatch(login(user));
  //   }
  //   fetchData();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* {userLoggedIn ? <TabNavigator /> : <AuthStackNavigator />} */}
    </NavigationContainer>
  );
}
