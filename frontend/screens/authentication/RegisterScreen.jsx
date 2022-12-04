import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";
import { registerInputs } from "../../utils/inputs";
import { registerSchema } from "../../utils/schemas";
import useInput from "../../hooks/useInput";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

// ALlows authentication to complete and return back response
WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "875444786028-vgbm769d4b22ij9qunsvektq48omu8oq.apps.googleusercontent.com",
    iosClientId:
      "875444786028-g62f80vu2pse6h2b2ok7573k5ujhhn4b.apps.googleusercontent.com",
    expoClientId:
      "875444786028-1re8abq8jouu2lvuvavl6p2ahlb7anuc.apps.googleusercontent.com",
  });

  const [accessToken, setAccessToken] = useState("");

  const { formik, validatedInputs } = useInput(
    registerInputs,
    registerSchema,
    async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // actions.resetForm();
    }
  );

  useEffect(() => {
    if (response) {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  const handleRegister = () => {
    formik.handleSubmit();
    navigation.navigate("Validation", { ...formik.values });
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      /* 
      Response of data ---> 
      {
        "email": "bajracharyaroch@gmail.com", 
        "family_name": "Bajracharya", 
        "given_name": "Roch", 
        "id": "112841800121620547368", 
        "locale": "en", 
        "name": "Roch Bajracharya", 
        "picture": "https://lh3.googleusercontent.com/a/ALm5wu29V0uwvVGCV4499C_2hVHGXSiZUygsmCAjRJy9=s96-c", 
        "verified_email": true
    } 
      */
      navigation.navigate("Validation", { ...data, isGoogleSignIn: true });
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 pr-10 pl-10 mt-5`}>
      <View style={tw`items-center mb-5`}>
        <Text style={tw`text-3xl mb-2 font-semibold`}>Create an account</Text>
        <Text>Sign up now!</Text>
      </View>

      <View style={tw`flex flex-row justify-between mb-4`}>
        {validatedInputs.map((input, index) => {
          if (index < 2) {
            return (
              <View key={index} style={tw`w-[48%]`}>
                <Input
                  inputStyles={"h-12"}
                  placeholder={input.placeholder}
                  errorMessage={formik.errors[input.name]}
                  onAction={formik.handleChange(input.name)}
                  blurAction={formik.handleBlur(input.name)}
                  keyboardType={input.keyboardType}
                  title={input.title}
                  secure={input.secure}
                  val={formik.values[input.name]}
                />
              </View>
            );
          }
        })}
      </View>
      <View style={tw`flex flex-col`}>
        {validatedInputs.map((input, index) => {
          if (index > 1) {
            return (
              <Input
                key={index}
                inputStyles={`h-12 ${index === 7 ? "mb-0" : "mb-4"}`}
                placeholder={input.placeholder}
                errorMessage={formik.errors[input.name]}
                onAction={formik.handleChange(input.name)}
                blurAction={formik.handleBlur(input.name)}
                keyboardType={input.keyboardType}
                title={input.title}
                secure={input.secure}
                val={formik.values[input.name]}
              />
            );
          }
        })}

        <TouchableOpacity
          style={tw`flex flex-row justify-center items-center`}
          onPress={handleRegister}
        >
          <Image source={require("../../assets/wine_glass.png")} />
          <Text style={tw`text-[#640100] ml-[-4%]`}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-around items-center mb-5`}>
        <View style={tw`border-b w-[35%] border-[#C5C5C5]`}></View>
        <View style={tw`w-[30%]`}>
          <Text style={tw`text-center text-[#C5C5C5]`}>OR</Text>
        </View>
        <View style={tw`border-b w-[35%] border-[#C5C5C5]`}></View>
      </View>
      <View>
        <TouchableOpacity
          style={tw`flex flex-row bg-[#F7FAFB] h-[11] items-center justify-center rounded-lg mb-5`}
          onPress={() => {
            // navigation.navigate("Validation");
            promptAsync({ showInRecents: true });
          }}
        >
          <Image
            style={tw`mr-5`}
            source={require("../../assets/googleLogo.png")}
          />
          <Text>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row items-center justify-center rounded-lg`}>
        <Text style={tw`mr-2`}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={tw`text-[#640100]`}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
