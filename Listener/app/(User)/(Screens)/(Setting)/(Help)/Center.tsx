import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  iconBg: "rgba(255, 255, 255, 0.08)",
};

// --- MOCK DATA ---
const HELP_CATEGORIES = [
  {
    id: 1,
    title: "Getting Started",
    articleCount: "12 articles",
    icon: "book-open-page-variant-outline",
  },
  {
    id: 2,
    title: "Account & Profile Management",
    articleCount: "8 articles",
    icon: "account-outline",
  },
  {
    id: 3,
    title: "Billing and Refunds",
    articleCount: "12 articles",
    icon: "credit-card-outline",
  },
  {
    id: 4,
    title: "Safety & Reporting",
    articleCount: "10 articles",
    icon: "shield-check-outline",
  },
  {
    id: 5,
    title: "Technical Support",
    articleCount: "10 articles",
    icon: "face-agent", // Headset icon equivalent
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

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
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color={THEME.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Help Center..."
            placeholderTextColor={THEME.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories List */}
        <View style={styles.listContainer}>
          {HELP_CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={THEME.textPrimary}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.articleCount}</Text>
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={THEME.textSecondary}
              />
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
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: 15,
  },

  // List Items
  listContainer: {
    gap: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: THEME.iconBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: THEME.textSecondary,
  },
});
