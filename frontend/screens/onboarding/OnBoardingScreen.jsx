import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoardingScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>OnBoardingScreen</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
