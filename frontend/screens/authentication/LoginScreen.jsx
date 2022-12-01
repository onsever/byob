import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <Text style={tw`bg-red-500`}>LoginScreen</Text>
    </SafeAreaView>
  );
}
