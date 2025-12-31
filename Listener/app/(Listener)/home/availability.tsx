import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  booked: "#7B61FF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
};

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const generateCalendarData = () => {
  const days = [];
  days.push({ id: "empty-1", day: "", status: "none" });
  for (let i = 1; i <= 30; i++) {
    let status = "none";
    if (i === 10 || i === 17) status = "available";
    if (i === 18) status = "booked";
    days.push({ id: `day-${i}`, day: i, status });
  }
  return days;
};

export default function SetAvailabilityScreen() {
  const calendarData = generateCalendarData();

  const renderCalendarDay = (item: any, index: any) => {
    const isAvailable = item.status === "available";
    const isBooked = item.status === "booked";

    const bgStyle = isAvailable
      ? { backgroundColor: COLORS.accent }
      : isBooked
      ? { backgroundColor: COLORS.booked }
      : null;

    const textStyle =
      isAvailable || isBooked
        ? { color: "#000", fontWeight: "700" }
        : { color: COLORS.textMain };

    if (item.day === "") {
      return <View key={index} style={styles.dayContainer} />;
    }

    return (
      <View key={index} style={styles.dayContainer}>
        <TouchableOpacity style={[styles.dayButton, bgStyle]}>
          <Text style={[styles.dayText]}>{item.day}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.calendarCard}>
          {/* Calendar Header */}
          <View style={styles.calendarControls}>
            <TouchableOpacity>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>September 2025</Text>
            <TouchableOpacity>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Weekday Labels */}
          <View style={styles.weekRow}>
            {DAYS_OF_WEEK.map((day) => (
              <Text key={day} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {calendarData.map((item, index) => renderCalendarDay(item, index))}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendIcon, { backgroundColor: COLORS.accent }]}
            />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendIcon, { backgroundColor: COLORS.booked }]}
            />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendIcon,
                {
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: COLORS.glassBorder,
                },
              ]}
            />
            <Text style={styles.legendText}>Unavailable</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/home/schedule")}
        >
          <Text style={styles.actionButtonText}>Edit Todays Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textMain,
    marginBottom: 30,
    marginTop: 10,
  },
  calendarCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 30,
  },
  calendarControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  arrowText: {
    fontSize: 28,
    color: COLORS.textMain,
    paddingHorizontal: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  weekText: {
    width: (width - 100) / 7,
    textAlign: "center",
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayContainer: {
    width: (width - 100) / 7,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  dayButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  legendContainer: {
    width: "100%",
    marginLeft: 15,
    marginBottom: 40,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: 140,
  },
  legendIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 15,
  },
  legendText: {
    fontSize: 15,
    color: COLORS.textMain,
  },
  actionButton: {
    backgroundColor: COLORS.accent,
    width: "100%",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
