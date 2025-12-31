import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  danger: "#FF453A", // Bright red for buttons
  dangerBg: "rgba(255, 69, 58, 0.1)", // Subtle red background for container
  dangerBorder: "rgba(255, 69, 58, 0.3)",
};

// --- MOCK DATA ---
const MENU_ITEMS = [
  { id: 1, label: "Report a Listener", icon: "alert-circle-outline" },
  { id: 2, label: "Report User Behaviour", icon: "account-alert-outline" },
  { id: 3, label: "Safety Guidelines", icon: "shield-check-outline" },
  { id: 4, label: "Crisis Resources", icon: "lifebuoy" },
];

const SAFETY_INFO = [
  {
    title: "Automated Content Monitoring",
    desc: "Our AI powered system detects inappropriate content threats and exploitation attempts in real-time to keep you safe.",
  },
  {
    title: "Zero Tolerance Policy",
    desc: "Sexual content, harassment, and abuse result in immediate account termination. We prioritize your safety.",
  },
  {
    title: "Emergency Support",
    desc: "If you’re in crisis our system will connect you to professional mental health services immediately.",
  },
];

const HOTLINES = [
  { title: "National Mental Health Helpline", number: "1800-599-0019" },
  { title: "Vandrevala Foundation", number: "1860-2662-345" },
  { title: "iCall Psychosocial Helpline", number: "9152987821" },
];

export default function ModerationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() =>
      Alert.alert("Error", "Unable to open dialer")
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
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="shield" size={20} color={THEME.textPrimary} />
            <Text style={styles.headerTitle}>Moderation & Safety</Text>
          </View>
          <Text style={styles.headerSubtitle}>Stay safe and secure</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Buttons */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={THEME.textPrimary}
                />
                <Text style={styles.menuText}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Platform Safety Info */}
        <Text style={styles.sectionTitle}>Platform Safety</Text>
        <View style={styles.safetyInfoContainer}>
          {SAFETY_INFO.map((info, index) => (
            <View key={index} style={styles.infoCard}>
              <Text style={styles.infoTitle}>{info.title}</Text>
              <Text style={styles.infoDesc}>{info.desc}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Hotlines Section */}
        <View style={styles.emergencyContainer}>
          <View style={styles.emergencyHeader}>
            <MaterialCommunityIcons
              name="alert-decagram-outline"
              size={22}
              color={THEME.danger}
            />
            <Text
              style={[
                styles.sectionTitle,
                { marginBottom: 0, color: THEME.danger },
              ]}
            >
              Emergency Hotlines
            </Text>
          </View>

          <View style={styles.hotlineButtonsContainer}>
            {HOTLINES.map((hotline, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hotlineButton}
                onPress={() => handleCall(hotline.number)}
              >
                <View>
                  <Text style={styles.hotlineTitle}>{hotline.title}</Text>
                  <Text style={styles.hotlineNumber}>{hotline.number}</Text>
                </View>
                <MaterialCommunityIcons name="phone" size={20} color="white" />
              </TouchableOpacity>
            ))}
          </View>
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
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 2,
  },

  // Menu Items
  menuContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: THEME.textPrimary,
  },

  // Platform Safety
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 15,
  },
  safetyInfoContainer: {
    gap: 15,
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 8,
  },
  infoDesc: {
    fontSize: 13,
    color: THEME.textSecondary,
    lineHeight: 20,
  },

  // Emergency Section
  emergencyContainer: {
    backgroundColor: THEME.dangerBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.dangerBorder,
    marginBottom: 20,
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  hotlineButtonsContainer: {
    gap: 12,
  },
  hotlineButton: {
    backgroundColor: THEME.danger,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  hotlineTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  hotlineNumber: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
  },
});
