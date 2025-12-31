import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  accent: "#00FFFF", // Neon Cyan
  success: "#00FF9D", // Neon Green
  textPrimary: "#FFFFFF",
  buttonText: "#1A1225",
};

const { width } = Dimensions.get("window");

export default function PayoutRequestedScreen() {
  const router = useRouter();

  const handleReturn = () => {
    // Navigate back to dashboard
    router.replace("../(tabs)/Dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 157, 0.1)", "transparent"]} // Greenish glow for success
        style={styles.backgroundGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      <View style={styles.contentContainer}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle-outline"
            size={120}
            color={THEME.success}
          />
          {/* Inner solid check for emphasis */}
          <View style={styles.iconGlow} />
        </View>

        {/* Title */}
        <Text style={styles.title}>REQUESTED PAYOUT</Text>

        {/* Return Button */}
        <TouchableOpacity
          style={styles.returnButton}
          activeOpacity={0.8}
          onPress={handleReturn}
        >
          <Text style={styles.returnButtonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },

  // Icon
  iconContainer: {
    marginBottom: 40,
    shadowColor: THEME.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20, // Android glow
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.success,
    opacity: 0.1,
    zIndex: -1,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
    textAlign: "center",
    marginBottom: 60,
    letterSpacing: 1,
    textShadowColor: THEME.success,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  // Button
  returnButton: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glassy style like the wireframe
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  returnButtonText: {
    color: THEME.textPrimary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
