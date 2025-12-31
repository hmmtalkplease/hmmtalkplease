import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  destructive: "#FF4B4B",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
};

const DeleteAccountScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Important Warning Box (Glass with Red Accent) */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Important Warning</Text>
          <Text style={styles.warningText}>
            Deleting your account is permanent and cannot be undone.
          </Text>
          <Text style={[styles.warningText, { marginTop: 15 }]}>
            All your data, session history, qualifications and earnings will be
            permanently lost.
          </Text>
        </View>

        {/* Info Box (Standard Glass) */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>What will be deleted:</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              • Your listener profile and credentials.
            </Text>
            <Text style={styles.listItem}>
              • All session history and earnings.
            </Text>
            <Text style={styles.listItem}>
              • Uploaded qualification documents.
            </Text>
            <Text style={styles.listItem}>
              • Access to the listener platform.
            </Text>
          </View>
        </View>

        {/* Checkbox Section */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isChecked && styles.checkboxSelected]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            I understand this action is irreversible and all my data will be
            permanently deleted.
          </Text>
        </TouchableOpacity>

        {/* Delete Button (Thematic Change: Outline or Solid Red) */}
        <TouchableOpacity
          style={[styles.deleteButton, !isChecked && styles.disabledButton]}
          disabled={!isChecked}
        >
          <Text style={styles.deleteButtonText}>
            Permanently Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 20,
  },

  warningBox: {
    backgroundColor: "rgba(255, 75, 75, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 75, 75, 0.3)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  warningTitle: {
    color: COLORS.destructive,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  warningText: {
    color: COLORS.textMain,
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },

  infoBox: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 15,
  },
  listContainer: {
    gap: 10,
  },
  listItem: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.glassBorder,
    borderRadius: 6,
    backgroundColor: COLORS.glass,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  checkboxSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  checkmark: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  deleteButton: {
    borderWidth: 1.5,
    borderColor: COLORS.destructive,
    borderRadius: 15,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.3,
    borderColor: COLORS.textSecondary,
  },
  deleteButtonText: {
    color: COLORS.destructive,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default () => (
  <SafeAreaProvider>
    <DeleteAccountScreen />
  </SafeAreaProvider>
);
