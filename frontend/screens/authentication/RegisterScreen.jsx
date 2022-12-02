import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={tw`flex-1 pr-10 pl-10 mt-5`}>
      <View style={tw`items-center mb-5`}>
        <Text style={tw`text-10 mb-2`}>Create an account</Text>
        <Text>Lorem ipsum Lorem ipsum Lorem ipsum Lorem! </Text>
        <Text>Sign up now!</Text>
      </View>

      <View style={tw`flex flex-row justify-between mb-5`}>
        <View style={tw`w-[45%]`}>
          <Input
            inputStyles={"h-11 text-center"}
            placeholder={`First Name`}
            onAction={(text) => console.log(text)}
          />
        </View>
        <View style={tw`w-[45%]`}>
          <Input
            inputStyles={"h-11 text-center"}
            placeholder={`Last Name`}
            onAction={(text) => console.log(text)}
          />
        </View>
      </View>
      <View style={tw`flex flex-column`}>
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Enter Your Email`}
          onAction={(text) => console.log(text)}
        />
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Enter Your Phone Number`}
          onAction={(text) => console.log(text)}
        />
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Enter Your Password`}
          secure={true}
          onAction={(text) => console.log(text)}
        />
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Confirm Password`}
          secure={true}
          onAction={(text) => console.log(text)}
        />
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Address 1`}
          onAction={(text) => console.log(text)}
        />
        <Input
          inputStyles={"h-11 text-center mb-5"}
          placeholder={`Address 2`}
          onAction={(text) => console.log(text)}
        />
        <TouchableOpacity style={tw`flex flex-row justify-center align-center`}>
          <Image source={require("../../assets/wine_glass.png")} />
          <Text style={tw`text-[#640100] mt-12 ml-[-5%]`}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-even items-center mb-5`}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
