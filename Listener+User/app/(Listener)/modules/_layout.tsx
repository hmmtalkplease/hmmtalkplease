import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const COLORS = {
  bg: "#1A1225",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
};

const _layout = () => {
  return (
    <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.bg,
            },
    
            headerTitleStyle: {
              color: COLORS.textMain,
              fontSize: 18,
              fontWeight: "600",
            },
    
            headerTintColor: COLORS.accent,
            headerShadowVisible: false,
          }}
        />
  )
}

export default _layout