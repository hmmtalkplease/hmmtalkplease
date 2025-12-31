import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Clipboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225", // Dark text for neon buttons
  iconColor: "#E0E0E0",
  glowColor: "rgba(0, 255, 255, 0.3)",
};

// --- MOCK DATA ---
const CATEGORIES = [
  { id: "anime", label: "Anime", icon: "face-man-shimmer-outline" },
  { id: "planets", label: "Planets", icon: "earth" },
  { id: "cities", label: "Cities", icon: "city-variant-outline" },
  { id: "food", label: "Food", icon: "food-apple-outline" },
  { id: "objects", label: "Objects", icon: "cube-outline" },
  { id: "nature", label: "Nature", icon: "tree-outline" },
];

export default function AnonymousIdScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State
  const [uniqueId] = useState("USER-A7K3M9P2");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCopy = () => {
    Clipboard.setString(uniqueId);
    Alert.alert("Copied", "User ID copied to clipboard");
  };

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
        <Text style={styles.headerTitle}>Your Anonymous ID</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Unique ID Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Your Unique Id:</Text>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>{uniqueId}</Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
              <MaterialCommunityIcons
                name="content-copy"
                size={20}
                color={THEME.accent}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Feather name="info" size={14} color={THEME.textSecondary} />
            <Text style={styles.infoText}>Save this ID to login</Text>
          </View>
        </View>

        {/* Pseudonym Selection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Your Pseudonym:</Text>

          <View style={styles.gridContainer}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.gridItem,
                    isSelected && styles.gridItemSelected,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      isSelected && styles.iconCircleSelected,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color={isSelected ? THEME.accent : THEME.iconColor}
                    />
                  </View>
                  <Text
                    style={[
                      styles.gridLabel,
                      isSelected && styles.gridLabelSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Display */}
        <View style={styles.selectionDisplay}>
          <Text style={styles.selectionText}>
            Selected:{" "}
            <Text style={styles.selectionValue}>
              {selectedCategory
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.label
                : "None"}
            </Text>
          </Text>
        </View>

        {/* Continue Button - NEON STYLE */}
        <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={()=>router.push("./About")}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
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

  // Section Styles
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 10,
  },
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: THEME.accent, // Neon border for ID box
    marginBottom: 8,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  idText: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "600",
    letterSpacing: 1,
  },
  copyButton: {
    padding: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingLeft: 5,
  },
  infoText: {
    color: THEME.textSecondary,
    fontSize: 12,
  },

  // Grid Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  gridItem: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: THEME.inputBg,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    gap: 8,
  },
  gridItemSelected: {
    borderColor: THEME.accent,
    backgroundColor: "rgba(0, 255, 255, 0.1)", // Subtle neon fill
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSelected: {
    // Optional: add background to icon circle when selected
  },
  gridLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  gridLabelSelected: {
    color: THEME.accent,
    fontWeight: "bold",
  },

  // Selection Display
  selectionDisplay: {
    backgroundColor: THEME.cardBg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  selectionText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  selectionValue: {
    color: THEME.accent, // Neon text for selected value
    fontWeight: "bold",
  },

  // Continue Button - NEON THEME
  continueButton: {
    backgroundColor: THEME.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonText: {
    color: THEME.buttonText, // Dark text on bright neon
    fontSize: 16,
    fontWeight: "bold",
  },
});
