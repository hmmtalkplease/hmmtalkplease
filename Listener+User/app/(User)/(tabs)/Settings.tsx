import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  danger: "#FF453A",
  buttonText: "#1A1225",
  switchTrackActive: "rgba(0, 255, 255, 0.4)",
  switchTrackInactive: "#3A3045",
  switchThumbActive: "#00FFFF",
  switchThumbInactive: "#A0A0A0",
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE MANAGEMENT ---
  const [passwordExpanded, setPasswordExpanded] = useState(false);

  const [toggles, setToggles] = useState({
    hideActivity: true,
    hideOnline: false,
    anonMatch: true,
    shareActivity: true,
    pushNotifs: true,
    sessionReminders: false,
    communityAlerts: true,
    learningUpdates: true,
    lowCredits: true,
    darkMode: true,
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePasswordSection = () => {
    setPasswordExpanded(!passwordExpanded);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Fixed Padding */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Customize your experience</Text>
          </View>
        </View>

        {/* --- SECTION 1: PROFILE PREFERENCES --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="edit-2" size={20} color={THEME.textPrimary} />
            <Text style={styles.cardTitle}>Profile Preferences</Text>
          </View>

          <View style={styles.cardContent}>
            <TouchableOpacity style={styles.dropdownHeader}>
              <Text style={styles.cardTitle}>Edit Profile</Text>
              <Feather
                name="chevron-down"
                size={20}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Pseudonym Category</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>Cities</Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Choose Pseudonym</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>Tokyo</Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value="24"
                keyboardType="numeric"
                placeholderTextColor={THEME.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>Professional</Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Languages</Text>
              <View style={styles.chipContainer}>
                {["English", "Hindi"].map((lang) => (
                  <View key={lang} style={[styles.chip, styles.chipActive]}>
                    <Text style={styles.chipTextActive}>{lang}</Text>
                  </View>
                ))}
                {["Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"].map(
                  (lang) => (
                    <View key={lang} style={styles.chip}>
                      <Text style={styles.chipText}>{lang}</Text>
                    </View>
                  )
                )}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Current Emotional State</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>Hopeful</Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SECTION 2: ANONYMITY & PRIVACY --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="lock" size={20} color={THEME.textPrimary} />
            <Text style={styles.cardTitle}>Anonymity & Privacy</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Hide Activity Status</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.hideActivity
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("hideActivity")}
                value={toggles.hideActivity}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Hide Online Status</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.hideOnline
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("hideOnline")}
                value={toggles.hideOnline}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Anonymous Match Only</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.anonMatch
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("anonMatch")}
                value={toggles.anonMatch}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Share Activity</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.shareActivity
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("shareActivity")}
                value={toggles.shareActivity}
              />
            </View>

            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkLabel}>Block/ Allow List</Text>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* --- PASSWORD ACCORDION --- */}
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={togglePasswordSection}
              activeOpacity={0.7}
            >
              <Text style={styles.accordionTitle}>Password & Security</Text>
              <Feather
                name={passwordExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>

            {passwordExpanded && (
              <View style={styles.accordionContent}>
                <TouchableOpacity
                  style={styles.linkRow}
                  onPress={() =>
                    router.push("../(Screens)/(Setting)/(Reset)/ResetPass")
                  }
                >
                  <Text style={styles.subLinkText}>Reset Password</Text>
                  <Feather
                    name="chevron-right"
                    size={16}
                    color={THEME.textSecondary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkRow}
                  onPress={() =>
                    router.push("../(Screens)/(Setting)/(Reset)/ResetQuestion")
                  }
                >
                  <Text style={styles.subLinkText}>
                    Reset Security Question
                  </Text>
                  <Feather
                    name="chevron-right"
                    size={16}
                    color={THEME.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                We never store personal identifiers like phone number or email.
              </Text>
            </View>
          </View>
        </View>

        {/* --- SECTION 3: NOTIFICATIONS --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="bell" size={20} color={THEME.textPrimary} />
            <Text style={styles.cardTitle}>Notifications</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Push Notifications</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.pushNotifs
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("pushNotifs")}
                value={toggles.pushNotifs}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Session Reminders</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.sessionReminders
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("sessionReminders")}
                value={toggles.sessionReminders}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Community Alerts</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.communityAlerts
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("communityAlerts")}
                value={toggles.communityAlerts}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Learning Updates</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.learningUpdates
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("learningUpdates")}
                value={toggles.learningUpdates}
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Low Credits Alert</Text>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.lowCredits
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("lowCredits")}
                value={toggles.lowCredits}
              />
            </View>
          </View>
        </View>

        {/* --- SECTION 4: APPEARANCE --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Appearance</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.toggleRow}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Feather name="moon" size={18} color={THEME.textPrimary} />
                <Text style={styles.toggleLabel}>Dark Mode</Text>
              </View>
              <Switch
                trackColor={{
                  false: THEME.switchTrackInactive,
                  true: THEME.switchTrackActive,
                }}
                thumbColor={
                  toggles.darkMode
                    ? THEME.switchThumbActive
                    : THEME.switchThumbInactive
                }
                onValueChange={() => toggleSwitch("darkMode")}
                value={toggles.darkMode}
              />
            </View>

            <TouchableOpacity style={styles.linkRow}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Feather name="globe" size={18} color={THEME.textPrimary} />
                <Text style={styles.linkLabel}>Language</Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SECTION 5: (Help & Moderation) --- */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.linkRowSimple} onPress={()=> router.push("../(Screens)/(Setting)/(Help)/HelpSupp")}>
            <Text style={styles.cardTitle}>Help & Support</Text>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.linkRowSimple}
            onPress={() =>
              router.push(
                "../(Screens)/(Explore)/(Moderation)/Moderation-Safety"
              )
            }
          >
            <Text style={styles.cardTitle}>Safety & Moderation</Text>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* --- SECTION 6: ACCOUNT MANAGEMENT --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="trash-2" size={20} color={THEME.textPrimary} />
            <Text style={styles.cardTitle}>Account Management</Text>
          </View>

          <View style={styles.cardContent}>
            <TouchableOpacity style={styles.actionRow}>
              <View>
                <Text style={styles.actionTitle}>Clear Session History</Text>
                <Text style={styles.actionSub}>
                  Remove all session records (cannot be undone)
                </Text>
              </View>
              <Feather name="trash" size={20} color={THEME.textPrimary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.actionRow}>
              <View>
                <Text style={styles.actionTitle}>Delete Account</Text>
                <Text style={styles.actionSub}>
                  Permanently delete your account and all data
                </Text>
              </View>
              <Feather name="trash" size={20} color={THEME.textPrimary} />
            </TouchableOpacity>

            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                Account deletion is permanent and cannot be reversed. All your
                data will be completely removed from our systems.
              </Text>
            </View>
          </View>
        </View>

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color={THEME.danger} />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20, // Added explicit marginTop for visual separation
    paddingHorizontal: 20, // Correct padding inside header
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

  // Card Common Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: "hidden", // Ensures inner items stay within border radius
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
  },

  // Edit Profile Specific
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  // Form Styles
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: THEME.inputBg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: THEME.inputBg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    color: THEME.textPrimary,
    fontSize: 14,
  },
  inputText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  chipActive: {
    backgroundColor: "white", // High contrast
    borderColor: THEME.textPrimary,
  },
  chipText: {
    color: THEME.textSecondary,
    fontSize: 12,
  },
  chipTextActive: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: THEME.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: THEME.buttonText,
    fontWeight: "bold",
    fontSize: 16,
  },

  // Toggles & Links
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 14,
    color: THEME.textPrimary,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  linkRowSimple: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  linkLabel: {
    fontSize: 14,
    color: THEME.textPrimary,
  },
  subLinkText: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.border,
    marginVertical: 10,
  },

  // Accordion
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  accordionTitle: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  accordionContent: {
    marginLeft: 5,
    marginBottom: 5,
  },

  // Info Boxes
  infoBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  infoBoxText: {
    color: THEME.textSecondary,
    fontSize: 11,
    fontStyle: "italic",
  },

  // Account Actions
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  actionTitle: {
    color: THEME.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  actionSub: {
    color: THEME.textSecondary,
    fontSize: 11,
    maxWidth: "85%",
  },
  warningBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: THEME.textSecondary,
  },
  warningText: {
    color: THEME.textSecondary,
    fontSize: 11,
    lineHeight: 18,
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: THEME.danger,
    borderRadius: 30,
  },
  logoutText: {
    color: THEME.danger,
    fontSize: 16,
    fontWeight: "600",
  },
});
