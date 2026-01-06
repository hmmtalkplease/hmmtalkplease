import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
  chipBg: "rgba(255, 255, 255, 0.05)",
  chipActive: "#00FFFF",
  chipTextActive: "#1A1225",
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const FILTERS = ["All", "Payouts", "Referrals", "Updates"];

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Payout Processed",
    message:
      "Your payment of ₹8200 is processed. Check your bank account within 24 hours.",
    date: "Today",
    read: false,
  },
  {
    id: 2,
    title: "New Referral Signup",
    message: "USER_1234 has signed up using your link. You earned +10 points.",
    date: "Today",
    read: false,
  },
  {
    id: 3,
    title: "System Update",
    message:
      "We have updated our terms of service regarding affiliate commissions.",
    date: "Yesterday",
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] = useState("All");

  const handleMarkAllRead = () => {
    // Logic to mark notifications as read
    console.log("Marking all as read");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>Keep Yourself Updated!</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>Today</Text>

          {NOTIFICATIONS.map((item) => (
            <View
              key={item.id}
              style={[
                styles.notificationCard,
                !item.read && styles.unreadBorder,
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {!item.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>
          ))}

          {/* Mark All as Read Button */}
          <TouchableOpacity
            style={styles.markReadButton}
            onPress={handleMarkAllRead}
          >
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
    paddingHorizontal: 6,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 2,
  },

  // Filters
  filterContainer: {
    marginBottom: 20,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: THEME.chipBg,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  chipActive: {
    backgroundColor: THEME.chipActive,
    borderColor: THEME.chipActive,
  },
  chipText: {
    color: THEME.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextActive: {
    color: THEME.chipTextActive,
    fontWeight: "bold",
  },

  // Notifications List
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 15,
    marginLeft: 5,
  },

  notificationCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  unreadBorder: {
    borderColor: "rgba(0, 255, 255, 0.3)", // Subtle neon border for unread
    backgroundColor: "rgba(37, 29, 48, 0.8)", // Slightly lighter bg
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.accent,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  cardMessage: {
    fontSize: 13,
    color: THEME.textSecondary,
    lineHeight: 20,
  },

  // Mark Read Button
  markReadButton: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  markReadText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
});
