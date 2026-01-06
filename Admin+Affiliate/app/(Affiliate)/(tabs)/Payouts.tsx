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
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF", // Neon Cyan
  success: "#00FF9D", // Neon Green
  processing: "#FFD700", // Gold/Yellow
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225", // Dark text for neon buttons
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const PAYOUT_HISTORY = [
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
];

export default function PayoutsScreen() {
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

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Payouts</Text>
          <Text style={styles.headerSubtitle}>Manage Your Earnings</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Earnings Card */}
        <View style={styles.heroCard}>
          <Text style={styles.cardLabel}>Total Earnings</Text>
          <Text style={styles.heroValue}>₹23,500</Text>

          <View style={styles.heroStatsRow}>
            <View>
              <Text style={styles.subLabel}>Last Month</Text>
              <Text style={styles.subValue}>₹23,500</Text>
            </View>
            <View>
              <Text style={styles.subLabel}>This Month</Text>
              <Text style={styles.subValue}>₹23,500</Text>
            </View>
          </View>
        </View>

        {/* Grid Stats */}
        <View style={styles.gridContainer}>
          {/* Active Users */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="radio-button-on" size={18} color={THEME.accent} />
              <Text style={styles.gridLabel}>Active Users</Text>
            </View>
            <Text style={styles.gridValue}>187</Text>
            <Text style={styles.gridSubText}>79% conversion</Text>
          </View>

          {/* This Month Earnings */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="currency-inr"
                size={18}
                color={THEME.textPrimary}
              />
              <Text style={styles.gridLabel}>This month</Text>
            </View>
            <Text style={styles.gridValue}>₹23,500</Text>
            <Text style={[styles.gridSubText, { color: THEME.accent }]}>+18% increase</Text>
          </View>
        </View>

        {/* Request Payout Button - UPDATED TO NEON */}
        <TouchableOpacity style={styles.requestButton} activeOpacity={0.8}>
          <Text style={styles.requestButtonText}>REQUEST PAYOUT</Text>
        </TouchableOpacity>

        {/* Next Payout Card */}
        <View style={styles.sectionCard}>
          <View style={styles.payoutHeader}>
            <View>
              <Text style={styles.sectionTitle}>Next Payout</Text>
              <Text style={styles.sectionSub}>Scheduled for Dec 5, 2025</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: THEME.processing },
              ]}
            >
              <Text style={styles.statusText}>Processing</Text>
            </View>
          </View>

          <View style={styles.payoutDetailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>₹150</Text>
          </View>

          <View style={styles.payoutDetailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>UPI(***@okaxis)</Text>
          </View>

          <View style={[styles.payoutDetailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Expected Date</Text>
            <Text style={styles.detailValue}>Dec 5, 2025</Text>
          </View>
        </View>

        {/* Payout History */}
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitlePlain}>Payout History</Text>
          <TouchableOpacity onPress={() => router.push("../(Payout)/History")}>
            <Text style={styles.viewAllText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          {PAYOUT_HISTORY.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.historyRow,
                index === PAYOUT_HISTORY.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View>
                <Text style={styles.historyAmount}>{item.amount}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadgeSmall,
                  { backgroundColor: item.color },
                ]}
              >
                <Text style={styles.statusTextSmall}>{item.status}</Text>
              </View>
            </View>
          ))}
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
    marginBottom: 25,
    marginTop: 20,
    paddingHorizontal: 30,
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
  },

  // Hero Card
  heroCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  heroValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 25,
  },
  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  subLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  subValue: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.textPrimary,
  },

  // Grid Stats
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 25,
  },
  gridCard: {
    flex: 1,
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },
  gridLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  gridValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  gridSubText: {
    fontSize: 11,
    color: THEME.textSecondary,
  },

  // Request Button - UPDATED STYLE
  requestButton: {
    backgroundColor: THEME.accent, // Filled neon background
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    // Add glow effect
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  requestButtonText: {
    color: THEME.buttonText, // Dark text for contrast
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },

  // Next Payout Card
  sectionCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  payoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  sectionTitle: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 11,
    color: THEME.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "bold",
  },
  payoutDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  detailLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "500",
  },

  // Payout History
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitlePlain: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "600",
  },
  viewAllText: {
    fontSize: 12,
    color: THEME.textSecondary,
    textDecorationLine: "underline",
  },
  historyContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  historyAmount: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextSmall: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
});