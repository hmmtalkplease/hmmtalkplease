import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  metricBg: "rgba(255, 255, 255, 0.05)",
};

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Card 1: Total Balance --- */}
        <View style={styles.card}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.balanceText}>₹4,500.00</Text>

          {/* Primary Action Button using Accent Color */}
          <TouchableOpacity style={styles.primaryButton} onPress={()=>router.push("/home/Withdrawals")}>
            <Text style={styles.primaryButtonText}>Withdraw Funds</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/home/payout")}
          >
            <Text style={styles.secondaryButtonText}>View Payout History</Text>
          </TouchableOpacity>
        </View>

        {/* --- Card 2: Performance Metrics --- */}
        <View style={styles.card}>
          <Text style={[styles.label, styles.sectionTitle]}>
            Performance Metrics
          </Text>

          {/* Metric Item: Acceptance Rate */}
          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Acceptance Rate</Text>
              <Text style={styles.metricValue}>92%</Text>
            </View>
            {/* Custom Progress Bar with Accent Fill */}
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "92%" }]} />
            </View>
          </View>

          {/* Metric Item: Avg Session Duration */}
          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Avg Session Duration</Text>
              <Text style={styles.metricValue}>38 min</Text>
            </View>
          </View>

          {/* Metric Item: User Feedback Score */}
          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>User Feedback Score</Text>
              <Text style={styles.metricValue}>4.8/5.0</Text>
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.starFilled}>★</Text>
              <Text style={styles.starFilled}>★</Text>
              <Text style={styles.starFilled}>★</Text>
              <Text style={styles.starFilled}>★</Text>
              <Text style={styles.starHalf}>★</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <DashboardScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
  },

  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },

  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textMain,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.accent,
    fontWeight: "600",
    textTransform: "none",
  },

  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  secondaryButtonText: {
    color: COLORS.textMain,
    fontWeight: "600",
    fontSize: 14,
  },

  metricRow: {
    backgroundColor: COLORS.metricBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textMain,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
  },

  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginTop: 12,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 3,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  starContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  starFilled: {
    color: COLORS.accent,
    fontSize: 18,
    marginRight: 4,
  },
  starHalf: {
    color: "rgba(0, 255, 255, 0.3)",
    fontSize: 18,
  },
});
