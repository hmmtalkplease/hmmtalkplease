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
  barTrack: "rgba(255, 255, 255, 0.05)",
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const FUNNEL_DATA = [
  { label: "Clicks", value: 100, count: "1,240" },
  { label: "Signups", value: 68, count: "845" },
  { label: "First Payment", value: 25, count: "312" },
  { label: "Active Subscribers", value: 20, count: "247" },
];

const REVENUE_TREND = [35, 60, 45, 85, 30, 30, 45, 55, 75];

export default function AnalyticsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
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
            <Text style={styles.headerTitle}>Performance</Text>
            <Text style={styles.headerSubtitle}>Detailed Analytics</Text>
          </View>
        </View>
        {/* Time Range Selector Button */}
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Text style={styles.filterText}>{timeRange}</Text>
          <Feather name="chevron-down" size={16} color={THEME.buttonText} />
        </TouchableOpacity>

        {/* Conversion Funnel Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Conversion Funnel</Text>

          <View style={styles.funnelContainer}>
            {FUNNEL_DATA.map((step, index) => (
              <View key={index} style={styles.funnelRow}>
                <View style={styles.funnelLabelRow}>
                  <Text style={styles.funnelLabel}>{step.label}</Text>
                  <Text style={styles.funnelCount}>{step.count}</Text>
                </View>

                <View style={styles.progressBarTrack}>
                  {/* Using gradient for progress bar fill */}
                  <LinearGradient
                    colors={[THEME.accent, "rgba(0, 255, 255, 0.4)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressBarFill,
                      { width: `${step.value}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Trend Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue Trend</Text>

          <View style={styles.chartContainer}>
            {REVENUE_TREND.map((val, index) => (
              <View key={index} style={styles.barWrapper}>
                <LinearGradient
                  colors={[THEME.accent, "rgba(0, 255, 255, 0.1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[styles.bar, { height: `${val}%` }]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Grid Stats */}
        <View style={styles.gridContainer}>
          {/* Metric 1 */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="currency-inr"
                size={18}
                color={THEME.textPrimary}
              />
              <Text style={styles.gridLabel}>Avg Order Value</Text>
            </View>
            <Text style={styles.gridValue}>₹23,500</Text>
            <Text style={styles.gridSubText}>+18% increase</Text>
          </View>

          {/* Metric 2 */}
          <View style={styles.gridCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="currency-inr"
                size={18}
                color={THEME.textPrimary}
              />
              <Text style={styles.gridLabel}>Avg Order Value</Text>
            </View>
            <Text style={styles.gridValue}>₹23,500</Text>
            <Text style={styles.gridSubText}>+18% increase</Text>
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
    marginTop: 10,
    paddingHorizontal: 5,
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

  // Filter Button
  filterButton: {
    backgroundColor: THEME.accent,
    borderRadius: 12, // Slightly more rounded
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 25,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  filterText: {
    color: THEME.buttonText,
    fontWeight: "bold",
    fontSize: 14,
  },

  // Cards
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 20,
    fontWeight: "600",
  },

  // Funnel
  funnelContainer: {
    gap: 18,
  },
  funnelRow: {
    marginBottom: 2,
  },
  funnelLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  funnelLabel: {
    fontSize: 13,
    color: THEME.textSecondary,
  },
  funnelCount: {
    fontSize: 13,
    color: THEME.textPrimary,
    fontWeight: "bold",
  },
  progressBarTrack: {
    height: 10, // Thicker bar
    backgroundColor: THEME.barTrack,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },

  // Revenue Chart
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 140, // Taller chart
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  barWrapper: {
    width: 24,
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },

  // Grid Stats
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 20,
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
});
