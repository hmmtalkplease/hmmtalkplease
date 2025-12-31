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
  buttonText: "#1A1225",
  chipBg: "#333333",
};

// --- DATA ---
const LANGUAGES = [
  "English",
  "Hindi",
  "Tamil",
  "Malayalam",
  "Telugu",
  "Marathi",
  "Bengali",
];

export default function LanguagePreferenceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "English",
    "Hindi",
  ]);

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages((prev) => prev.filter((item) => item !== lang));
    } else {
      setSelectedLanguages((prev) => [...prev, lang]);
    }
  };

  const removeLanguage = (lang: string) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== lang));
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
        <Text style={styles.headerTitle}>Language Preference</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.questionText}>
            Which language(s) are you comfortable speaking in?
          </Text>

          <View style={styles.listContainer}>
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguages.includes(lang);
              return (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.listItem,
                    isSelected && styles.listItemSelected,
                  ]}
                  onPress={() => toggleLanguage(lang)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Feather
                        name="check"
                        size={14}
                        color={THEME.buttonText}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.listLabel,
                      isSelected && styles.listLabelSelected,
                    ]}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Tags Display */}
        {selectedLanguages.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedLabel}>Selected:</Text>
            <View style={styles.tagsWrapper}>
              {selectedLanguages.map((lang) => (
                <View key={lang} style={styles.tag}>
                  <Text style={styles.tagText}>{lang}</Text>
                  <TouchableOpacity onPress={() => removeLanguage(lang)}>
                    <Feather name="x" size={14} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={()=>router.push("./Pass")}
          activeOpacity={0.8}
        >
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
    flexGrow: 1, // Ensures layout stretches to allow button at bottom if needed
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

  // Main Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  questionText: {
    fontSize: 15,
    color: THEME.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  listItemSelected: {
    borderColor: THEME.accent,
    backgroundColor: "rgba(0, 255, 255, 0.05)",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  listLabel: {
    fontSize: 16,
    color: THEME.textPrimary,
  },
  listLabelSelected: {
    fontWeight: "600",
    color: THEME.accent,
  },

  // Selected Tags
  selectedContainer: {
    marginBottom: 30,
  },
  selectedLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.chipBg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tagText: {
    color: "#FFF",
    fontSize: 14,
  },

  // Continue Button
  continueButton: {
    backgroundColor: THEME.accent, // Neon Button
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto", // Push to bottom if space allows
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonText: {
    color: THEME.buttonText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
  },
});
