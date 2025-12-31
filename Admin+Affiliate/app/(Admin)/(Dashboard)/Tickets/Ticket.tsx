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
// Removed SafeAreaView from the top to prevent double padding
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// --- Interfaces for Type Safety ---
type Priority = "High" | "Medium" | "Low";

interface SupportTicket {
  id: string;
  issue: string;
  priority: Priority;
  time: string;
}

const COLORS = {
  bg: "#1A1225", // Deep Purple
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  high: "#FF4B4B",
  medium: "#FFD700",
  low: "#4CD964",
};

const TicketCard: React.FC<{ ticket: SupportTicket }> = ({ ticket }) => {
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

  const pStyle = getPriorityStyle(ticket.priority);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.ticketId}>{ticket.id}</Text>
          <Text style={styles.ticketIssue}>{ticket.issue}</Text>
        </View>
        <TouchableOpacity
          style={styles.openButton}
          activeOpacity={0.7}
          onPress={() =>
            router.push({
              pathname: "/Tickets/[id]",
              params: { id: ticket.id },
            })
          }
        >
          <Text style={styles.openButtonText}>Open</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardFooter}>
        <View
          style={[
            styles.priorityPill,
            { backgroundColor: pStyle.bg, borderColor: pStyle.color },
          ]}
        >
          <Text style={[styles.priorityText, { color: pStyle.color }]}>
            {ticket.priority}
          </Text>
        </View>
        <Text style={styles.timeText}>{ticket.time}</Text>
      </View>
    </View>
  );
};

export default function SupportTicketQueueScreen() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const mockData: SupportTicket[] = [
        {
          id: "TKT-1234",
          issue: "Payment Issue",
          priority: "High",
          time: "5m ago",
        },
        {
          id: "TKT-2943",
          issue: "Account Access",
          priority: "Medium",
          time: "12m ago",
        },
        {
          id: "TKT-4923",
          issue: "Technical Bug",
          priority: "Low",
          time: "25m ago",
        },
        {
          id: "TKT-3949",
          issue: "Refund Request",
          priority: "High",
          time: "1hr ago",
        },
        {
          id: "TKT-2283",
          issue: "General Inquiry",
          priority: "Medium",
          time: "2hr ago",
        },
      ];
      setTickets(mockData);
      setLoading(false);
    };
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    // Changed: edges={[]} removes the top safe area padding because the Stack Header already provides it
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: "center", alignItems: "center" },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textMain,
    paddingTop: 10,
    paddingBottom: 20,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  ticketId: { color: COLORS.textMain, fontSize: 16, fontWeight: "700" },
  ticketIssue: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },
  openButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: "rgba(0, 255, 255, 0.05)",
  },
  openButtonText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  priorityText: { fontSize: 12, fontWeight: "bold" },
  timeText: { color: COLORS.textSecondary, fontSize: 12 },
});
