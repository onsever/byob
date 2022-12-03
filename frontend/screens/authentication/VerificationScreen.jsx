import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { usePost } from "../../hooks/usePost";
import tw from "twrnc";

export default function VerificationScreen({ route, navigation }) {
  const { post, loading, result, error, loaded } = usePost();
  const { userObj, downloadURL } = route.params;
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const [userBirthDate, setUserBirthDate] = React.useState(null);

  const handleContinue = () => {
    // Move to TabNavigator (user will be stored in MongoDB)
    // Update the global state using Redux.
    // If user is not verified, go to the Login screen.
    console.log("Continue");
  };

  const handleRegistration = () => {
    if (!userObj) return;

    const userAddress = userObj.addressOne + " " + userObj.addressTwo;
    const newUserObj = {
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      password: userObj.password,
      address: userAddress,
      phone: userObj.phone,
    };

    return newUserObj;
  };

  React.useEffect(() => {
    post("auth/register", {
      downloadURL:
        "https://firebasestorage.googleapis.com/v0/b/byob-36558.appspot.com/o/images%2F155002FE-C580-43CF-8249-46F933ED16AF.jpg?alt=media&token=54bb26c5-3f28-4f9d-8e8b-53e423056050",
      userObj: handleRegistration(),
    });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log("Error on verification: ", error);
      }
      if (result) {
        setIsUserVerified(result.data.isAdult);
        console.log(result.data);
      }
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`w-full h-full items-center justify-center`}>
      {loading && !loaded ? (
        <>
          <ActivityIndicator size="large" color="black" />
        </>
      ) : (
        <>
          <Image
            source={
              isUserVerified
                ? require("../../assets/welcome.png")
                : require("../../assets/goodbye.png")
            }
            style={tw`w-full h-1/2 mt-4`}
          />
          <View style={tw`w-full h-1/2 items-center justify-start px-4`}>
            <Text style={tw`text-2xl mt-5 font-semibold`}>
              {isUserVerified ? "Welcome to the app!" : "Hmm... Your age is..."}
            </Text>
            <Text style={tw`text-xl mt-5 text-center`}>
              {isUserVerified
                ? "We are glad to have you here. Your account is now verified. You can now start using the app."
                : "To be honest, you are not old enough to use this app. Please come back when you are 18. :)"}
            </Text>
            <TouchableOpacity
              style={tw`bg-[#640100] mt-5 w-full h-12 items-center justify-center rounded-md`}
              onPress={handleContinue}
            >
              <Text style={tw`text-white text-xl font-semibold`}>Continue</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
