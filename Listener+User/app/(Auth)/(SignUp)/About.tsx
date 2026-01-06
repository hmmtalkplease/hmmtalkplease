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
import { Ionicons } from "@expo/vector-icons";

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
  radioBorder: "#A0A0A0",
};

// --- DATA ---
const ROLES = ["Student", "Professional", "Retired", "Homemaker", "Other"];

export default function AboutYouScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State
  const [age, setAge] = useState("24");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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
        <Text style={styles.headerTitle}>About You</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Tell us a bit about yourself</Text>
          <Text style={styles.cardSubHeader}>
            (Used only for better matching)
          </Text>

          {/* Age Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Age:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Enter age"
                placeholderTextColor={THEME.textSecondary}
              />
            </View>
          </View>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <Text style={styles.label}>I am a:</Text>

            <View style={styles.radioList}>
              {ROLES.map((role) => {
                const isSelected = selectedRole === role;
                return (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.radioItem,
                      isSelected && styles.radioItemSelected,
                    ]}
                    onPress={() => setSelectedRole(role)}
                    activeOpacity={0.8}
                  >
                    {/* Radio Circle */}
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInnerCircle} />}
                    </View>

                    <Text
                      style={[
                        styles.radioLabel,
                        isSelected && styles.radioLabelSelected,
                      ]}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("./Lang")}
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
    flexGrow: 1,
    justifyContent: "space-between", // Pushes button to bottom if content is short
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
    marginBottom: 30,
  },
  cardHeader: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardSubHeader: {
    fontSize: 13,
    color: THEME.textSecondary,
    marginBottom: 25,
  },

  // Input Styles
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    color: THEME.textPrimary,
    marginBottom: 12,
    fontWeight: "500",
  },
  inputContainer: {
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    color: THEME.textPrimary,
  },

  // Radio List
  roleSection: {
    marginBottom: 10,
  },
  radioList: {
    gap: 12,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 25, // Pill shape
    borderWidth: 1,
    borderColor: "transparent",
  },
  radioItemSelected: {
    borderColor: THEME.accent,
    backgroundColor: "rgba(0, 255, 255, 0.05)",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: THEME.accent,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.accent,
  },
  radioLabel: {
    fontSize: 15,
    color: THEME.textSecondary,
  },
  radioLabelSelected: {
    color: THEME.textPrimary,
    fontWeight: "600",
  },

  // Continue Button
  continueButton: {
    backgroundColor: THEME.accent, // Neon Button
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
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
