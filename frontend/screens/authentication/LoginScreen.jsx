import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";
import { loginInputs } from "../../utils/inputs";
import { loginSchema } from "../../utils/schemas";
import useInput from "../../hooks/useInput";

export default function LoginScreen({ navigation }) {
  const { formik, validatedInputs } = useInput(
    loginInputs,
    loginSchema,
    async (values, actions) => {
      console.log(values);
    }
  );

  const handleLogin = () => {
    formik.handleSubmit();
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Image
        source={require("../../assets/loginBackground.png")}
        style={tw`w-full h-80`}
      />
      <View style={tw`pr-10 pl-10 mt-5`}>
        <View style={tw`items-center mb-5`}>
          <Text style={tw`text-10 mb-2 text-bold`}>Wine and Dine!</Text>
          <Text>Life's A Party! Are you ready?</Text>
        </View>

        <View style={tw`flex flex-row justify-between mb-5`}></View>
        <View style={tw`flex flex-column`}>
          <Input
            inputStyles={"h-11 text-center mb-5"}
            placeholder={`Enter Your Email`}
            onAction={(text) => console.log(text)}
          />
          <Input
            inputStyles={"h-11 text-center"}
            placeholder={`Enter Your Password`}
            secure={true}
            onAction={(text) => console.log(text)}
          />

          <TouchableOpacity
            style={tw`flex flex-row justify-center align-center`}
          >
            <Image source={require("../../assets/wine_glass.png")} />
            <Text style={tw`text-[#640100] mt-12 ml-[-5%]`}>SIGN IN</Text>
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
      </View>
    </SafeAreaView>
  );
}
