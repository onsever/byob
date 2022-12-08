import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import TableScreen from "../screens/tablescreen/TableScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Select a Table"
          component={HomeScreen}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen name="Tablescreen" component={TableScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
