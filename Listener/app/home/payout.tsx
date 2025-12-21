import React from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  processing: "#7B61FF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
};

const TRANSACTIONS = [
  { id: "1", amount: "₹1,200", date: "Sept 2, 2025", status: "Completed" },
  { id: "2", amount: "₹800", date: "Aug 25, 2025", status: "Processing" },
  { id: "3", amount: "₹1,500", date: "Aug 21, 2025", status: "Completed" },
  { id: "4", amount: "₹1,100", date: "Aug 15, 2025", status: "Completed" },
  { id: "5", amount: "₹950", date: "Aug 13, 2025", status: "Completed" },
  { id: "6", amount: "₹1,000", date: "Aug 05, 2025", status: "Completed" },
];

const TransactionListScreen = () => {
  const renderItem = ({ item }: { item: any }) => {
    const isCompleted = item.status === "Completed";

    const badgeColor = isCompleted ? COLORS.accent : COLORS.processing;

    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.amountText}>{item.amount}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <View style={[styles.badge, { borderColor: badgeColor }]}>
          <View style={[styles.statusDot, { backgroundColor: badgeColor }]} />
          <Text style={[styles.badgeText, { color: badgeColor }]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" />

        <FlatList
          data={TRANSACTIONS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.headerTitle}>Recent Payouts</Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  headerTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default TransactionListScreen;
