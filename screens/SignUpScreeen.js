import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import ScreenWraper from "../components/ScreenWrapper";
import { colors } from "../teams";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading } from "../redux/slices/user";
import Loading from "../components/Loading";

export default function SignUpScreeen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userLoading} = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleSubmit =async () => {
    if (email && password) {
      // navigation.goBack();  
      // navigation.navigate("Home");
      // await createUserWithEmailAndPassword(auth,email,password)
      try{
        dispatch(setUserLoading(true))
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false))
      }catch(e){
        dispatch(setUserLoading(false))
        Alert.alert(e.massage)
      }
    } else {
      Alert.alert("All fields must be filled!");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ScreenWraper>
            <View className="flex justify-between mx-4">
              <View>
                <View className="relative">
                  <View className="absolute top-0 left-0">
                    <BackButton />
                  </View>
                </View>
                <View>
                  <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign up</Text>
                </View>
                <View className="flex-row justify-center my-3 mt-5 bg-green-300">
                  <Image className="h-80 w-80" source={require("../assets/images/signup.png")} />
                </View>
                <View className="space-y-2 mx-2">
                  <Text className={`${colors.heading} text-lg font-bolt`}>Email:</Text>
                  <TextInput value={email} onChangeText={(value) => setEmail(value)} className="p-4 bg-green-300 rounded-full mb-3" />
                  <Text className={`${colors.heading} text-lg font-bolt`}>Password:</Text>
                  <TextInput value={password} secureTextEntry onChangeText={(value) => setPassword(value)} className="p-4 bg-green-300 rounded-full mb-3" />
                </View>
              </View>

              <View>
              {
                userLoading? (
                  <Loading />
                ):(
                  <TouchableOpacity onPress={handleSubmit} className="my-6 rounded-full p-3 mx-2 bg-green-300">
                  <Text className="text-center text-black text-lg font-bold">Sign up</Text>
                </TouchableOpacity>
                )
                }
             
              </View>
            </View>
          </ScreenWraper>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
