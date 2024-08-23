import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import { colors } from '../teams';
export default function BackButton() {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <ChevronLeftIcon  className="bg-green-300 rounded-full h-8 w-8" size={40} color={colors.button}/>
    </TouchableOpacity>
  )
}