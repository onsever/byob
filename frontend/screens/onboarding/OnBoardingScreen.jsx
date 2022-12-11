import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import tw from "twrnc";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { getData } from "../../utils/asyncStorage";

export default function OnBoardingScreen({ navigation }) {
  const [sound, setSound] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      const user = await getData("user");
      if (user) {
        dispatch(login(user));
      }
      navigate(user);
    }
    fetchData();
  }, []);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Beer.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    // write your code here, it's like componentWillMount
    playSound();
  }, [1]);

  const navigate = (userLoggedIn) => {
    if (userLoggedIn) navigation.replace("Tab");
    else navigation.navigate("Auth");
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <Image
        source={require("../../assets/Logo_lightMode.png")}
        style={{ width: 350, height: 350 }}
      />
    </SafeAreaView>
  );
}
