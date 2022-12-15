import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { logout } from "../../redux/features/authSlice";
import { getData } from "../../utils/asyncStorage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const user = await getData("user");
      console.log("user", user);
      setUser(user);
    }

    getUser();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center px-6 relative`}>
      <TouchableOpacity>
        <Ionicons name="person-circle" size={120} color="#640100" />
      </TouchableOpacity>
      {user ? (
        <View style={tw`mb-5`}>
          <Text style={tw`font-bold text-5`}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}

      <View
        style={tw`flex flex-row bg-white px-10 py-7 justify-between mx-6 mb-2 rounded-lg shadow-md w-full`}
      >
        <TouchableOpacity
          style={tw`flex flex-col items-center`}
          onPress={() => {
            navigation.navigate("AccountDetailsScreen", {
              user: user,
            });
          }}
        >
          <Image
            source={require("../../assets/viewAccount.png")}
            style={tw`w-7 h-7 mb-3`}
          />
          <Text>Your Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex items-center`}
          onPress={() => {
            navigation.navigate("AccountOrderHistoryScreen");
          }}
        >
          <Image
            source={require("../../assets/orderHistory.png")}
            style={tw`w-7 h-7 mb-3`}
          />
          <Text>Order History</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`absolute bottom-2 right-2`}>
        
        <TouchableOpacity
          style={tw` bg-[#640100] rounded-full p-4`}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Logout",
                style: "destructive",
                onPress: () => {
                  dispatch(logout()), navigation.replace("Auth");
                },
              },
              {
                text: "Cancel",
              },
            ]);
          }}
        >
          {logout().loading ? (
            <ActivityIndicator />
          ) : (
            <Ionicons name="log-out-outline" size={30} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
