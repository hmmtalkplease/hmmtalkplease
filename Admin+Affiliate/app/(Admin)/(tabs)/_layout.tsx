import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

// Thematic Color Constants
const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textSecondary: "rgba(255, 255, 255, 0.4)",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,

        // --- Fix the White Flash ---
        // This ensures the container background matches your theme

        // --- Global Header Styling ---
        headerStyle: {
          backgroundColor: COLORS.bg,
          borderBottomWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
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
          elevation: 10,
          shadowOpacity: 0,
          height: Platform.OS === "ios" ? 90 : 80,
          paddingBottom: Platform.OS === "ios" ? 30 : 20,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Dashboard" // Points to index.tsx (Dashboard)
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
        name="User"
        options={{
          title: "User Management",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Listener"
        options={{
          title: "Listener Management",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="headphones" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Earnings"
        options={{
          title: "Earnings and Payments",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="currency-rupee"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Stats"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
