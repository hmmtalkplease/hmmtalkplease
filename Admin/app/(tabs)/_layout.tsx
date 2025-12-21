import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
// Thematic Color Constants
const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textSecondary: "rgba(255, 255, 255, 0.4)",
};

const Tabs = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,

        // --- Fix the White Flash ---
        // Sets the background behind all screens in the tab stack

        // --- Global Header Styling ---
        headerStyle: {
          backgroundColor: COLORS.bg,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: "600",
        },
        headerTintColor: COLORS.accent,

        // --- Thematic Tab Bar Styling ---
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          // Raised effect via padding
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Index"
        component={require("./Dashboard").default}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="User Management"
        component={require("../Usr_Management/User").default}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-supervisor"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
