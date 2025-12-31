import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
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

// Thematic Color Constants
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

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
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

// --- Main Screen Component ---

export default function ListenerDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge} />
            <Text style={styles.profileName}>{id || "H7K6W9P2"}</Text>
            <Text style={styles.joinedDate}>Joined: 18 Oct 2025</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          {/* 2. User Details */}
          <GlassCard
            title="User Details"
            icon={<Feather name="user" size={18} color={COLORS.accent} />}
          >
            <InfoRow label="Pseudonym" value="Naruto" />
            <InfoRow label="Age" value="18-24" />
            <InfoRow label="Gender" value="Not specified" />
            <InfoRow label="Subscription" value="Free user" />
          </GlassCard>
          {/* 4. Activity Log */}
          <GlassCard
            title="Activity Log"
            icon={<Octicons name="history" size={18} color={COLORS.accent} />}
          >
            {[
              { title: "Completed Feedback survey", date: "2 days ago" },
              { title: "Updated profile settings", date: "3 days ago" },
              { title: "Joined platform", date: "12 Aug 2024" },
              { title: "Verified email address", date: "12 Aug 2024" },
            ].map((log, i) => (
              <View key={i} style={styles.logRow}>
                <View style={styles.logDot} />
                <View>
                  <Text style={styles.logTitle}>{log.title}</Text>
                  <Text style={styles.logDate}>{log.date}</Text>
                </View>
              </View>
            ))}
          </GlassCard>
          {/* 3. Admin Actions */}
          <GlassCard
            title="Admin Actions"
            icon={<Feather name="shield" size={18} color={COLORS.accent} />}
          >
            <AdminActionBtn
              label="Suspend Listener"
              color={COLORS.error}
              icon={
                <MaterialCommunityIcons
                  name="block-helper"
                  size={20}
                  color={COLORS.error}
                />
              }
            />
            <AdminActionBtn
              label="Release Payment"
              color={COLORS.success}
              icon={<Feather name="play" size={20} color={COLORS.success} />}
            />
            <AdminActionBtn
              label="Hold Payment"
              color={COLORS.warning}
              icon={<Feather name="pause" size={20} color={COLORS.warning} />}
            />
            <AdminActionBtn
              label="Send Warning"
              color={COLORS.warning}
              icon={
                <Feather
                  name="alert-triangle"
                  size={20}
                  color={COLORS.warning}
                />
              }
            />
          </GlassCard>

          {/* 5. Notes and Flags */}
          <GlassCard
            title="Notes and Flags"
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
  scrollContent: { padding: 20, paddingBottom: 40, gap: 16 },

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

  // Glass Cards
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

  // Info Row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  infoLabel: { color: COLORS.textSecondary, fontSize: 14 },
  infoValue: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "600" },

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

  // Activity Log
  logRow: { flexDirection: "row", gap: 12, marginBottom: 15 },
  logDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textSecondary,
    marginTop: 4,
  },
  logTitle: { color: COLORS.textPrimary, fontSize: 14 },
  logDate: { color: COLORS.textSecondary, fontSize: 12 },

  // Notes Section
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
});
