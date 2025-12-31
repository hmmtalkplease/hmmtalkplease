import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
  chipActive: "#00FFFF",
  chipInactive: "rgba(255, 255, 255, 0.05)",
};

// --- MOCK DATA ---
const FILTERS = ["All", "Issue-based", "Profession", "Weekly Support Group"];

const ROOMS = [
  {
    id: 1,
    title: "Anxiety Support",
    type: "Issue-based",
    members: 48,
    joined: false,
  },
  {
    id: 2,
    title: "Work Stress",
    type: "Issue-based",
    members: 32,
    joined: false,
  },
  {
    id: 3,
    title: "Tech Professionals",
    type: "Profession",
    members: 156,
    joined: true,
  },
  {
    id: 4,
    title: "Sunday Wellness",
    type: "Weekly Support Group",
    members: 24,
    joined: false,
  },
];

export default function CommunityRoomsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Header (No Back Button) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Rooms</Text>
        <Text style={styles.headerSubtitle}>
          Connect with others anonymously
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <TouchableOpacity
          style={styles.statsCard}
          onPress={() => router.push("../(Screens)/(Community)/Rooms")}
        >
          <Text style={styles.statsLabel}>Community Rooms Joined</Text>
          <Text style={styles.statsValue}>5</Text>
        </TouchableOpacity>

        {/* Search & Filter Section */}
        <View style={styles.filterSection}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Rooms..."
              placeholderTextColor={THEME.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Feather name="search" size={20} color={THEME.textSecondary} />
          </View>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.chip,
                  activeFilter === filter && styles.chipActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.chipText,
                    activeFilter === filter && styles.chipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rooms List */}
        <View style={styles.roomsList}>
          {ROOMS.map((room) => (
            <View key={room.id} style={styles.roomCard}>
              <View style={styles.roomHeader}>
                <View>
                  <Text style={styles.roomTitle}>{room.title}</Text>
                  <Text style={styles.roomType}>{room.type}</Text>
                </View>
                <View style={styles.memberBadge}>
                  <Feather name="users" size={12} color={THEME.textSecondary} />
                  <Text style={styles.memberCount}>{room.members}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.joinButton, room.joined && styles.joinedButton]}
              >
                <Text
                  style={[
                    styles.joinButtonText,
                    room.joined && styles.joinedButtonText,
                  ]}
                >
                  {room.joined ? "Joined" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // Header
  header: {
    paddingHorizontal: 35,
    marginBottom: 25,
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 25, // Large title as requested
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },

  // Stats Card
  statsCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statsLabel: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Filter Section
  filterSection: {
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: 15,
    marginRight: 10,
  },
  chipsContainer: {
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: THEME.chipInactive,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  chipActive: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  chipText: {
    color: THEME.textSecondary,
    fontSize: 13,
  },
  chipTextActive: {
    color: THEME.buttonText,
    fontWeight: "bold",
  },

  // Rooms List
  roomsList: {
    gap: 15,
  },
  roomCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  roomType: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  memberCount: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  joinButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.textPrimary, // White outline as per design style
    alignItems: "center",
    justifyContent: "center",
  },
  joinButtonText: {
    color: THEME.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
  joinedButton: {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderColor: THEME.accent,
  },
  joinedButtonText: {
    color: THEME.accent,
  },
});
