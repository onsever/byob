import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import Tablescreen from "../screens/tablescreen/tablescreen";

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
        <Stack.Screen name="Tablescreen" component={Tablescreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
