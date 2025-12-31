import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Blue
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225", // Dark text for neon buttons
  chipInactive: "rgba(255, 255, 255, 0.05)",
  chipBorder: "#3A3045",
};

// --- DATA ---
const CATEGORIES = [
  "Teacher relationship/conflicts",
  "School/college environment issues",
  "Peer bullying/harassment",
  "Parental pressure/conflicts",
  "Romantic relationship problems",
  "Gender identity/sexual concerns",
  "Academic stress/performance anxiety",
  "Career confusion",
  "Mental health support",
  "Just need someone to talk to",
];

const EMOTIONS = [
  "Anxious",
  "Depressed",
  "Angry",
  "Confused",
  "Overwhelmed",
  "Stressed",
  "Lonely",
  "Hopeful",
  "Neutral",
  "Others",
];

export default function WhatsOnYourMindScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState([
    "English",
    "Hindi",
  ]);

  // Mock function to remove language
  const removeLanguage = (lang: string) => {
    setSelectedLanguages((prev) => prev.filter((l) => l !== lang));
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
        <Text style={styles.headerTitle}>What’s on Your Mind?</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Language Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Preferred Language(s)</Text>

            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownPlaceholder}>
                Select languages(s)
              </Text>
              <Feather
                name="chevron-down"
                size={20}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>

            {/* Selected Languages Tags */}
            <View style={styles.selectedTagsRow}>
              <Text style={styles.selectedLabel}>Selected:</Text>
              {selectedLanguages.map((lang) => (
                <View key={lang} style={styles.langTag}>
                  <Text style={styles.langTagText}>{lang}</Text>
                  <TouchableOpacity onPress={() => removeLanguage(lang)}>
                    <Feather name="x" size={14} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Primary Category Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Primary Category Selection</Text>
            <View style={styles.chipContainer}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Emotional State */}
          <View style={styles.section}>
            <Text style={styles.label}>Emotional State</Text>
            <View style={styles.chipContainer}>
              {EMOTIONS.map((emotion) => {
                const isSelected = selectedEmotion === emotion;
                return (
                  <TouchableOpacity
                    key={emotion}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedEmotion(emotion)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextActive,
                      ]}
                    >
                      {emotion}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Match Me Button - UPDATED COLOR */}
        <TouchableOpacity
          style={styles.matchButton}
          onPress={() => router.push("./Find")}
        >
          <Text style={styles.matchButtonText}>Match Me</Text>
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

  // Main Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 12,
    fontWeight: "500",
  },

  // Language Dropdown
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    borderRadius: 25, // Pill shape
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  dropdownPlaceholder: {
    color: THEME.textPrimary,
    fontSize: 14,
  },
  selectedTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  selectedLabel: {
    color: THEME.textSecondary,
    fontSize: 14,
    marginRight: 5,
  },
  langTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Dark grey for selected pill
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  langTagText: {
    color: "#FFF",
    fontSize: 13,
  },

  // Chips
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: THEME.chipInactive,
    borderWidth: 1,
    borderColor: THEME.chipBorder,
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

  // Footer Button - UPDATED STYLES
  matchButton: {
    backgroundColor: THEME.accent, // Changed to Neon Blue
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    // Optional: Add a neon glow shadow
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  matchButtonText: {
    color: THEME.buttonText, // Changed to dark text for contrast against neon
    fontSize: 16,
    fontWeight: "bold",
  },
});
