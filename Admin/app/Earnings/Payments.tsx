import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Thematic Color Constants
const COLORS = {
  bg: "#1A1225", // Deep Purple/Black
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.4)",
};

// Data strictly from the most recent screenshot
const PAYMENT_HISTORY = [
  { id: "1", amount: "4,250", date: "1 Dec 2025" },
  { id: "2", amount: "3,650", date: "1 Nov 2025" },
  { id: "3", amount: "3,590", date: "1 Oct 2025" },
  { id: "4", amount: "4,790", date: "1 Sep, 2025" },
  { id: "5", amount: "4,250", date: "1 Dec 2025" },
];

export default function PaymentHistoryScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
     
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {PAYMENT_HISTORY.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.leftContent}>
                <Text style={styles.amount}>₹ {item.amount}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>
          ))}
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
    paddingVertical: 15,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  viewAll: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "500",
  },
  scrollContent: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    // Soft shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  leftContent: {
    gap: 4,
  },
  amount: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  statusText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },
});