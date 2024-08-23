import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddTripScreen from "../screens/AddTripScreen";
import AddExpensiveScreen from "../screens/AddExpensiveScreen";
import TripExpensesScreen from "../screens/TripExpensesScreen";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreeen from "../screens/SignUpScreeen";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUser } from "../redux/slices/user";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  onAuthStateChanged(auth,u=>{
    console.log('got user',u)
    dispatch(setUser(u))
  })

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddExpansive" component={AddExpensiveScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TripExpensesScreen" component={TripExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="SignIn" component={SignInScreen} />
          <Stack.Screen options={{ headerShown: false,presentation: "modal" }} name="SignUp" component={SignUpScreeen} />
          <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
