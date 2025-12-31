import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  buttonText: "#1A1225",
};

const { width } = Dimensions.get("window");

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.contentContainer}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            {/* Using a robot icon to match the vibe of the original screenshot */}
            <MaterialCommunityIcons
              name="robot-happy-outline"
              size={50}
              color={THEME.buttonText}
            />
          </View>

          <Text style={styles.title}>Welcome to Hmm Talk!</Text>
          <Text style={styles.subtitle}>Anonymous. Safe. Judgement-free</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Feather name="lock" size={20} color={THEME.accent} />
            </View>
            <Text style={styles.featureText}>No email required</Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Feather name="user" size={20} color={THEME.accent} />
            </View>
            <Text style={styles.featureText}>Choose any pseudonym</Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Feather name="shield" size={20} color={THEME.accent} />
            </View>
            <Text style={styles.featureText}>Complete privacy</Text>
          </View>
        </View>

        {/* Spacer to push button to bottom area */}
        <View style={{ flex: 1 }} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.push("/(Auth)/(SignUp)/Register")}
          >
            <Text style={styles.buttonText}>Let's get started!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push("/(Auth)/Login")}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },

  // Logo Section
  logoSection: {
    alignItems: "center",
    marginTop: 60, // Push down from top
    marginBottom: 50,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24, // Squircle shape like screenshot
    backgroundColor: THEME.accent, // Neon Cyan background
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    // Add a glow effect
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
    textAlign: "center",
  },

  // Features Section
  featuresContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    // We center the items horizontally in the row to match the visual style of the screenshot
    // or we can align left. The screenshot seems centered-ish. Let's align left with an offset.
    justifyContent: "flex-start",
    paddingLeft: 40,
  },
  iconBox: {
    width: 32,
    alignItems: "center", // Center icon in its box
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: THEME.textSecondary,
  },

  // Bottom Section
  bottomSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  primaryButton: {
    width: "80%",
    height: 56,
    backgroundColor: THEME.accent,
    borderRadius: 28, // Pill shape
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    padding: 10,
  },
  loginText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  loginTextBold: {
    color: THEME.textPrimary,
    fontWeight: "bold",
  },
});
