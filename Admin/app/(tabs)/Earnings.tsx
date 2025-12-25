import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.4)",
};

// --- Reusable Glass Component ---
const GlassCard = ({ children, style }: any) => (
  <View style={[styles.glassCard, style]}>{children}</View>
);

export default function FinanceDashboard() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Stats */}
          <View style={styles.statsRow}>
            <GlassCard style={styles.halfCard}>
              <Text style={styles.cardLabel}>This Month</Text>
              <Text style={styles.mainValue}>₹ 24,520</Text>
              <Text style={styles.trendText}>
                <Feather
                  name="arrow-up-right"
                  size={12}
                  color={COLORS.accent}
                />{" "}
                +12% from last month
              </Text>
            </GlassCard>
            <GlassCard style={styles.halfCard}>
              <Text style={styles.cardLabel}>Total Earnings</Text>
              <Text style={styles.mainValue}>₹ 5,00,249</Text>
              <Text style={styles.trendText}>All time</Text>
            </GlassCard>
          </View>

          {/* Payout Summary */}
          <GlassCard style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.cardLabel}>Pending Payout</Text>
              <Text style={styles.mainValueSmall}>₹ 24,520</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.cardLabel}>Last Payment</Text>
              <Text style={styles.mainValueSmall}>1 Dec 2025</Text>
            </View>
          </GlassCard>

          {/* Earnings Trend Chart */}
          <GlassCard>
            <Text style={[styles.cardLabel, { marginBottom: 15 }]}>
              Monthly earnings trend
            </Text>
            <View style={styles.chartContainer}>
              <View style={styles.chartBarsRow}>
                {[0.4, 0.6, 0.8, 0.65, 0.65].map((h, i) => (
                  <View key={i} style={styles.barColumn}>
                    <View
                      style={[
                        styles.vBar,
                        {
                          height: h * 100,
                          backgroundColor:
                            i === 2 ? COLORS.accent : "rgba(255,255,255,0.2)",
                        },
                      ]}
                    />
                    <Text style={styles.barLabel}>
                      {["Jul", "Aug", "Sep", "Oct", "Nov"][i]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </GlassCard>

          {/* Payment History */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment History</Text>
            <TouchableOpacity onPress={()=>router.push("../Earnings/Payments")}>
              <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          {[
            { amt: "4,250", date: "1 Dec 2025" },
            { amt: "3,650", date: "1 Nov 2025" },
            { amt: "3,590", date: "1 Oct 2025" },
          ].map((item, index) => (
            <GlassCard key={index} style={styles.historyItem}>
              <View>
                <Text style={styles.historyAmt}>₹ {item.amt}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </GlassCard>
          ))}

          {/* --- Thematic Neon Buttons --- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.neonSecondaryButton}>
              <Text style={styles.neonSecondaryText}>Update Bank Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.neonPrimaryButton}>
              <Text style={styles.neonPrimaryText}>Request Withdrawal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { padding: 20, gap: 20 },

  // Card Styling
  glassCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  statsRow: { flexDirection: "row", gap: 12 },
  halfCard: { flex: 1, minHeight: 120, justifyContent: "space-between" },
  summaryCard: { paddingVertical: 12 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.glassBorder,
    marginVertical: 12,
  },

  // Typography
  cardLabel: { color: COLORS.textSecondary, fontSize: 13, fontWeight: "500" },
  mainValue: { color: COLORS.textPrimary, fontSize: 20, fontWeight: "700" },
  mainValueSmall: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  trendText: { color: COLORS.accent, fontSize: 11 },

  // Chart
  chartContainer: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 16,
    height: 160,
    justifyContent: "flex-end",
  },
  chartBarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  barColumn: { alignItems: "center", gap: 8 },
  vBar: { width: 35, borderRadius: 6 },
  barLabel: { color: COLORS.textSecondary, fontSize: 11 },

  // List
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: "600" },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyAmt: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" },
  historyDate: { color: COLORS.textSecondary, fontSize: 12 },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  statusText: { color: COLORS.textPrimary, fontSize: 12 },

  // --- Neon Buttons Style Updates ---
  buttonContainer: {
    gap: 14,
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  neonPrimaryButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    // Glow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  neonPrimaryText: {
    color: COLORS.bg, // Dark text for contrast on neon background
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  neonSecondaryButton: {
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  neonSecondaryText: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: "600",
  },
});
