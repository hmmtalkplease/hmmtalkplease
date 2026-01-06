import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

// --- MOCK DATABASE ---
const SESSIONS_DB: Record<string, any> = {
  "1": {
    id: "1",
    companion: "Sakura",
    rating: 3,
    date: "November 22, 2025",
    duration: "15 minutes",
    type: "Text Chat",
    cost: "₹125",
    mainIssue: "Anxiety",
    progress: { before: "Worried", after: "Relieved" },
    topics: ["Social Anxiety", "Performance Anxiety", "Coping Strategies"],
    notes:
      "Brief check-in session. Practiced grounding techniques and reviewed progress from previous sessions.",
  },
};

// --- COMPONENT START ---
// Ensure 'export default' is present here:
export default function SessionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Fallback to ID '1' if the ID passed doesn't exist in our mock DB
  const session = SESSIONS_DB[id as string] || SESSIONS_DB["1"];

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Session Details</Text>
          <Text style={styles.headerSubtitle}>
            Complete session information
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Session Title & Rating */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Session with {session.companion}
          </Text>
          <View style={styles.starRow}>
            {[...Array(5)].map((_, i) => (
              <MaterialCommunityIcons
                key={i}
                name="star"
                size={16}
                color={i < session.rating ? THEME.accent : "#555"}
              />
            ))}
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.infoCard}>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Date</Text>
              <Text style={styles.gridValue}>{session.date}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Duration</Text>
              <Text style={styles.gridValue}>{session.duration}</Text>
            </View>
          </View>

          <View style={[styles.gridRow, { marginTop: 15 }]}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Session Type</Text>
              <Text style={styles.gridValue}>{session.type}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Cost</Text>
              <Text style={[styles.gridValue, { color: THEME.accent }]}>
                {session.cost}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Issue */}
        <View style={styles.sectionContainer}>
          <View style={styles.iconTitleRow}>
            <MaterialCommunityIcons
              name="message-alert-outline"
              size={20}
              color={THEME.textPrimary}
            />
            <Text style={styles.sectionTitle}>Main Issue</Text>
          </View>
          <View style={styles.staticInputBox}>
            <Text style={styles.inputText}>{session.mainIssue}</Text>
          </View>
        </View>

        {/* Emotional Progress */}
        <View style={styles.sectionContainer}>
          <View style={styles.iconTitleRow}>
            <MaterialCommunityIcons
              name="chart-bar"
              size={20}
              color={THEME.textPrimary}
            />
            <Text style={styles.sectionTitle}>Emotional Progress</Text>
          </View>
          <View style={styles.progressRow}>
            <View style={styles.progressBox}>
              <Text style={styles.progressLabel}>Before Session</Text>
              <Text style={styles.progressValue}>
                {session.progress.before}
              </Text>
            </View>
            <View style={styles.progressBox}>
              <Text style={styles.progressLabel}>After Session</Text>
              <Text style={styles.progressValue}>{session.progress.after}</Text>
            </View>
          </View>
        </View>

        {/* Key Topics */}
        <View style={styles.sectionContainer}>
          <View style={styles.iconTitleRow}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={20}
              color={THEME.textPrimary}
            />
            <Text style={styles.sectionTitle}>Key Topics Discussed</Text>
          </View>
          <View style={styles.chipsContainer}>
            {session.topics.map((topic: string, index: number) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Session Notes */}
        <View style={styles.sectionContainer}>
          <View style={styles.iconTitleRow}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={20}
              color={THEME.textPrimary}
            />
            <Text style={styles.sectionTitle}>Session Notes</Text>
          </View>
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>{session.notes}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={20}
            color={THEME.buttonText}
          />
          <Text style={styles.primaryBtnText}>Book Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Feather name="download" size={20} color={THEME.textPrimary} />
          <Text style={styles.secondaryBtnText}>Download</Text>
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
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.cardBg,
  },

  // Main Card
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
  },
  starRow: {
    flexDirection: "row",
    gap: 2,
  },
  infoCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Generic Sections
  sectionContainer: {
    marginBottom: 25,
  },
  iconTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  staticInputBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  inputText: {
    color: THEME.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },

  // Progress
  progressRow: {
    flexDirection: "row",
    gap: 15,
  },
  progressBox: {
    flex: 1,
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  progressLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginBottom: 6,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Topics Chips
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  chipText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },

  // Notes
  notesBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  notesText: {
    color: THEME.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  // Footer Buttons
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 20,
    flexDirection: "row",
    gap: 15,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: THEME.accent,
    borderRadius: 30,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryBtnText: {
    color: THEME.buttonText,
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 30,
    height: 56,
    borderWidth: 1,
    borderColor: THEME.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryBtnText: {
    color: THEME.textPrimary,
    fontWeight: "600",
    fontSize: 16,
  },
});
