import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
  textSecondary: "#A0A0A0",
  bookingBg: "rgba(255, 255, 255, 0.05)",
};

export default function App() {
  const [isAvailable, setIsAvailable] = useState(true);

  // Dummy data for the bar chart
  const chartData = [30, 50, 40, 70, 85, 65, 95, 80, 100];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" />

        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Listener #4521</Text>
          <View style={styles.headerRight}>
            <Text
              style={[
                styles.availableText,
                { color: isAvailable ? COLORS.accent : COLORS.textSecondary },
              ]}
            >
              Available
            </Text>
            <Switch
              trackColor={{ false: "#3E3E3E", true: COLORS.accent }}
              thumbColor={"#FFFFFF"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsAvailable(!isAvailable)}
              value={isAvailable}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Stats Row --- */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statCard}
              onPress={() => router.push("/home/earnings")}
            >
              <Text style={styles.statLabel}>Total Earnings</Text>
              <Text style={styles.statValue}>₹4,500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statCard}>
              <Text style={styles.statLabel}>Sessions</Text>
              <Text style={styles.statValue}>12</Text>
            </TouchableOpacity>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Rating</Text>
              <Text style={[styles.statValue, { color: "#FFD700" }]}>
                ★ 4.8
              </Text>
            </View>
          </View>

          {/* --- Session Trend Chart --- */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Session Trend (7 days)</Text>
            <View style={styles.chartContainer}>
              <View style={styles.chartBarsRow}>
                {chartData.map((height, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: height }]} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* --- Action Button --- */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/home/availability")}
          >
            <Text style={styles.actionButtonText}>Set My Availability</Text>
          </TouchableOpacity>

          {/* --- Next Bookings --- */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Next Bookings</Text>

            <TouchableOpacity style={styles.bookingItem}>
              <Text style={styles.bookingText}>
                Today 2:00 PM -{" "}
                <Text style={{ color: COLORS.accent }}>User#892</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookingItem}>
              <Text style={styles.bookingText}>
                Today 4:30 PM -{" "}
                <Text style={{ color: COLORS.accent }}>User#749</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookingItem}>
              <Text style={styles.bookingText}>
                Tomorrow 3:15 PM -{" "}
                <Text style={{ color: COLORS.accent }}>User#919</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: COLORS.glass,
    width: "31%",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: "flex-start",
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textMain,
  },

  sectionCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color: COLORS.textMain,
  },

  chartContainer: {
    height: 120,
    justifyContent: "flex-end",
  },
  chartBarsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  barWrapper: {
    width: 22,
    alignItems: "center",
  },
  bar: {
    width: 14,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  actionButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  actionButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  bookingItem: {
    backgroundColor: COLORS.bookingBg,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  bookingText: {
    fontSize: 14,
    color: COLORS.textMain,
    fontWeight: "500",
  },
});
