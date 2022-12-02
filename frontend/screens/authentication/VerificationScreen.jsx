import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { usePost } from "../../hooks/usePost";

export default function VerificationScreen({ navigation, downloadURL }) {
  const { post, loading, result, error, loaded } = usePost();

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
        }}
        onPress={() => {
          const url =
            "https://firebasestorage.googleapis.com/v0/b/byob-36558.appspot.com/o/images%2Froch.jpeg?alt=media&token=da9c5a75-27c8-4236-a4b4-c9d651032513";
          post("auth/id-scan", { url });
        }}
      >
        Test
      </Text>
    </SafeAreaView>
  );
}

/*
 React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log(error);
      }
      if (result) {
        console.log(result);
      }
    }
  }, [loaded]);
*/
