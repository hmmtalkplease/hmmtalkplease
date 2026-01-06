import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  danger: "#FF453A", // Red for emergency
  dangerBg: "rgba(255, 69, 58, 0.1)", // Subtle red background
  dangerBorder: "rgba(255, 69, 58, 0.3)",
};

export default function ContactSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEmail = () => {
    Linking.openURL("mailto:support@hmmtalk.com").catch(() =>
      Alert.alert("Error", "Could not open email client")
    );
  };

  const handleCall = () => {
    Linking.openURL("tel:18001234567").catch(() =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* In-App Chat Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>In-App Chat</Text>
            <Text style={styles.cardSubtitle}>
              Browse frequently asked questions for quick answers
            </Text>
          </View>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => Alert.alert("Chat", "Opening chat support...")}
          >
            <Text style={styles.outlineButtonText}>Send Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Email Support Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Email Support Form</Text>
            <Text style={styles.cardSubtitle}>
              Access guides, tutorials, and documentation
            </Text>
          </View>
          <TouchableOpacity style={styles.outlineButton} onPress={handleEmail}>
            <Text style={styles.outlineButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Hotline Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: THEME.danger }]}>
              Emergency Hotline
            </Text>
            <Text
              style={[styles.cardSubtitle, { color: "rgba(255, 69, 58, 0.8)" }]}
            >
              For crisis situations requesting immediate assistance{"\n"}
              <Text style={{ fontWeight: "bold" }}>Available 24/7</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleCall}>
            <Text style={styles.emergencyButtonText}>
              Call Emergency Hotline
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Standard Card Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: "center", // Center content
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 13,
    color: THEME.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "85%",
  },

  // Buttons
  outlineButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.textPrimary, // White border like screenshot
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },

  // Emergency Card Styles
  emergencyCard: {
    backgroundColor: THEME.dangerBg,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: THEME.dangerBorder,
    alignItems: "center",
  },
  emergencyButton: {
    width: "100%",
    backgroundColor: THEME.danger,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
