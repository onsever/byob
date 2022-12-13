import React from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { useFetch } from "../../hooks/useFetch";

export default function AccountOrderHistoryScreen({ navigation }) {
  const { loading, result, error, loaded, fetch } = useFetch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Order History",
    });
  }, []);

  React.useEffect(() => {
    fetch("table/all");
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        Alert.alert("Error", error);
      }
      if (result) {
        console.log(result);
      }
    }
  }, [loaded]);

  return (
    <View>{loading && <ActivityIndicator size="large" color="black" />}</View>
  );
}
