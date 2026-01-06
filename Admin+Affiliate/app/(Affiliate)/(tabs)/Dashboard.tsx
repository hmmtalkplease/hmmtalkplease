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
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  success: "#00FF9D", // Neon Green
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
  chartBar: "rgba(0, 255, 255, 0.6)",
  chartBarActive: "#00FFFF",
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const RECENT_ACTIVITY = [
  { id: 1, user: "USER_***123", type: "First Payment", amount: "₹150" },
  { id: 2, user: "USER_***456", type: "New Signup", amount: "₹50" },
  { id: 3, user: "USER_***789", type: "Subscription Renewed", amount: "₹75" },
];

// Mock data for the bar chart visualization
const CHART_DATA = [40, 65, 50, 80, 30, 45, 60, 70, 90];

export default function AffiliateDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Gradient for Header Area */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome Back Affiliate!</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => router.push("../(Dash)/Noti")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={THEME.textPrimary}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        {/* Main Stats Card (Total Referrals) */}
        <View style={styles.heroCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={20}
              color={THEME.textSecondary}
            />
            <Text style={styles.cardLabel}>Total Referrals</Text>
          </View>
          <Text style={styles.heroValue}>247</Text>
          <View style={styles.trendRow}>
            <Feather name="trending-up" size={16} color={THEME.success} />
            <Text style={styles.trendText}> 12% from last month</Text>
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
            <Text style={styles.gridSubText}>+18% increase</Text>
          </View>

          {/* Pending Payout */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={18}
                color={THEME.textSecondary}
              />
              <Text style={styles.gridLabel}>Pending Payout</Text>
            </View>
            <Text style={styles.gridValue}>₹8,700</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>View Details</Text>
            </TouchableOpacity>
          </View>

          {/* Conversion Rate */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="chart-box-outline"
                size={18}
                color={THEME.textSecondary}
              />
              <Text style={styles.gridLabel}>Conversion Rate</Text>
            </View>
            <Text style={styles.gridValue}>76%</Text>
            <Text style={[styles.gridSubText, { color: THEME.success }]}>
              Above Average
            </Text>
          </View>
        </View>

        {/* Performance Chart Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>30-Day Performance</Text>
            <TouchableOpacity onPress={() => router.push("/Performance")}>
              <Text style={styles.linkTextSmall}>View Details</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Bar Chart Visualization */}
          <View style={styles.chartContainer}>
            {CHART_DATA.map((value, index) => (
              <View key={index} style={styles.barWrapper}>
                <LinearGradient
                  colors={[THEME.chartBarActive, "rgba(0, 255, 255, 0.1)"]}
                  style={[styles.bar, { height: `${value}%` }]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity
              onPress={() => router.push("../(Dash)/RefHistory")}
            >
              <Text style={styles.linkTextSmall}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {RECENT_ACTIVITY.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.activityRow,
                  index === RECENT_ACTIVITY.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View>
                  <Text style={styles.activityUser}>{item.user}</Text>
                  <Text style={styles.activityType}>{item.type}</Text>
                </View>
                <Text style={styles.activityAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => router.push("../(Dash)/RefLink")}
          >
            <Feather name="share" size={24} color={THEME.buttonText} />
            <Text style={styles.actionButtonText}>Share Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => router.push("../(Dash)/Materials")}
          >
            <Feather name="download" size={24} color={THEME.buttonText} />
            <Text style={styles.actionButtonText}>Materials</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("../(Setting)/Settings")}
        >
          <Text style={styles.settingsButtonText}>Account Settings</Text>
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
    height: 200,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 5,
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
  notificationBtn: {
    marginTop: 10,
    padding: 5,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.accent,
  },

  // Cards General
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
  },

  // Hero Card
  heroCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  heroValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 5,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendText: {
    color: THEME.textSecondary,
    fontSize: 12,
  },

  // Grid Layout
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 12,
  },
  gridCard: {
    width: (width - 52) / 2, // 20px padding * 2 + 12px gap
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
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
  linkText: {
    fontSize: 11,
    color: THEME.textSecondary,
    textDecorationLine: "underline",
    marginTop: 2,
  },

  // Section Cards (Chart & Activity)
  sectionCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  linkTextSmall: {
    fontSize: 11,
    color: THEME.textSecondary,
  },

  // Chart
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 5,
  },
  barWrapper: {
    width: 20,
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,0.02)", // Track
    borderRadius: 4,
  },
  bar: {
    width: "100%",
    borderRadius: 4,
  },

  // Recent Activity List
  activityList: {
    gap: 0,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  activityUser: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  activityType: {
    fontSize: 11,
    color: THEME.textSecondary,
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "bold",
  },

  // Quick Actions
  sectionLabel: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 15,
    marginTop: 5,
    fontWeight: "500",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: THEME.accent,
    borderRadius: 16,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButtonText: {
    color: THEME.buttonText,
    fontWeight: "600",
    fontSize: 13,
  },

  // Settings Button (Footer)
  settingsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButtonText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
});
