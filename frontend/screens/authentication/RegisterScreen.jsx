import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = () => {
    navigation.navigate("Validation");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          placeholder="First Name"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          placeholder="Last Name"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          keyboardType="phone-pad"
          placeholder="Phone Number"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
          secureTextEntry={true}
          placeholder="Confirm Password"
        />
        <Pressable onPress={handleRegister}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
