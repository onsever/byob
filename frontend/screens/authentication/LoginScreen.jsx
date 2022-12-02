import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text>Register</Text>
      </Pressable>
    </SafeAreaView>
  );
}
