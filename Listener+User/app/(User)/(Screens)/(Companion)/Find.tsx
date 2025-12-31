import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
  refreshBtnBg: "rgba(0, 255, 255, 0.1)",
};

// --- MOCK DATA SOURCE ---
// In a real app, this would come from your backend API based on the user's "What's on your mind" input.
const INITIAL_MATCHES = [
  {
    id: "123",
    name: "Listener #123",
    matchReason: "Anxiety",
    rating: 4.8,
    reviews: 120,
    online: true,
  },
  {
    id: "456",
    name: "Listener #456",
    matchReason: "Stress",
    rating: 4.9,
    reviews: 85,
    online: false,
  },
  {
    id: "789",
    name: "Listener #789",
    matchReason: "Professional",
    rating: 4.7,
    reviews: 210,
    online: true,
  },
  {
    id: "101",
    name: "Listener #101",
    matchReason: "Loneliness",
    rating: 5.0,
    reviews: 45,
    online: true,
  },
  {
    id: "202",
    name: "Listener #202",
    matchReason: "Depression",
    rating: 4.6,
    reviews: 98,
    online: false,
  },
];

export default function AvailableListenersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Dynamic State
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate refreshing data (shuffling the list)
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API delay
    setTimeout(() => {
      const shuffled = [...matches].sort(() => Math.random() - 0.5);
      setMatches(shuffled);
      setIsRefreshing(false);
    }, 800);
  }, [matches]);

  const renderItem = ({ item }: { item: (typeof INITIAL_MATCHES)[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={32} color={THEME.textPrimary} />
          </View>
          {item.online && <View style={styles.onlineBadge} />}
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.listenerName}>{item.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={THEME.buttonText} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.matchReason}>
            Matches your issue:{" "}
            <Text style={{ color: THEME.accent }}>{item.matchReason}</Text>
          </Text>

          <Text style={styles.reviewText}>
            {item.reviews} sessions completed
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.viewProfileBtn}
        onPress={() =>
          router.push({
            pathname: "./[id]",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.viewProfileText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Listeners</Text>
      </View>

      {/* Refresh Bar */}
      <TouchableOpacity
        style={styles.refreshBar}
        onPress={handleRefresh}
        disabled={isRefreshing}
        activeOpacity={0.7}
      >
        {isRefreshing ? (
          <ActivityIndicator size="small" color={THEME.accent} />
        ) : (
          <>
            <Ionicons name="refresh" size={20} color={THEME.textPrimary} />
            <Text style={styles.refreshText}>Refresh Matches</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Dynamic List */}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No listeners found at the moment.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Refresh Bar
  refreshBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.refreshBtnBg,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
    gap: 8,
  },
  refreshText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },

  // Card Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  onlineBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#00FF9D",
    position: "absolute",
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: THEME.cardBg,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  listenerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    color: THEME.buttonText,
    fontSize: 12,
    fontWeight: "bold",
  },
  matchReason: {
    fontSize: 13,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 11,
    color: THEME.textSecondary,
    fontStyle: "italic",
  },

  // View Profile Button
  viewProfileBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.textPrimary, // White outline style
    alignItems: "center",
    justifyContent: "center",
  },
  viewProfileText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    color: THEME.textSecondary,
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});
