import React from "react";
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
  success: "#00FF9D", // Neon Green
  processing: "#FFD700", // Gold
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225", // Dark text for neon buttons
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const ALL_PAYOUTS = [
  {
    id: 1,
    amount: "₹18,450",
    date: "Nov, 18 2025",
    status: "Processing",
    color: THEME.processing,
  },
  {
    id: 2,
    amount: "₹15,230",
    date: "Nov, 15 2025",
    status: "Completed",
    color: THEME.success,
  },
  {
    id: 3,
    amount: "₹18,450",
    date: "Oct, 18 2025",
    status: "Completed",
    color: THEME.success,
  },
  {
    id: 4,
    amount: "₹15,230",
    date: "Oct, 15 2025",
    status: "Completed",
    color: THEME.success,
  },
  {
    id: 5,
    amount: "₹15,230",
    date: "Sep, 15 2025",
    status: "Completed",
    color: THEME.success,
  },
];

const PENDING_PAYOUTS = [
  {
    id: 101,
    amount: "₹18,450",
    date: "Nov, 18 2025",
    status: "Processing",
    color: THEME.processing,
  },
];

export default function PayoutHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header - Reverted to plain style */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Payout History</Text>
          <Text style={styles.headerSubtitle}>Manage Your Earnings</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 30 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* All Payouts Section */}
        <Text style={styles.sectionLabel}>All Payouts</Text>
        <View style={styles.listCard}>
          {ALL_PAYOUTS.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.payoutRow,
                index === ALL_PAYOUTS.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View
                style={[styles.statusBadge, { backgroundColor: item.color }]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pending Payouts Section */}
        <Text style={styles.sectionLabel}>Pending Payouts</Text>
        <View style={styles.listCard}>
          {PENDING_PAYOUTS.map((item, index) => (
            <View
              key={item.id}
              style={[styles.payoutRow, { borderBottomWidth: 0 }]}
            >
              <View>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View
                style={[styles.statusBadge, { backgroundColor: item.color }]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Request Payout Button - NEON STYLE */}
        <TouchableOpacity style={styles.requestButton} activeOpacity={0.8} onPress={()=>router.push("./Success")}>
          <Text style={styles.requestButtonText}>REQUEST PAYOUT</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },

  // Section Labels
  sectionLabel: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 5,
    fontWeight: "500",
  },

  // List Card
  listCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },

  // Rows
  payoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "bold",
  },

  // Request Button - UPDATED TO NEON
  requestButton: {
    backgroundColor: THEME.accent, // Neon Cyan Background
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    // Glow effect
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  requestButtonText: {
    color: THEME.buttonText, // Dark text
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
});
