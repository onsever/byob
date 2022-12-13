import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { usePost } from "../../hooks/usePost";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";

export default function VerificationScreen({ route, navigation }) {
  const { post, loading, result, error, loaded } = usePost();
  const { userObj, downloadURL } = route.params;
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const dispatch = useDispatch();

  const handleContinue = () => {
    // Move to TabNavigator (user will be stored in MongoDB)
    // Update the global state using Redux.
    // If user is not verified, go to the Login screen.
    if (isUserVerified) {
      let data = result.data;
      dispatch(login(data));
      navigation.replace("Tab");
    } else {
      navigation.replace("Login");
    }
  };

  const handleRegistration = () => {
    if (!userObj) return;

    if (userObj.isGoogleSignIn) return userObj;

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
    // URL For Testing - https://firebasestorage.googleapis.com/v0/b/byob-36558.appspot.com/o/images%2Fnisha.jpeg?alt=media&token=ec7dfbcd-db10-4d2e-9b90-32450b2bf8e0
    post("auth/user/register", {
      downloadURL: downloadURL,
      userObj: handleRegistration(),
    });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        Alert.alert("Error", error.data);
        console.log("Error: ", error);
        navigation.replace("Login");
      }
      if (result) {
        setIsUserVerified(result.data.isAdult);
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
