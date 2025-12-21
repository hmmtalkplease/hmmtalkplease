import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// --- Interfaces for Type Safety ---

interface ReportDetails {
  id: string;
  userId: string;
  listenerId: string;
  date: string;
  reason: string;
  severity: "High" | "Medium" | "Low";
  previousFlags: number;
}

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225", // Deep Purple
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  high: "#FF4B4B",
};

// --- Sub-Component: Case Summary ---
const CaseSummary: React.FC<{ data: ReportDetails }> = ({ data }) => (
  <View style={styles.glassCard}>
    <View style={styles.cardHeader}>
      <Feather name="user" size={20} color={COLORS.textMain} />
      <Text style={styles.cardTitle}>Case Summary</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>User ID</Text>
      <Text style={styles.summaryValue}>{data.userId}</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Listener ID</Text>
      <Text style={styles.summaryValue}>{data.listenerId}</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Session Date</Text>
      <Text style={styles.summaryValue}>{data.date}</Text>
    </View>
    <Text style={styles.sectionLabel}>Reason for Flag</Text>
    <View style={styles.reasonBox}>
      <Text style={styles.reasonText}>{data.reason}</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Severity Level</Text>
      <View
        style={[
          styles.priorityPill,
          {
            backgroundColor:
              data.severity === "High" ? COLORS.high : "rgba(255,255,255,0.1)",
          },
        ]}
      >
        <Text style={styles.priorityPillText}>{data.severity}</Text>
      </View>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Previous Flags</Text>
      <Text style={styles.summaryValue}>{data.previousFlags} reports</Text>
    </View>
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>View User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>View Listener</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- Sub-Component: Chat Transcript ---
const ChatTranscript = () => (
  <View style={styles.glassCard}>
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons
        name="chat-outline"
        size={20}
        color={COLORS.textMain}
      />
      <Text style={styles.cardTitle}>Chat Transcript</Text>
    </View>
    <View style={styles.chatBubbleLeft}>
      <View style={styles.bubbleInner} />
      <Text style={styles.chatTime}>2:30 PM</Text>
    </View>
    <View style={styles.chatBubbleRight}>
      <View style={styles.bubbleInnerRight} />
      <Text style={styles.chatTime}>2:31 PM</Text>
    </View>
  </View>
);

// --- Sub-Component: Admin Actions ---
const AdminActions = () => (
  <View style={styles.glassCard}>
    <View style={styles.cardHeader}>
      <Feather name="user-check" size={20} color={COLORS.textMain} />
      <Text style={styles.cardTitle}>Admin Actions</Text>
    </View>
    {["Warn User", "Suspend User", "Dismiss Flag", "Add Internal Notes"].map(
      (label, i) => (
        <TouchableOpacity key={i} style={styles.actionItem}>
          <Feather name="chevron-right" size={18} color={COLORS.accent} />
          <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
      )
    )}
  </View>
);

// --- Main Dynamic Screen ---
export default function ReportReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Extract dynamic ID
  const [data, setData] = useState<ReportDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      // Simulate API fetch based on ID
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({
        id: id || "UNKNOWN",
        userId: "USER-MNW72LS9",
        listenerId: "LIS-19FRHWKSIFN",
        date: "28 Nov 2025, 2:30 PM",
        reason:
          "Unprofessional behavior reported during high-intensity session",
        severity: "High",
        previousFlags: 2,
      });
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading || !data) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Update Header Title Dynamically */}
      <Stack.Screen options={{ title: `Review: ${data.id}` }} />
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CaseSummary data={data} />
        <ChatTranscript />
        <AdminActions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: "center", alignItems: "center" },
  scrollContent: { padding: 20, paddingTop: 10, paddingBottom: 40 },
  glassCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  cardTitle: { color: COLORS.textMain, fontSize: 18, fontWeight: "bold" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  summaryLabel: { color: COLORS.textSecondary, fontSize: 14 },
  summaryValue: { color: COLORS.textMain, fontSize: 14, fontWeight: "600" },
  sectionLabel: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 10 },
  reasonBox: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  reasonText: { color: COLORS.textMain, fontSize: 14, lineHeight: 20 },
  priorityPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  priorityPillText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  secondaryButtonText: { color: COLORS.textMain, fontWeight: "600" },
  chatBubbleLeft: { alignSelf: "flex-start", marginBottom: 15, width: "70%" },
  chatBubbleRight: {
    alignSelf: "flex-end",
    marginBottom: 15,
    width: "70%",
    alignItems: "flex-end",
  },
  bubbleInner: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    width: "100%",
  },
  bubbleInnerRight: {
    height: 40,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    width: "100%",
  },
  chatTime: { color: COLORS.textSecondary, fontSize: 10, marginTop: 4 },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    gap: 15,
  },
  actionLabel: { color: COLORS.textMain, fontSize: 15, fontWeight: "500" },
});
