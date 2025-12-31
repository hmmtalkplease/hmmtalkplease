import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF", // Neon Blue
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225", // Dark text for neon buttons
  slotSelectedBg: "rgba(0, 255, 255, 0.1)",
  slotSelectedBorder: "#00FFFF",
  slotDefaultBg: "rgba(255, 255, 255, 0.05)",
};

// --- MOCK DATABASE ---
const LISTENERS_DB: Record<string, any> = {
  "123": {
    id: "123",
    name: "Listener #123",
    bio: "Experienced listener specializing in anxiety and stress management. Available for empathetic, non-judgmental support.",
    rating: "4.8",
    sessions: "120+",
    experience: "2 yrs",
    slots: [
      "Today, 3:00 PM - 4:00 PM",
      "Today, 5:00 PM - 6:00 PM",
      "Tomorrow, 10:00 AM - 11:00 AM",
      "Tomorrow, 2:00 PM - 3:00 PM",
    ],
  },
  "456": {
    id: "456",
    name: "Listener #456",
    bio: "Certified life coach focusing on career transitions and workplace dynamics. Let’s chart your path forward.",
    rating: "4.9",
    sessions: "85+",
    experience: "4 yrs",
    slots: ["Today, 6:00 PM - 7:00 PM", "Tomorrow, 9:00 AM - 10:00 AM"],
  },
};

const DURATIONS = ["30 minutes", "45 minutes", "60 minutes"];

export default function ListenerProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // Load data or fallback to default
  const listener = LISTENERS_DB[id as string] || LISTENERS_DB["123"];

  // State
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState("60 minutes");
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

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
        <Text style={styles.headerTitle}>{listener.name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={60} color={THEME.textPrimary} />
          </View>
        </View>

        {/* Bio Card */}
        <View style={styles.bioCard}>
          <Text style={styles.bioText}>{listener.bio}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{listener.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{listener.sessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{listener.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
        </View>

        {/* Certification Preview */}
        <View style={styles.certCard}>
          <View style={styles.certHeader}>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={20}
              color={THEME.textSecondary}
            />
            <Text style={styles.certTitle}>Certification Preview</Text>
          </View>
          <View style={styles.certPlaceholder}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={48}
              color={THEME.border}
            />
          </View>
        </View>

        {/* Availability Slots */}
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 15,
            }}
          >
            <Feather name="calendar" size={18} color={THEME.textSecondary} />
            <Text style={styles.sectionTitle}>Availability</Text>
          </View>

          <View style={styles.slotsContainer}>
            {listener.slots.map((slot: string, index: number) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.slotCard,
                    isSelected
                      ? styles.slotCardSelected
                      : styles.slotCardDefault,
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.slotText,
                      isSelected && { fontWeight: "bold", color: THEME.accent },
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Session Duration */}
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 15,
            }}
          >
            <Feather name="clock" size={18} color={THEME.textSecondary} />
            <Text style={styles.sectionTitle}>Session Duration</Text>
          </View>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowDurationDropdown(!showDurationDropdown)}
          >
            <Text style={styles.dropdownText}>{selectedDuration}</Text>
            <Feather
              name={showDurationDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={THEME.textPrimary}
            />
          </TouchableOpacity>

          {showDurationDropdown && (
            <View style={styles.dropdownList}>
              {DURATIONS.map((dur) => (
                <TouchableOpacity
                  key={dur}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedDuration(dur);
                    setShowDurationDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{dur}</Text>
                  {selectedDuration === dur && (
                    <Feather name="check" size={16} color={THEME.accent} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Footer Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book a session</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
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

  // Avatar
  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },

  // Bio Card
  bioCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  bioText: {
    color: THEME.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },

  // Stats Row
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Cert Card
  certCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  certHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  certTitle: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  certPlaceholder: {
    height: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  // Availability
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "600",
  },
  slotsContainer: {
    gap: 12,
  },
  slotCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  slotCardDefault: {
    backgroundColor: THEME.slotDefaultBg,
    borderColor: THEME.border,
  },
  slotCardSelected: {
    backgroundColor: THEME.slotSelectedBg,
    borderColor: THEME.slotSelectedBorder,
  },
  slotText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },

  // Duration Dropdown
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  dropdownText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    padding: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  dropdownItemText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.background,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
  },
  bookButton: {
    backgroundColor: THEME.accent, // Neon Blue
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  bookButtonText: {
    color: THEME.buttonText, // Dark Text for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
});
