import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ScreenWraper from "../components/ScreenWrapper";
import { colors } from "../teams";
import randomImage from "../assets/images/randomImage";
import EmptyList from "../components/EmptyList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import ExpenseCard from "../components/ExpenseCard";
import { getDocs, query, where } from "firebase/firestore";
import { expensesRef } from "../config/firebase";
import user from "../redux/slices/user";

const items = [
  {
    id: 1,
    title: "ate sandwitch",
    amount: 4,
    category: "food"
  },
  {
    id: 2,
    title: "bought a t-shirt",
    amount: 45,
    category: "shopping"
  },
  {
    id: 3,
    title: "watched a football",
    amount: 77,
    category: "entertainment"
  }
];

export default function TripExpensesScreen(props) {
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();
  const fetchExpenses = async () => {
    const q = query(expensesRef, where("tripId", "==", id));
    const quarySnapshot = await getDocs(q);
    let data = [];
    quarySnapshot.forEach((doc) => {
      // console.log('documement',doc.data())
      data.push({ ...doc.data(), id: doc.id });
    });
    setExpenses(data);
  };
  useLayoutEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);
  return (
    <ScreenWraper className="flex-1">
      <View className="space-y-3">
        <View className="relative mt-5">
          <View className="absolute top-2 left-0">
            <BackButton />
          </View>
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
            <Text className={`${colors.heading} text-xs  text-center`}>{country}</Text>
          </View>
        </View>
        <View className="flex-row justify-center item-center bg-black rounded-xl mb-4">
          <Image source={require("../assets/images/7.png")} className="w-80 h-80" />
        </View>
        <View>
          <View className="flex-row justify-between items-center space-y-3 p-3">
            <Text className={`${colors.heading} font-bolt text-xl`}>Expenses</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddExpansive",{id,place,country})} className="p-2 px-3 bg-green-300 border-gray-200 rounded-full">
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 430 }}>
            <FlatList
              data={expenses}
              ListEmptyComponent={<EmptyList massege={"you haven't recorded any Expenses yet"} />}
              showsVerticalScrosllIndicator={false}
              keyExtractor={(item) => item.id}
              className="mx-6"
              renderItem={({ item }) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWraper>
  );
}
