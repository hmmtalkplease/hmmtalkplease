import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// Thematic Color Constants
const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.4)",
  error: "#FF4D4D",
};

// --- Mock Data ---
const LISTENERS_MOCK_DATA = [
  {
    id: "A756N90M",
    skills: ["Anxiety", "Depression"],
    avatarInitial: "A",
  },
  {
    id: "A9NHN90M",
    skills: ["Relationships", "Stress"],
    avatarInitial: "R",
  },
  {
    id: "B2XXK10L",
    skills: ["Grief", "Work-Life", "PTSD"],
    avatarInitial: "G",
  },
  {
    id: "C5MMQ44P",
    skills: ["Social Anxiety"],
    avatarInitial: "S",
  },
];

// --- Sub-Components ---

const ListenerCard = ({
  listener,
}: {
  listener: (typeof LISTENERS_MOCK_DATA)[0];
}) => (
  <View style={styles.card}>
    <View style={styles.cardTopRow}>
      <View style={styles.userInfo}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{listener.avatarInitial}</Text>
        </View>
        <Text style={styles.listenerId}>Listener- {listener.id}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() =>
          router.push({
            pathname: "../Lis_Management/[id]",
            params: { id: listener.id },
          })
        }
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.skillsSection}>
      <Text style={styles.sectionLabel}>Skills</Text>
      <View style={styles.tagContainer}>
        {listener.skills.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillTagText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.actionRow}>
      <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
        <Text style={styles.approveBtnText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
        <Text style={styles.rejectBtnText}>Reject</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ListenerManagementScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Search & Filter Header */}
        <View style={styles.stickyHeader}>
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={18}
              color={COLORS.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search listeners..."
              placeholderTextColor={COLORS.textSecondary}
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons
              name="filter-outline"
              size={20}
              color={COLORS.textPrimary}
            />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {LISTENERS_MOCK_DATA.map((item) => (
            <ListenerCard key={item.id} listener={item} />
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
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    gap: 12,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    gap: 16,
  },
  // Search bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.glass,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  // Filter button
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.glass,
    borderRadius: 30,
    height: 54,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  filterButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  // Card UI
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  avatarText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 18,
  },
  listenerId: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  viewButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  viewButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  skillsSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    marginBottom: 20,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillTag: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  skillTagText: {
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  // Buttons
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  approveBtn: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
    // Bloom effect for neon feel
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  approveBtnText: {
    color: COLORS.bg,
    fontWeight: "700",
    fontSize: 15,
  },
  rejectBtn: {
    backgroundColor: "transparent",
    borderColor: COLORS.error,
  },
  rejectBtnText: {
    color: COLORS.error,
    fontWeight: "600",
    fontSize: 15,
  },
});
