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
  success: "#00FF9D", // Neon Green
  warning: "#FFD700", // Gold
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

// --- MOCK DATA ---
const USER_ID = "USER-A7K3M9P2";

export default function AccountCreatedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(USER_ID);
    Alert.alert("Copied", "User ID copied to clipboard");
  };

  const handleAction = (action: string) => {
    Alert.alert("Action", `${action} feature would trigger here.`);
  };

  const handleStart = () => {
    if (!isSaved) {
      Alert.alert(
        "Confirmation Required",
        "Please confirm that you have saved your User ID."
      );
      return;
    }

    router.replace("../Login");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.headerSection}>
          <View style={styles.successBadge}>
            <MaterialCommunityIcons
              name="check-decagram"
              size={80}
              color={THEME.success}
            />
          </View>
          <Text style={styles.title}>Account Created!</Text>
          <Text style={styles.subtitle}>Welcome, Naruto!</Text>
        </View>

        {/* Warning / ID Card */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <MaterialCommunityIcons
              name="alert"
              size={20}
              color={THEME.warning}
            />
            <Text style={styles.warningLabel}>Save your USER ID:</Text>
          </View>

          <View style={styles.idBox}>
            <Text style={styles.idText}>{USER_ID}</Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
              <MaterialCommunityIcons
                name="content-copy"
                size={20}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.warningNote}>
            You’ll need this ID to login. We cannot recover your account without
            it.
          </Text>
        </View>

        {/* Ways to Save */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsLabel}>Ways to save:</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction("Email")}
          >
            <Feather name="mail" size={18} color={THEME.textPrimary} />
            <Text style={styles.actionText}>Email to myself</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction("Download")}
          >
            <Feather name="download" size={18} color={THEME.textPrimary} />
            <Text style={styles.actionText}>Download as text file</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction("Screenshot")}
          >
            <Feather name="crop" size={18} color={THEME.textPrimary} />
            <Text style={styles.actionText}>Take a screenshot</Text>
          </TouchableOpacity>
        </View>

        {/* Confirmation Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          activeOpacity={0.8}
          onPress={() => setIsSaved(!isSaved)}
        >
          <View style={[styles.checkbox, isSaved && styles.checkboxChecked]}>
            {isSaved && (
              <Feather name="check" size={14} color={THEME.buttonText} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>I've saved my User ID</Text>
        </TouchableOpacity>

        {/* Start Button */}
        <TouchableOpacity
          style={[styles.startButton, !isSaved && styles.startButtonDisabled]}
          onPress={handleStart}
          disabled={!isSaved}
        >
          <Text style={styles.startButtonText}>Start using Hmm Talk</Text>
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
    paddingHorizontal: 25,
    paddingTop: 40,
    alignItems: "center",
  },

  // Header
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  successBadge: {
    marginBottom: 15,
    shadowColor: THEME.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
  },

  // Warning Card
  warningCard: {
    width: "100%",
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
    alignItems: "center",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 8,
  },
  warningLabel: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "600",
  },
  idBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.inputBg,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  idText: {
    color: THEME.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  copyBtn: {
    padding: 5,
  },
  warningNote: {
    fontSize: 13,
    color: THEME.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },

  // Actions
  actionsSection: {
    width: "100%",
    marginBottom: 40,
    gap: 12,
  },
  actionsLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: "transparent",
    gap: 10,
  },
  actionText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },

  // Checkbox
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  checkboxLabel: {
    color: THEME.textSecondary,
    fontSize: 15,
  },

  // Start Button
  startButton: {
    width: "100%",
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
  startButtonDisabled: {
    backgroundColor: THEME.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
