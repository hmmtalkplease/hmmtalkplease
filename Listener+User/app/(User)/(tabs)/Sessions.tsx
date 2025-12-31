import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

// --- MOCK DATA ---
const SESSION_HISTORY = [
  {
    id: "1",
    name: "Sakura",
    topic: "Career transitions",
    date: "Nov 28",
    duration: "25 min",
    cost: "₹175",
    rating: 5,
  },
  {
    id: "2",
    name: "Pheonix",
    topic: "Workplace stress",
    date: "Nov 25",
    duration: "20 min",
    cost: "₹135",
    rating: 5,
  },
  {
    id: "3",
    name: "Sakura",
    topic: "Career transitions",
    date: "Nov 22",
    duration: "15 min",
    cost: "₹155",
    rating: 5,
  },
];

export default function SessionHistoryScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: (typeof SESSION_HISTORY)[0] }) => (
    <View style={styles.card}>
      {/* Top Row: Name, Topic, Rating */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.companionName}>{item.name}</Text>
          <Text style={styles.sessionTopic}>{item.topic}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <MaterialCommunityIcons
              key={i}
              name="star"
              size={18}
              color={i < item.rating ? THEME.accent : "#333"}
              style={styles.starIcon}
            />
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Middle Row: Date, Duration, Cost */}
      <View style={styles.detailsRow}>
        {/* Date */}
        <View style={styles.detailItem}>
          <View style={styles.detailLabelRow}>
            <Feather name="calendar" size={14} color={THEME.textSecondary} />
            <Text style={styles.detailLabel}>Date</Text>
          </View>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>

        {/* Duration */}
        <View style={styles.detailItem}>
          <View style={styles.detailLabelRow}>
            <Feather name="clock" size={14} color={THEME.textSecondary} />
            <Text style={styles.detailLabel}>Duration</Text>
          </View>
          <Text style={styles.detailValue}>{item.duration}</Text>
        </View>

        {/* Cost */}
        <View style={styles.detailItem}>
          <View style={styles.detailLabelRow}>
            <Text style={styles.detailLabel}>Cost</Text>
          </View>
          <Text style={[styles.detailValue, { color: THEME.accent }]}>
            {item.cost}
          </Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.viewDetailsBtn}
        onPress={() =>
          router.push({
            pathname: "/(User)/(Screens)/(Session)/[id]",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Session History</Text>
        <Text style={styles.pageSubtitle}>
          {SESSION_HISTORY.length} Total Sessions
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={SESSION_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  pageHeader: {
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 25,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  pageSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  // Card Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  companionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  sessionTopic: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  starIcon: {
    marginLeft: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Very subtle divider
    marginVertical: 15,
  },

  // Details Row
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
    // Align first item left, middle center, last right
  },
  detailLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
  },

  // Button
  viewDetailsBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.accent,
  },
});
