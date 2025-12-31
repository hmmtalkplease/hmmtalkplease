import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(Admin)/(tabs)" />
      <Stack.Screen name="(Affiliate)/(tabs)" />
    </Stack>
  );
}
