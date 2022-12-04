import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";
import { loginInputs } from "../../utils/inputs";
import { loginSchema } from "../../utils/schemas";
import useInput from "../../hooks/useInput";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  ANDROID_CLIENT_ID,
  EXPO_CLIENT_ID,
  GOOGLE_FETCH_URL,
  IOS_CLIENT_ID,
} from "../../constants/googleAuth";

// ALlows authentication to complete and return back response
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  const { post, result, loaded, loading, error } = usePost();
  const dispatch = useDispatch();
  const { formik, validatedInputs } = useInput(
    loginInputs,
    loginSchema,
    async (values, actions) => {
      post("auth/login", values);
    }
  );

  const handleLogin = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (loaded) {
      if (error) {
        Alert.alert("Authentication Failed", error.data);
      } else if (result) {
        let data = result.data;
        dispatch(login(data));
      }
    }
  }, [loaded]);

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

  const getUserData = async () => {
    let userInfoResponse = await fetch(GOOGLE_FETCH_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

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
      post("auth/login", { ...data, isGoogleSignIn: true });
    });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            source={require("../../assets/loginBackground.png")}
            style={tw`w-full h-80`}
          />
          <View style={tw`pr-10 pl-10 mt-5`}>
            <View style={tw`items-center mb-5`}>
              <Text style={tw`text-10 mb-2 font-bold`}>Let’s sign you in</Text>
              <Text>Welcome back, You've been missed!!</Text>
            </View>
            <View style={tw`flex flex-col`}>
              {validatedInputs.map((input, index) => {
                return (
                  <Input
                    key={index}
                    inputStyles={`h-12 ${index === 1 ? "mb-0" : "mb-4"}`}
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
              })}

              <TouchableOpacity
                style={tw`flex flex-row justify-center items-center`}
                onPress={handleLogin}
              >
                <Image source={require("../../assets/wine_glass.png")} />
                <Text style={tw`text-[#640100] ml-[-4%]`}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row justify-evenly items-center mb-5`}>
              <View style={tw`border-b w-[35%] border-[#C5C5C5]`}></View>
              <View style={tw`w-[30%]`}>
                <Text style={tw`text-center text-[#C5C5C5]`}>OR</Text>
              </View>
              <View style={tw`border-b w-[35%] border-[#C5C5C5]`}></View>
            </View>
            <View>
              <TouchableOpacity
                style={tw`flex flex-row bg-[#F7FAFB] h-[11] items-center justify-center rounded-lg mb-5`}
                onPress={() => promptAsync({ showInRecents: true })}
              >
                <Image
                  style={tw`mr-5`}
                  source={require("../../assets/googleLogo.png")}
                />
                <Text>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
            <View
              style={tw`flex flex-row items-center justify-center rounded-lg`}
            >
              <Text style={tw`mr-2`}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={tw`text-[#640100]`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
