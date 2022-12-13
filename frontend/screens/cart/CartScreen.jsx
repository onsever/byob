import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CurrentOrders from "./CurrentOrders";
import OrderHistory from "./OrderHistory";
import Colors from "../../utils/Colors";

const Tab = createMaterialTopTabNavigator();

const TableScreen = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Tab.Screen name="Current Orders" component={CurrentOrders} />
      <Tab.Screen name="Order History" component={OrderHistory} />
    </Tab.Navigator>
  );
};

export default TableScreen;
