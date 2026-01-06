import { Stack } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
};

export default function SettingsLayout() {
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
        name="DeleteAccount"
        options={{ title: "Delete Account" }}
      />
      <Stack.Screen
        name="ContactSupport"
        options={{ title: "Contact Support" }}
      />
      <Stack.Screen
        name="QualificationUpload"
        options={{ title: "Listener Qualification Upload" }}
      />
      <Stack.Screen
        name="ChangePass"
        options={{ title: "Change Password" }}
      />
    </Stack>
  );
}
