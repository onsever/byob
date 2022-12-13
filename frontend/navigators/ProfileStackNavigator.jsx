import ProfileScreen from "../screens/profile/ProfileScreen";
import AccountDetailsScreen from "../screens/profile/AccountDetailsScreen";
import AccountOrderHistoryScreen from "../screens/profile/AccountOrderHistoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AccountDetailsScreen"
          component={AccountDetailsScreen}
        />
        <Stack.Screen
          name="AccountOrderHistoryScreen"
          component={AccountOrderHistoryScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
