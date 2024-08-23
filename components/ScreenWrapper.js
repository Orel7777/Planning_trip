import { View, Text, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function ScreenWraper({children}) {
    let statusBarHeight = StatusBar.currentHight? StatusBar.currentHight: Platform.OS=='ios'?30:0;
    
  return (
    <View style={{paddingTop:statusBarHeight}}>
      {
        children
      }
    </View>
  )
}