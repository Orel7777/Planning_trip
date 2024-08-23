import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWraper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation()
  return (
    <ScreenWraper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image source={require("../assets/images/welcome.gif")} className="w-96 h-96 shadow bg-green-200" />
        </View>
        <View>
          <Text className={`text-center font-bold text-4xl p-3`}>Expensify</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} className="shadow p-3 rounded-full">
            <Text className="text-center bg-green-200 text-lg font-bold p-3">Sing in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} className="shadow p-3 rounded-full">
            <Text className="text-center bg-green-200 text-lg font-bold p-2">Sing Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWraper>
  );
}
