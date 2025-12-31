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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
// --- Interfaces for Type Safety ---

interface MetricData {
  count: string;
  change?: string;
  trend?: "up" | "down";
}

interface ListEntry {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  priority?: "High" | "Medium" | "Low";
}

interface DashboardData {
  users: { active: MetricData; inactive: MetricData };
  listeners: { verified: MetricData; pending: MetricData };
  revenue: { monthly: string; change: string; chart: number[] };
  sessions: { total: string; avgDuration: string; chart: number[] };
  flagged: ListEntry[];
  tickets: ListEntry[];
}

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  up: "#4CD964",
  down: "#FF4B4B",
  darkPillBg: "rgba(0,0,0,0.6)",
};

// --- Reusable Components ---

const DataCard: React.FC<{ title: string; data: MetricData }> = ({
  title,
  data,
}) => (
  <View style={styles.dataCard}>
    <Text style={styles.dataCardTitle}>{title}</Text>
    <Text style={styles.dataCardCount}>{data.count}</Text>
    {data.change && (
      <View style={styles.trendContainer}>
        <MaterialCommunityIcons
          name={data.trend === "up" ? "trending-up" : "trending-down"}
          size={18}
          color={data.trend === "up" ? COLORS.up : COLORS.down}
        />
        <Text
          style={[
            styles.trendText,
            { color: data.trend === "up" ? COLORS.up : COLORS.down },
          ]}
        >
          {data.change}
        </Text>
      </View>
    )}
  </View>
);

const ListItem: React.FC<ListEntry & { iconColor?: string }> = ({
  title,
  subtitle,
  time,
  icon,
  iconColor,
}) => (
  <View style={styles.listItem}>
    <View style={styles.listHeader}>
      <Text style={styles.listTitle}>{title}</Text>
      <Text style={styles.listTime}>{time}</Text>
    </View>
    <View style={styles.listContent}>
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={iconColor || COLORS.textSecondary}
      />
      <Text style={styles.listSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

// --- Main Component ---

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Simulate Mock API
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setData({
        users: {
          active: { count: "8,421", change: "+12.5%", trend: "up" },
          inactive: { count: "1,203", change: "-3.25%", trend: "down" },
        },
        listeners: {
          verified: { count: "18" },
          pending: { count: "2" },
        },
        revenue: {
          monthly: "₹ 24,520",
          change: "+18.2%",
          chart: [40, 70, 50, 90, 65, 80, 45],
        },
        sessions: {
          total: "1,824",
          avgDuration: "32m",
          chart: [50, 85, 75, 40, 80, 65, 85],
        },
        flagged: [
          {
            id: "1",
            title: "USER-*****51234",
            subtitle: "Inappropriate language",
            time: "10m ago",
            icon: "alert-outline",
          },
          {
            id: "2",
            title: "USER-*****13234",
            subtitle: "Policy violation",
            time: "23m ago",
            icon: "alert-outline",
          },
        ],
        tickets: [
          {
            id: "T2401",
            title: "#T2401 (High)",
            subtitle: "Payment processing error",
            time: "5m ago",
            icon: "clock-outline",
          },
        ],
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading || !data)
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => {
            router.push("../(Dashboard)/Setting/Settings");
          }}
        >
          <Ionicons name="settings-sharp" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* User Sections */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="people" size={24} color={COLORS.accent} />
            <Text style={styles.cardTitle}>Total Users</Text>
          </View>
          <View style={styles.dataCardsContainer}>
            <DataCard title="Active" data={data.users.active} />
            <DataCard title="Inactive" data={data.users.inactive} />
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="headphones"
              size={24}
              color={COLORS.accent}
            />
            <Text style={styles.cardTitle}>Total Listeners</Text>
          </View>
          <View style={styles.dataCardsContainer}>
            <DataCard title="Verified" data={data.listeners.verified} />
            <DataCard title="Pending" data={data.listeners.pending} />
          </View>
        </View>

        {/* Revenue Section */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="currency-rupee"
              size={24}
              color={COLORS.accent}
            />
            <Text style={styles.cardTitle}>Revenue Metrics</Text>
          </View>
          <View style={styles.metricBody}>
            <View style={styles.metricRow}>
              <View>
                <Text style={styles.subLabel}>Monthly Revenue</Text>
                <Text style={styles.metricValue}>{data.revenue.monthly}</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{data.revenue.change}</Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {data.revenue.chart.map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.bar,
                    { height: h, opacity: i % 2 === 0 ? 1 : 0.5 },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Session Statistics Section */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="pulse"
              size={22}
              color={COLORS.accent}
            />
            <Text style={styles.cardTitle}>Session Statistics</Text>
          </View>
          <View style={styles.metricBody}>
            <View style={styles.metricRow}>
              <View>
                <Text style={styles.subLabel}>Total Sessions</Text>
                <Text style={styles.metricValueSmall}>
                  {data.sessions.total}
                </Text>
              </View>
              <View>
                <Text style={[styles.subLabel, { textAlign: "right" }]}>
                  Avg Duration
                </Text>
                <Text style={[styles.metricValueSmall, { textAlign: "right" }]}>
                  {data.sessions.avgDuration}
                </Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {data.sessions.chart.map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.bar,
                    {
                      height: h,
                      backgroundColor: COLORS.accent,
                      opacity: h > 60 ? 1 : 0.5,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={22}
              color={COLORS.accent}
            />
            <Text style={styles.cardTitle}>Support Ticket Queue</Text>
          </View>
          {data.tickets.map((item) => (
            <ListItem key={item.id} {...item} />
          ))}
          <TouchableOpacity style={styles.neonButtonPrimary} onPress={()=>router.push("../(Dashboard)/Tickets/Ticket")}>
            <Text style={styles.neonButtonPrimaryText}>View All Tickets</Text>
          </TouchableOpacity>
        </View>

        {/* Flagged Content & Tickets */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="alert-octagon"
              size={22}
              color={COLORS.down}
            />
            <Text style={styles.cardTitle}>Flagged Content</Text>
          </View>
          {data.flagged.map((item) => (
            <ListItem key={item.id} {...item} iconColor={COLORS.down} />
          ))}
          <TouchableOpacity style={styles.neonButtonOutline} onPress={()=>router.push("../(Dashboard)/Reports/Flagged")}>
            <Text style={styles.neonButtonOutlineText}>Review All Reports</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.textMain },
  settingsBtn: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 30,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  mainCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: COLORS.textMain,
  },
  dataCardsContainer: { flexDirection: "row", justifyContent: "space-between" },
  dataCard: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 15,
    padding: 15,
    width: "48%",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  dataCardTitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 5 },
  dataCardCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textMain,
    marginBottom: 5,
  },
  trendContainer: { flexDirection: "row", alignItems: "center" },
  trendText: { fontSize: 12, marginLeft: 5, fontWeight: "600" },
  metricBody: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 15,
    padding: 15,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  subLabel: { color: COLORS.textSecondary, fontSize: 12 },
  metricValue: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
  metricValueSmall: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 60,
    gap: 8,
    justifyContent: "center",
  },
  bar: { width: 12, backgroundColor: COLORS.accent, borderRadius: 4 },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.up,
    backgroundColor: COLORS.darkPillBg,
  },
  pillText: { fontSize: 11, fontWeight: "bold", color: COLORS.up },
  listItem: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  listTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  listTime: { color: COLORS.textSecondary, fontSize: 11 },
  listContent: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  listSubtitle: { color: COLORS.textSecondary, fontSize: 13, marginLeft: 8 },
  neonButtonPrimary: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  neonButtonPrimaryText: { color: "#000", fontWeight: "800", fontSize: 16 },
  neonButtonOutline: {
    backgroundColor: "rgba(0, 255, 255, 0.05)",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  neonButtonOutlineText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 14,
  },
});
