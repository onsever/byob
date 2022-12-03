import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";
import { registerInputs } from "../../utils/inputs";
import { registerSchema } from "../../utils/schemas";
import useInput from "../../hooks/useInput";

export default function RegisterScreen({ navigation }) {
  const { formik, validatedInputs } = useInput(
    registerInputs,
    registerSchema,
    async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // actions.resetForm();
    }
  );

  const handleRegister = () => {
    formik.handleSubmit();
    navigation.navigate("Validation", { ...formik.values });
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
            navigation.navigate("Validation");
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
