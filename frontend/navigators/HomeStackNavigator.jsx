import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import TableScreen from "../screens/tablescreen/TableScreen";
import DrinkDescription from "../screens/tablescreen/DrinkDescription";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Select a Table"
          component={HomeScreen}
        />
        <Stack.Screen name="Tablescreen" component={TableScreen} />
        <Stack.Screen name="DrinkDescription" component={DrinkDescription} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
