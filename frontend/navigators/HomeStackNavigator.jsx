import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import TableScreen from "../screens/tablescreen/tablescreen";
import DrinkDescription from "../screens/tablescreen/DrinkDescription";
import CartScreen from "../screens/cart/CartScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "" }}>
      <Stack.Group>
        <Stack.Screen
          name="Select a Table"
          component={HomeScreen}
        />
        <Stack.Screen name="Tablescreen" component={TableScreen} />
        <Stack.Screen name="DrinkDescription" component={DrinkDescription} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
