import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import React, { useId, useState } from "react";
import ScreenWraper from "../components/ScreenWrapper";
import { colors } from "../teams";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { addDoc } from "firebase/firestore";

export default function AddTripScreen() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      // navigation.navigate("Home");
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId:user.uid
      });
      setLoading(false)
      if(doc && doc.id){
        navigation.goBack();
      }
    } else {
      Alert.alert("Place and Country are required!");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ScreenWraper>
            <View className="flex justify-between mx-4">
              <View>
                <View className="relative mt-5">
                  <View className="absolute top-0 left-0">
                    <BackButton />
                  </View>
                </View>
                <View>
                  <Text className={`${colors.heading} text-xl font-bold text-center`}>Add new trip</Text>
                </View>
                <View className="flex-row justify-center my-3 mt-5 bg-green-300">
                  <Image className="h-72 w-72" source={require("../assets/images/4.png")} />
                </View>
                <View className="space-y-2 mx-2">
                  <Text className={`${colors.heading} text-lg font-bolt`}>Where On Earth?</Text>
                  <TextInput value={place} onChangeText={(value) => setPlace(value)} className="p-4 bg-green-300 rounded-full mb-3" />
                  <Text className={`${colors.heading} text-lg font-bolt`}>Which Country?</Text>
                  <TextInput value={country} onChangeText={(value) => setCountry(value)} className="p-4 bg-green-300 rounded-full mb-3" />
                </View>
              </View>

              <View>
                {loading ? (
                  <Loading />
                ) : (
                  <TouchableOpacity onPress={handleAddTrip} className="my-6 rounded-full p-3 mx-2 bg-green-300">
                    <Text className="text-center text-white text-lg font-bold">Add trip</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScreenWraper>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
