import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.4)",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
};

// --- Reusable Thematic Components ---

const GlassCard = ({ title, icon, children, style }: any) => (
  <View style={[styles.glassCard, style]}>
    {title && (
      <View style={styles.cardHeader}>
        <View style={styles.headerTitleRow}>
          {icon}
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </View>
    )}
    {children}
  </View>
);

const AdminActionBtn = ({ label, icon, color = COLORS.textPrimary }: any) => (
  <TouchableOpacity style={styles.adminActionBtn}>
    <View style={[styles.actionIconContainer, { borderColor: color }]}>
      {icon}
    </View>
    <Text style={[styles.adminActionLabel, { color }]}>{label}</Text>
  </TouchableOpacity>
);

export default function ListenerDetailScreen() {
  const { id } = useLocalSearchParams(); // Dynamic route param

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge} />
            <Text style={styles.profileName}>Listener- {id || "H7K6W9P2"}</Text>
            <Text style={styles.joinedDate}>Joined: 18 Oct 2025</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          {/* 3. Certification Preview */}
          <GlassCard
            title="Certification Preview"
            icon={<Feather name="file-text" size={18} color={COLORS.accent} />}
          >
            <View style={styles.certPlaceholder}>
              <MaterialCommunityIcons
                name="file-certificate"
                size={40}
                color="rgba(255,255,255,0.2)"
              />
              <View style={styles.skeletonLineSmall} />
            </View>
          </GlassCard>
          {/* 3. Rating Overview */}
          <GlassCard
            title="Rating Overview"
            icon={<Feather name="star" size={18} color={COLORS.accent} />}
          >
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Average Rating</Text>
              <Text style={styles.metricValue}>4.8/5.0</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Total Sessions</Text>
              <Text style={styles.metricValue}>127</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Completion Rate</Text>
              <Text style={styles.metricValue}>95%</Text>
            </View>
          </GlassCard>
          {/* 9. Session History */}
          <GlassCard
            title="Session History"
            icon={<Feather name="calendar" size={18} color={COLORS.accent} />}
          >
            <View style={styles.sessionCard}>
              <View style={styles.sessionHeaderRow}>
                <Text style={styles.sessionTitle}>SES-1234</Text>
                <View style={styles.compBadge}>
                  <Text style={styles.compText}>Completed</Text>
                </View>
              </View>
              <Text style={styles.sessionMeta}>2 Dec 2025, 3:30 PM</Text>
              <View style={styles.sessionFooterRow}>
                <Text style={styles.sessionMeta}>Duration: 45 min</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Anxiety</Text>
                </View>
              </View>
            </View>
          </GlassCard>
          {/* 5. Dispute Reports */}
          <GlassCard
            title="Dispute Reports"
            icon={
              <Feather name="alert-circle" size={18} color={COLORS.error} />
            }
          >
            {["High", "Medium", "Low"].map((priority, i) => (
              <View key={i} style={styles.disputeItem}>
                <View>
                  <Text style={styles.disputeUser}>USER-MNW72LS9</Text>
                  <Text style={styles.disputeDesc}>
                    Unproffessional behavior reported
                  </Text>
                  <Text style={styles.disputeDate}>28 Nov 2025</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        priority === "High" ? "#000" : COLORS.glass,
                    },
                  ]}
                >
                  <Text style={styles.priorityText}>{priority}</Text>
                </View>
              </View>
            ))}
          </GlassCard>
          {/* 2. Earnings & Payment */}
          <GlassCard
            title="Earnings & Payment"
            icon={
              <Feather name="dollar-sign" size={18} color={COLORS.accent} />
            }
          >
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>This Month</Text>
                <View style={styles.innerValueCard}>
                  <Text style={styles.statValue}>₹ 25,724</Text>
                </View>
                <Text style={styles.trendText}>↑ +12% from last month</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Earnings</Text>
                <View style={styles.innerValueCard}>
                  <Text style={styles.statValue}>₹ 5,25,750</Text>
                </View>
                <Text style={styles.trendText}>All-time</Text>
              </View>
            </View>
            <View style={styles.listRow}>
              <Text style={styles.listLabel}>Pending Payout</Text>
              <Text style={styles.listValue}>₹ 24,520</Text>
            </View>
            <View style={styles.listRow}>
              <Text style={styles.listLabel}>Last Payment</Text>
              <Text style={styles.listValue}>1 Dec 2025</Text>
            </View>
            <Text style={styles.subTitle}>Monthly earnings trend</Text>
            <View style={styles.miniChart}>
              {[0.4, 0.7, 1, 0.7, 0.7].map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.chartBar,
                    {
                      height: h * 40,
                      backgroundColor:
                        i === 2 ? COLORS.accent : COLORS.glassBorder,
                    },
                  ]}
                />
              ))}
            </View>
          </GlassCard>
          {/* 4. Admin Actions */}
          <GlassCard
            title="Admin Actions"
            icon={<Feather name="shield" size={18} color={COLORS.accent} />}
          >
            <AdminActionBtn
              label="Suspend Listener"
              icon={
                <MaterialCommunityIcons
                  name="block-helper"
                  size={20}
                  color={COLORS.error}
                />
              }
              color={COLORS.error}
            />
            <AdminActionBtn
              label="Release Payment"
              icon={<Feather name="play" size={20} color={COLORS.success} />}
              color={COLORS.success}
            />
            <AdminActionBtn
              label="Hold Payment"
              icon={<Feather name="pause" size={20} color={COLORS.warning} />}
              color={COLORS.warning}
            />
            <AdminActionBtn
              label="Send Warning"
              icon={
                <Feather
                  name="alert-triangle"
                  size={20}
                  color={COLORS.warning}
                />
              }
              color={COLORS.warning}
            />
          </GlassCard>
          {/* 6. Admin Notes */}
          <GlassCard
            title="Admin Notes"
            icon={<Feather name="edit-3" size={18} color={COLORS.accent} />}
          >
            <Text style={styles.noteLabel}>Admin-only notes</Text>
            <View style={styles.notePreview}>
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, { width: "70%" }]} />
            </View>
            <TouchableOpacity style={styles.neonBtn}>
              <Text style={styles.neonBtnText}>Add note</Text>
            </TouchableOpacity>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { padding: 20, gap: 20 },

  // Profile Header
  profileHeader: {
    alignItems: "center",
    backgroundColor: COLORS.glass,
    padding: 30,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 15,
  },
  profileName: { color: COLORS.textPrimary, fontSize: 18, fontWeight: "700" },
  joinedDate: { color: COLORS.textSecondary, fontSize: 13, marginVertical: 4 },
  statusBadge: {
    backgroundColor: COLORS.success + "20",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  statusText: { color: COLORS.success, fontWeight: "600" },

  // Cards
  glassCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 12,
    marginBottom: 15,
  },
  headerTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" },

  // Earnings Stats
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 15 },
  statBox: { flex: 1 },
  statLabel: { color: COLORS.textSecondary, fontSize: 12, marginBottom: 8 },
  innerValueCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "700" },
  trendText: { color: COLORS.accent, fontSize: 10, marginTop: 6 },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  listLabel: { color: COLORS.textSecondary, fontSize: 14 },
  listValue: { color: COLORS.textPrimary, fontSize: 15, fontWeight: "600" },
  subTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 15,
    marginBottom: 10,
  },
  miniChart: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
    height: 50,
  },
  chartBar: { width: 45, borderRadius: 4 },

  // Ratings
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  metricLabel: { color: COLORS.textSecondary, fontSize: 14 },
  metricValue: { color: COLORS.textPrimary, fontSize: 15, fontWeight: "600" },

  // Admin Actions
  adminActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 40,
    marginBottom: 10,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  adminActionLabel: { fontSize: 15, fontWeight: "500" },

  // Dispute Reports
  disputeItem: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disputeUser: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "600" },
  disputeDesc: { color: COLORS.textSecondary, fontSize: 12, marginVertical: 4 },
  disputeDate: { color: COLORS.textSecondary, fontSize: 11 },
  priorityBadge: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  priorityText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: "600" },

  // Notes & Buttons
  noteLabel: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 10 },
  notePreview: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 15,
    borderRadius: 16,
    gap: 8,
    marginBottom: 15,
  },
  skeletonLine: {
    height: 6,
    backgroundColor: COLORS.glassBorder,
    borderRadius: 3,
    width: "100%",
  },
  neonBtn: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.glass,
  },
  neonBtnText: { color: COLORS.accent, fontWeight: "600" },
  sessionCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 16,
    borderRadius: 16,
  },
  sessionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sessionTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: "700" },
  compBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  compText: { color: COLORS.textPrimary, fontSize: 12 },
  sessionMeta: { color: COLORS.textSecondary, fontSize: 12 },
  sessionFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  tagText: { color: COLORS.textPrimary, fontSize: 12 },
  // Certification
  certPlaceholder: {
    height: 120,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  skeletonLineSmall: {
    height: 6,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
  },
});
