import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  danger: "#FF4D4D", // Red for destructive actions
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  switchTrackOff: "#3A3045",
  switchTrackOn: "rgba(0, 255, 255, 0.5)",
  switchThumbOn: "#00FFFF",
  switchThumbOff: "#f4f3f4",
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [hideActivity, setHideActivity] = useState(true);
  const [hideOnline, setHideOnline] = useState(false);
  const [anonMatch, setAnonMatch] = useState(true);
  const [shareActivity, setShareActivity] = useState(true);

  const [pushNotifs, setPushNotifs] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(false);
  const [commAlerts, setCommAlerts] = useState(true);
  const [learningUpdates, setLearningUpdates] = useState(true);
  const [lowCredits, setLowCredits] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  // Actions
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is irreversible. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive" },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 30 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Preferences */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather name="edit-3" size={18} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Profile Preferences</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowLabel}>Edit Profile</Text>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Anonymity & Privacy */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather name="lock" size={18} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Anonymity & Privacy</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Hide Activity Status</Text>
              <Switch
                value={hideActivity}
                onValueChange={setHideActivity}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  hideActivity ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Hide Online Status</Text>
              <Switch
                value={hideOnline}
                onValueChange={setHideOnline}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  hideOnline ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Anonymous Match Only</Text>
              <Switch
                value={anonMatch}
                onValueChange={setAnonMatch}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  anonMatch ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Share Activity</Text>
              <Switch
                value={shareActivity}
                onValueChange={setShareActivity}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  shareActivity ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowLabel}>Block/Allow List</Text>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowLabel}>Password & Security</Text>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                We never store personal identifiers like phone number or email.
              </Text>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather name="bell" size={18} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <Switch
                value={pushNotifs}
                onValueChange={setPushNotifs}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  pushNotifs ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Session Reminders</Text>
              <Switch
                value={sessionReminders}
                onValueChange={setSessionReminders}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  sessionReminders ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Community Alerts</Text>
              <Switch
                value={commAlerts}
                onValueChange={setCommAlerts}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  commAlerts ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Learning Updates</Text>
              <Switch
                value={learningUpdates}
                onValueChange={setLearningUpdates}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  learningUpdates ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Low Credits Alert</Text>
              <Switch
                value={lowCredits}
                onValueChange={setLowCredits}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  lowCredits ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitlePlain}>Appearance</Text>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <View style={styles.iconRow}>
                <Feather name="moon" size={20} color={THEME.textPrimary} />
                <Text style={styles.rowLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: THEME.switchTrackOff,
                  true: THEME.switchTrackOn,
                }}
                thumbColor={
                  darkMode ? THEME.switchThumbOn : THEME.switchThumbOff
                }
              />
            </View>

            <TouchableOpacity style={styles.rowItem}>
              <View style={styles.iconRow}>
                <Feather name="globe" size={20} color={THEME.textPrimary} />
                <Text style={styles.rowLabel}>Language</Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Help & Support Links */}
        <View style={styles.card2}>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => router.push("../(tabs)/Support")}
          >
            <Text style={styles.rowLabel}>Help & Support</Text>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.rowItem}>
            <Text style={styles.rowLabel}>Safety & Moderation</Text>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Account Management */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather name="trash-2" size={18} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Account Management</Text>
          </View>

          <View style={styles.card}>
            {/* Clear History */}
            <TouchableOpacity style={styles.rowItem}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.rowLabel}>Clear Session History</Text>
                <Text style={styles.rowSub}>
                  Remove all session records (cannot be undone)
                </Text>
              </View>
              <Feather name="trash-2" size={20} color={THEME.textPrimary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Delete Account */}
            <TouchableOpacity
              style={styles.rowItem}
              onPress={handleDeleteAccount}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.rowLabel}>Delete Account</Text>
                <Text style={styles.rowSub}>
                  Permanently delete your account and all data
                </Text>
              </View>
              <Feather name="trash-2" size={20} color={THEME.textPrimary} />
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Account deletion is permanent and cannot be reversed. All your
                data will be completely removed from our systems.
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather
            name="log-out"
            size={20}
            color={THEME.danger}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Logout</Text>
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
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30, // Standardized header margin
    marginTop: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },

  // Sections
  sectionContainer: {
    marginBottom: 25, // Uniform spacing between sections
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
  },
  sectionTitlePlain: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
    marginBottom: 12,
    paddingLeft: 4,
  },

  // Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10, // Slightly reduced vertical padding inside card for better row balance
    borderWidth: 1,
    borderColor: THEME.border,
  },

  card2: {
    marginBottom: 25, // Uniform spacing between sections
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10, // Slightly reduced vertical padding inside card for better row balance
    borderWidth: 1,
    borderColor: THEME.border,
  },
  // Unified Row Style
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Consistent row height
  },
  rowLabel: {
    fontSize: 15,
    color: THEME.textPrimary,
  },
  rowSub: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 4,
  },

  // Icon Row Helper
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: -20, // Stretch divider to edges
    paddingHorizontal: 20,
  },

  // Info Box
  infoBox: {
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  infoText: {
    fontSize: 12,
    color: THEME.textSecondary,
    textAlign: "left",
    lineHeight: 18,
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: THEME.danger,
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 40,
  },
  logoutText: {
    color: THEME.danger,
    fontSize: 16,
    fontWeight: "600",
  },
});
