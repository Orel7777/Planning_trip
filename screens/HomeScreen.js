import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ScreenWraper from "../components/ScreenWrapper";
import { colors } from "../teams";
import randomImage from "../assets/images/randomImage";
import EmptyList from "../components/EmptyList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";

const items = [
  {
    id: 1,
    place: "New york",
    country: "Usa"
  },
  {
    id: 2,
    place: "Madrid",
    country: "Spain"
  },
  {
    id: 3,
    place: "Paris",
    country: "French"
  },
  {
    id: 4,
    place: "Amsterdam",
    country: "Netherlands"
  },
  {
    id: 5,
    place: "Dubai",
    country: "United Arab Emirates"
  },
  {
    id: 6,
    place: "Belgium",
    country: "Brussels"
  },
  {
    id: 7,
    place: "Argentina",
    country: "Buenos Aires"
  },
  {
    id: 8,
    place: "Rome",
    country: "Italy"
  }
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();
  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", user.uid));
    const quarySnapshot = await getDocs(q);
    let data = [];
    quarySnapshot.forEach((doc) => {
      // console.log('documement',doc.data())
      data.push({ ...doc.data(), id: doc.id });
    });
    setTrips(data);
  };
  useLayoutEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <ScreenWraper className="flex-1">
      <View className="flex-row justify-between items-center mt-5 p-3">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-green-300 border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center item-center bg-green-300 rounded-xl mx-4 mb-4">
        <Image source={require("../assets/images/banner.png")} className="w-60 h-60" />
      </View>
      <View className="flex-row justify-between items-center space-y-3 p-3">
        <Text className={`${colors.heading} font-bolt text-xl`}>Last trips</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddTrip")} className="p-2 px-3 bg-green-300 border-gray-200 rounded-full">
          <Text className={colors.heading}>Add new trip</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 430 }}>
        <FlatList
          data={trips}
          ListEmptyComponent={<EmptyList massege={"you haven't recorded any trips yet"} />}
          numColumns={2}
          showsVerticalScrosllIndicator={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between"
          }}
          className="mx-6"
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("TripExpensesScreen", { ...item })}>
                <View className="bg-green-300 p-3 rounded-2xl mb-3 shadow-sm">
                  <Image source={randomImage()} className="w-36 h-36 mb-2" />
                  <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                  <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScreenWraper>
  );
}
