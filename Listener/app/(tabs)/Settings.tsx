import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  destructive: "#FF4B4B",
  itemBg: "rgba(255, 255, 255, 0.05)",
};

interface SettingItemProps {
  label: string;
  subtext?: string;
  onPress?: () => void;
  isLast?: boolean;
  isDestructive?: boolean;
  rightElement?: React.ReactNode;
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingItem = ({
  label,
  subtext,
  onPress,
  isLast,
  isDestructive,
  rightElement,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, isLast && styles.lastItemContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemTextContent}>
        <Text
          style={[styles.itemLabel, isDestructive && styles.destructiveText]}
        >
          {label}
        </Text>
        {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>

      {rightElement ? rightElement : <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
};

const SettingSection = ({ title, children }: SettingSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            <SettingSection title="Account Management">
              <SettingItem
                label="Change Password"
                onPress={() => router.push("/settings/ChangePass")}
                isLast={true}
              />
            </SettingSection>

            <SettingSection title="Listener Compliance">
              <SettingItem
                label="Qualification Documents"
                subtext="Verification Pending"
                onPress={() => router.push("/settings/QualificationUpload")}
                isLast={true}
              />
            </SettingSection>

            <SettingSection title="General & Support">
              <SettingItem
                label="Dark Mode"
                rightElement={
                  <Switch
                    trackColor={{ false: "#3E3E3E", true: COLORS.accent }}
                    thumbColor={"#ffffff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsDarkMode(!isDarkMode)}
                    value={isDarkMode}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  />
                }
              />
              <SettingItem
                label="Contact Support"
                onPress={() => router.push("/settings/ContactSupport")}
              />
              <SettingItem
                label="Delete Account"
                isDestructive
                onPress={() => router.push("/settings/DeleteAccount")}
                isLast={true}
              />
            </SettingSection>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 12,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.itemBg,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 10,
  },
  lastItemContainer: {
    marginBottom: 0,
  },
  itemTextContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: 15,
    color: COLORS.textMain,
    fontWeight: "500",
  },
  subtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  destructiveText: {
    color: COLORS.destructive,
    fontWeight: "600",
  },
  chevron: {
    fontSize: 24,
    color: COLORS.accent,
    fontWeight: "300",
    marginLeft: 10,
  },
});
