import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Splash" />
      <Stack.Screen name="(Listener)/(tabs)" />
      <Stack.Screen name="(User)/(tabs)" />
      <Stack.Screen name="(Auth)/Login" />
      <Stack.Screen name="(Auth)/(SignUp)/Register" />
    </Stack>
  );
}
