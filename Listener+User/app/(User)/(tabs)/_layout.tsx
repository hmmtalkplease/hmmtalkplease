import { Tabs } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00FFFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 1)",

        headerStyle: {
          backgroundColor: "#1A1225",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: "600",
        },
        headerTintColor: "#00FFFF",

        tabBarStyle: {
          backgroundColor: "#1A1225",
          borderTopWidth: 0,

          height: 90,

          paddingTop: 15,

          paddingBottom: 30,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Companion"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={26}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Sessions"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-today-outline"
              size={26}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Community"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
