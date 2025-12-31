import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// --- Interfaces for Type Safety ---

type Priority = "High" | "Medium" | "Low";

interface FlaggedReport {
  id: string;
  userId: string;
  listenerId: string;
  issue: string;
  date: string;
  priority: Priority;
}

interface SeverityReport {
  id: string;
  userId: string;
  issue: string;
  date: string;
}

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225", // Deep Purple background
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan accent
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  high: "#FF4B4B", // Neon Red
  medium: "#FFD700", // Neon Gold
  low: "#4CD964", // Neon Green
  urgentBg: "#000000",
};

// --- Sub-Component: Flagged Report Card ---

const ReportCard: React.FC<{ report: FlaggedReport }> = ({ report }) => {
  const getPriorityStyle = (p: Priority) => {
    switch (p) {
      case "High":
        return { color: COLORS.high, bg: "rgba(255, 75, 75, 0.1)" };
      case "Medium":
        return { color: COLORS.medium, bg: "rgba(255, 215, 0, 0.1)" };
      case "Low":
        return { color: COLORS.low, bg: "rgba(76, 217, 100, 0.1)" };
    }
  };

  const pStyle = getPriorityStyle(report.priority);

  return (
    <View style={styles.card}>
      <View style={styles.cardContentRow}>
        <View style={styles.detailsContainer}>
          <Feather
            name="alert-triangle"
            size={20}
            color={pStyle.color}
            style={styles.alertIcon}
          />
          <View>
            <Text style={styles.detailText}>
              <Text style={styles.label}>User: </Text>
              {report.userId}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Listener: </Text>
              {report.listenerId}
            </Text>
            <Text style={styles.issueText} numberOfLines={2}>
              {report.issue}
            </Text>
            <Text style={styles.dateText}>{report.date}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View
            style={[
              styles.priorityPill,
              { backgroundColor: pStyle.bg, borderColor: pStyle.color },
            ]}
          >
            <Text style={[styles.priorityText, { color: pStyle.color }]}>
              {report.priority}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.reviewButtonOutline}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/Reports/[id]",
                params: { id: report.id },
              })
            }
          >
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Sub-Component: High Severity Item ---

const HighSeverityItem: React.FC<{ report: SeverityReport }> = ({ report }) => (
  <View style={styles.itemCard}>
    <View style={styles.itemInfo}>
      <Text style={styles.userId}>{report.userId}</Text>
      <Text style={styles.issueTextSmall}>{report.issue}</Text>
      <Text style={styles.dateText}>{report.date}</Text>
    </View>
    <TouchableOpacity
      style={styles.reviewButtonOutline}
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: "/Reports/[id]",
          params: { id: report.id },
        })
      }
    >
      <Text style={styles.reviewButtonText}>Review</Text>
    </TouchableOpacity>
  </View>
);

// --- Main Screen (Default Export) ---

export default function AdminMonitoringScreen() {
  const [loading, setLoading] = useState<boolean>(true);

  // Mock Data
  const flaggedData: FlaggedReport[] = [
    {
      id: "R-1",
      userId: "USER-268FJ2H9O3",
      listenerId: "LIS-8281D2H9O3",
      issue: "Inappropriate language detected in conversation",
      date: "2 Dec 2025",
      priority: "High",
    },
    {
      id: "R-2",
      userId: "USER-268FJ2H9O3",
      listenerId: "LIS-8281D2H9O3",
      issue: "Policy violation reported by listener",
      date: "3 Dec 2025",
      priority: "Medium",
    },
  ];

  const severityData: SeverityReport[] = [
    {
      id: "S-1",
      userId: "USER-MNW72LS9",
      issue: "Unprofessional behavior reported",
      date: "28 Nov 2025",
    },
    {
      id: "S-2",
      userId: "USER-MNW72LS9",
      issue: "Unprofessional behavior reported",
      date: "28 Nov 2025",
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: Flagged Reports */}
        <View style={styles.sectionHeader}>
          <View style={styles.titleRow}>
            <Feather name="alert-triangle" size={24} color={COLORS.textMain} />
            <Text style={styles.sectionTitle}>Flagged Reports</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{flaggedData.length} Pending</Text>
          </View>
        </View>

        {flaggedData.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}

        {/* SECTION 2: High Severity Queue */}
        <View style={[styles.sectionHeader, { marginTop: 25 }]}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons
              name="shield-outline"
              size={28}
              color={COLORS.textMain}
            />
            <Text style={styles.sectionTitle}>High Severity Queue</Text>
          </View>
          <View style={styles.urgentPill}>
            <Text style={styles.urgentText}>{severityData.length} Urgent</Text>
          </View>
        </View>
        <Text style={styles.subText}>Requires immediate attention</Text>

        {severityData.map((report) => (
          <HighSeverityItem key={report.id} report={report} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },

  // Header Styles
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  countPill: {
    backgroundColor: COLORS.glass,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  countText: { color: COLORS.textMain, fontSize: 12, fontWeight: "600" },
  urgentPill: {
    backgroundColor: COLORS.urgentBg,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  urgentText: { color: COLORS.textMain, fontSize: 12, fontWeight: "bold" },
  subText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 15,
    marginLeft: 38,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardContentRow: { flexDirection: "row", justifyContent: "space-between" },
  detailsContainer: { flexDirection: "row", flex: 1, paddingRight: 10 },
  alertIcon: { marginTop: 2, marginRight: 10 },
  label: { color: COLORS.textSecondary, fontWeight: "normal" },
  detailText: {
    color: COLORS.textMain,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  issueText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 18,
  },
  dateText: { color: COLORS.textSecondary, fontSize: 12 },

  // High Severity Item Specifics
  itemCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  itemInfo: { flex: 1 },
  userId: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  issueTextSmall: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },

  // Action Buttons
  actionsContainer: { justifyContent: "space-between", alignItems: "flex-end" },
  priorityPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    marginBottom: 10,
  },
  priorityText: { fontSize: 11, fontWeight: "bold" },
  reviewButtonOutline: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: "rgba(0, 255, 255, 0.05)",
  },
  reviewButtonText: { color: COLORS.accent, fontSize: 13, fontWeight: "600" },
});
