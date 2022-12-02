import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

export default function ProgressIndicator({ progress }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.text}>Uploading: {progress.toFixed(2)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, color: "black", marginTop: 20 },
});
