import { Stack } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
};

export default function HomeLayout() {
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
    >
      <Stack.Screen
        name="availability"
        options={{ title: "Set My Availability" }}
      />
      <Stack.Screen
        name="schedule"
        options={{ title: "Edit Today's Schedule" }}
      />
      <Stack.Screen
        name="earnings"
        options={{ title: "My Earnings & Metrics" }}
      />
      <Stack.Screen name="payout" options={{ title: "Payout History" }} />
      <Stack.Screen name="Withdrawals" options={{ title: "Withdrawals" }} />
    </Stack>
  );
}
