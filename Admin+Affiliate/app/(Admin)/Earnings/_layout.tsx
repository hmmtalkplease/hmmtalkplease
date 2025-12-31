import { Stack } from "expo-router";
import { StatusBar } from "react-native";

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225", // Deep Purple background
  accent: "#00FFFF", // Neon Cyan accent
  textMain: "#FFFFFF",
};

const ReportsLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.bg }, // Prevents white flash

          // --- Fixed Header Configuration ---
          headerStyle: {
            backgroundColor: COLORS.bg,
            // If TS still complains here, you can cast as ViewStyle:
            // ...( { backgroundColor: COLORS.bg } as ViewStyle )
          },
          // This is the standard way to remove the bottom border/shadow in TS
          headerShadowVisible: false,

          headerTitleStyle: {
            color: COLORS.textMain,
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: COLORS.accent, // Tints icons to Neon Cyan
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Payments"
          options={{
            title: "Payment History",
          }}
        />
      </Stack>
    </>
  );
};

export default ReportsLayout;
