import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { useSelector } from "react-redux";
import { selectAppOpened } from "../redux/features/authSlice";
import AuthStackNavigator from "./AuthStackNavigator";
import OnBoardingScreen from "../screens/onboarding/OnBoardingScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const appOpened = useSelector(selectAppOpened);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!appOpened && (
          <Stack.Screen
            name="OnBoarding"
            component={OnBoardingScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
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
    </NavigationContainer>
  );
}