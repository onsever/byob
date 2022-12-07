import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FoodScreen from "./FoodScreen";
import DrinksScreen from "./DrinksScreen";
import tw from "twrnc";
import Colors from "../../utils/Colors";

const Tab = createMaterialTopTabNavigator();

const Tablescreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Tab.Screen name="Foods" component={FoodScreen} />
      <Tab.Screen name="Drinks" component={DrinksScreen} />
    </Tab.Navigator>
  );
};

export default Tablescreen;
