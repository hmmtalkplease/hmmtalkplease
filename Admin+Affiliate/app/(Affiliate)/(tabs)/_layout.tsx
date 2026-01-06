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
        name="Dashboard"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Performance"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-box-outline"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="Payouts"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="currency-rupee"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Support"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-question-outline"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
     
    </Tabs>
  );
}
