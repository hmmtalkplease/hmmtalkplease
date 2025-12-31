import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  success: "#00FF9D", // Green for completed items
  progressBarBg: "rgba(255, 255, 255, 0.1)",
};

// --- MOCK DATA ---
const MENU_LINKS = [
  { id: 1, label: "Learning Center Progress" },
  { id: 2, label: "Saved Articles / Worksheets" },
  { id: 3, label: "Completed Chapters" },
  { id: 4, label: "Daily Practice Tracker" },
];

const PROGRESS_ITEMS = [
  { id: 1, title: "Understanding Anxiety", progress: 100, completed: true },
  { id: 2, title: "Career Development Basics", progress: 60, completed: false },
  { id: 3, title: "Relationship Skills", progress: 30, completed: false },
  { id: 4, title: "Self-care Practices", progress: 0, completed: false },
];

const CATEGORIES = [
  { id: 1, label: "Mental Health" },
  { id: 2, label: "Relationships" },
  { id: 3, label: "Career" },
  { id: 4, label: "Self-Care" },
  { id: 5, label: "Anxiety" },
  { id: 6, label: "Stress Management" },
];

export default function LearningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="book-open" size={20} color={THEME.textPrimary} />
            <Text style={styles.headerTitle}>Learning & Self-Help</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Self-help resources and progress
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Links */}
        <View style={styles.menuContainer}>
          {MENU_LINKS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Text style={styles.menuText}>{item.label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning Progress Section */}
        <Text style={styles.sectionTitle}>Your Learning Progress</Text>
        <View style={styles.progressContainer}>
          {PROGRESS_ITEMS.map((item) => (
            <View key={item.id} style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <View>
                  <Text style={styles.progressTitle}>{item.title}</Text>
                  <Text style={styles.progressSubtitle}>
                    {item.progress}% complete
                  </Text>
                </View>
                {item.completed && (
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={24}
                    color={THEME.success}
                  />
                )}
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${item.progress}%` },
                    item.completed && { backgroundColor: THEME.success }, // Turn green if 100%
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Browse by Category */}
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{cat.label}</Text>
            </TouchableOpacity>
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
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 2,
  },

  // Menu Links
  menuContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
    overflow: "hidden", // Ensures inner items adhere to border radius
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: THEME.textPrimary,
  },

  // Progress Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 15,
  },
  progressContainer: {
    gap: 15,
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: THEME.progressBarBg,
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: THEME.accent,
    borderRadius: 3,
  },

  // Categories Grid
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "48%", // 2-column layout
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: THEME.textPrimary,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});
