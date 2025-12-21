import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

// --- Interfaces ---
interface ChatMessage {
  id: string;
  sender: "User" | "Listener";
  text: string;
  time: string;
}

interface TicketDetails {
  id: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Closed" | "In Progress";
  userId: string;
  listenerId: string;
  date: string;
  userConcern: string;
  previousFlags: number;
  transcript: ChatMessage[];
}

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225", // Deep Purple
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  highBorder: "#FF4B4B",
  neonPurple: "#BF00FF", // Neon Purple
  neonGreen: "#39FF14", // Neon Green
};

export default function TicketReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNote, setAdminNote] = useState("");
  const [supportResponse, setSupportResponse] = useState("");

  useEffect(() => {
    const fetchTicketData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({
        id: id || "TKT-1234",
        category: "Payment Issue",
        priority: "High",
        status: "Open",
        userId: "USER-MNW72LS9",
        listenerId: "LIS-19FRHWKSIFN",
        date: "18 Dec 2025, 3:45 PM",
        userConcern:
          "I've been trying to process a payment for the last 2 hours but it keeps failing. I tried using two different cards and both showed 'transaction declined' even though I have sufficient balance.",
        previousFlags: 2,
        transcript: [
          {
            id: "1",
            sender: "User",
            text: "I keep getting a decline error...",
            time: "2:30 PM",
          },
          {
            id: "2",
            sender: "Listener",
            text: "I understand. Let me check the logs.",
            time: "2:31 PM",
          },
        ],
      });
      setLoading(false);
    };
    fetchTicketData();
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
      <Stack.Screen options={{ title: `Review: ${data.id}` }} />
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Overview Card */}
        <View style={styles.glassCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Concern Category</Text>
            <Text style={styles.val}>{data.category}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.highPill}>
              <Text style={styles.highPillText}>{data.priority}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{data.status}</Text>
            </View>
          </View>
        </View>

        {/* 2. User Concern */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color={COLORS.textMain}
            />
            <Text style={styles.cardTitle}>User Concern</Text>
          </View>
          <View style={styles.reasonBox}>
            <Text style={styles.concernText}>{data.userConcern}</Text>
          </View>
        </View>

        {/* 6. Admin Notes Section */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <Feather name="file-text" size={20} color={COLORS.textMain} />
            <Text style={styles.cardTitle}>Admin Notes</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Add internal notes about this ticket..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            value={adminNote}
            onChangeText={setAdminNote}
          />
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Add note</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Support Response Section */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="message-reply-text"
              size={20}
              color={COLORS.textMain}
            />
            <Text style={styles.cardTitle}>Support Response</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Write a response to the user..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            value={supportResponse}
            onChangeText={setSupportResponse}
          />
          <TouchableOpacity style={styles.neonBtn}>
            <Text style={styles.neonBtnText}>Send Response</Text>
          </TouchableOpacity>
        </View>

        {/* 8. Final Neon Resolution Buttons */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.neonProgressBtn} activeOpacity={0.7}>
            <Text style={styles.neonProgressText}>Mark in Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.neonResolveBtn} activeOpacity={0.7}>
            <Text style={styles.neonResolveText}>Resolve Ticket</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 15,
  },
  label: { color: COLORS.textSecondary, fontSize: 14 },
  val: { color: COLORS.textMain, fontSize: 14, fontWeight: "600" },
  reasonBox: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  concernText: { color: COLORS.textMain, fontSize: 14, lineHeight: 22 },
  highPill: {
    backgroundColor: "#000",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  highPillText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  statusPill: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  statusPillText: { color: COLORS.textMain, fontSize: 14 },
  buttonRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  secBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: "center",
  },
  secBtnText: { color: COLORS.textMain, fontWeight: "600" },
  chatPlaceholder: {
    height: 100,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    gap: 15,
  },
  actionLabel: { color: COLORS.textMain, fontSize: 15 },
  input: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 15,
    padding: 15,
    color: COLORS.textMain,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: "center",
  },
  actionBtnText: { color: COLORS.textMain, fontWeight: "bold" },
  neonBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  neonBtnText: { color: "#000", fontWeight: "bold" },

  // --- Final Resolution Neon Styles ---
  footerActions: { gap: 15, marginTop: 10, paddingBottom: 20 },
  neonProgressBtn: {
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.neonPurple,
    backgroundColor: "rgba(191, 0, 255, 0.05)",
    alignItems: "center",
    shadowColor: COLORS.neonPurple,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  neonProgressText: {
    color: COLORS.neonPurple,
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(191, 0, 255, 0.5)",
    textShadowRadius: 8,
  },
  neonResolveBtn: {
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.neonGreen,
    backgroundColor: "rgba(57, 255, 20, 0.05)",
    alignItems: "center",
    shadowColor: COLORS.neonGreen,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  neonResolveText: {
    color: COLORS.neonGreen,
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(57, 255, 20, 0.5)",
    textShadowRadius: 8,
  },
});
