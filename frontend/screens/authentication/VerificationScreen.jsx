import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { usePost } from "../../hooks/usePost";

export default function VerificationScreen({ route, navigation }) {
  const { post, loading, result, error, loaded } = usePost();
  const { downloadURL } = route.params;

  console.log("downloadURL", downloadURL);

  // loading is true -> show message
  // loaded -> true | loading - false

  React.useEffect(() => {
    console.log("result", result);
    console.log("error", error);
  }, [result, error]);

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
        }}
        onPress={() => {
          post("auth/id-scan", { downloadURL });
        }}
      >
        Test
      </Text>
    </SafeAreaView>
  );
}

// verified -> show message -> move to tabnavigator -> registration complete
// not verified -> show message -> move to login screen
// in this screen, register to the mongoDB if verification is successful
