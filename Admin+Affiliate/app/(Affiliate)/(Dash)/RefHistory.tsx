import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  success: "#00FF9D", // Neon Green
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const REFERRALS = [
  {
    id: 1,
    userId: "USER_****2345",
    joined: "Nov 8 2025",
    status: "Active",
    firstPayment: "Completed",
    ltv: "₹450",
  },
  {
    id: 2,
    userId: "USER_****8921",
    joined: "Nov 5 2025",
    status: "Active",
    firstPayment: "Pending",
    ltv: "₹0",
  },
  {
    id: 3,
    userId: "USER_****1122",
    joined: "Oct 28 2025",
    status: "Inactive",
    firstPayment: "Failed",
    ltv: "₹0",
  },
];

export default function ReferralHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Referral History</Text>
          <Text style={styles.headerSubtitle}>All referred users</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={THEME.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by User ID"
            placeholderTextColor={THEME.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter & Sort Buttons */}
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
            <Feather name="filter" size={18} color={THEME.textPrimary} />
            <Text style={styles.controlText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="sort"
              size={20}
              color={THEME.textPrimary}
            />
            <Text style={styles.controlText}>Sort By</Text>
          </TouchableOpacity>
        </View>

        {/* Referral List */}
        <View style={styles.listContainer}>
          {REFERRALS.map((user) => (
            <View key={user.id} style={styles.userCard}>
              {/* User Header */}
              <View style={styles.userHeader}>
                <View>
                  <Text style={styles.userId}>{user.userId}</Text>
                  <Text style={styles.joinedDate}>Joined {user.joined}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        user.status === "Active"
                          ? "rgba(0, 255, 255, 0.2)"
                          : "rgba(160, 160, 160, 0.2)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          user.status === "Active"
                            ? THEME.accent
                            : THEME.textSecondary,
                      },
                    ]}
                  >
                    {user.status}
                  </Text>
                </View>
              </View>

              {/* User Details Grid */}
              <View style={styles.userDetailsRow}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>First Payment</Text>
                  <Text style={styles.detailValue}>{user.firstPayment}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Lifetime Value</Text>
                  <Text style={styles.detailValue}>{user.ltv}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Total Earnings Summary Card */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>
            Total Earnings From Referrals
          </Text>
          <Text style={styles.earningsValue}>₹45,780</Text>

          <View style={styles.earningsFooter}>
            <View>
              <Text style={styles.footerLabel}>From Active Users</Text>
              <Text style={styles.footerValue}>₹42,340</Text>
            </View>
            <View>
              <Text style={styles.footerLabel}>Avg. per User</Text>
              <Text style={styles.footerValue}>₹185</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },

  // Top Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: 14,
  },

  // Controls (Filter/Sort)
  controlRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  controlButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    height: 45,
    gap: 8,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  controlText: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },

  // User List
  listContainer: {
    gap: 15,
    marginBottom: 25,
  },
  userCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  userId: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 11,
    color: THEME.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  userDetailsRow: {
    flexDirection: "row",
    gap: 10,
  },
  detailBox: {
    flex: 1,
    backgroundColor: THEME.inputBg,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  detailLabel: {
    fontSize: 10,
    color: THEME.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: THEME.textPrimary,
    fontWeight: "500",
  },

  // Earnings Card
  earningsCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  earningsTitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 10,
  },
  earningsValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 20,
  },
  earningsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  footerLabel: {
    fontSize: 11,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
});
