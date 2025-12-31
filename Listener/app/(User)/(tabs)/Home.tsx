import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";

// --- THEME CONFIGURATION ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  success: "#00FF9D",
};

// --- MOCK DATA ---
const STATS = [
  { label: "Sessions", value: "12", icon: "calendar-check" },
  { label: "Total Minutes", value: "240", icon: "clock-outline" },
  { label: "Rating", value: "4.8", icon: "star-outline" },
  { label: "Free Sessions", value: "0/2", icon: "medal-outline" },
];

const COMPANIONS = [
  {
    id: 1,
    name: "Sakura",
    age: "24-26",
    rating: 4.9,
    tags: ["Career Transitions", "Workplace stress", "Anxiety"],
    lastSession: "11/20/2025",
    totalSessions: 3,
  },
  {
    id: 2,
    name: "Pheonix",
    age: "27-29",
    rating: 4.7,
    tags: ["Relationship Issue", "Self- Confidence"],
    lastSession: "11/25/2025",
    totalSessions: 4,
  },
];

const RECENT_SESSIONS = [
  {
    id: 1,
    name: "Sakura",
    topic: "Career transitions",
    date: "11/25/2025",
    duration: "25 mins",
    price: "₹175",
    rating: 5,
  },
  {
    id: 2,
    name: "Pheonix",
    topic: "Workplace stress",
    date: "11/25/2025",
    duration: "20 mins",
    price: "₹150",
    rating: 5,
  },
  {
    id: 3,
    name: "Sakura",
    topic: "Anxiety",
    date: "11/22/2025",
    duration: "15 mins",
    price: "₹125",
    rating: 5,
  },
];

const MENU_ITEMS = [
  {
    icon: "account-group-outline",
    label: "Community",
    sub: "Join chat rooms",
    route: "./Community",
  },
  {
    icon: "book-open-page-variant-outline",
    label: "Learning",
    sub: "Self-help resources",
    route: "(User)/(Screens)/(Explore)/(Learning)/Learning-Selfhelp",
  },
  {
    icon: "shield-check-outline",
    label: "Safety & Moderation",
    sub: "Report & safety resources",
    route: "(User)/(Screens)/(Explore)/(Moderation)/Moderation-Safety",
  },
  {
    icon: "help-circle-outline",
    label: "Support & Help",
    sub: "FAQs and contact",
    route: "(User)/(Screens)/(Setting)/(Help)/HelpSupp",
  },
  {
    icon: "currency-inr",
    label: "Affiliate Program",
    sub: "Earn rewards by referring",
    route: "./(Learning)/Learning-Selfhelp",
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <Ionicons name="person-outline" size={20} color={THEME.accent} />
          </View>
          <View>
            <Text style={styles.headerTitle}>My Profile</Text>
            <Text style={styles.headerSubtitle}>Your safe space</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="log-out" size={24} color={THEME.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }, // Extra padding for scrolling
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>T</Text>
          </View>
          <Text style={styles.userName}>Tokyo</Text>
          <Text style={styles.userLocation}>Cities</Text>

          {/* User Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.userIdRow}>
              <Text style={styles.detailLabel}>User ID</Text>
              <View style={styles.copyRow}>
                <Text style={styles.userIdText}>USER-A7K3MP2</Text>
                <MaterialCommunityIcons
                  name="content-copy"
                  size={16}
                  color={THEME.accent}
                />
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Text style={styles.detailLabel}>Age</Text>
                <Text style={styles.detailValue}>24 years</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>Professional</Text>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.detailLabel}>Languages</Text>
              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>English</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Hindi</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.detailLabel}>Current Feeling</Text>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Hopeful</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryBtn]}
            onPress={() => router.push("../(Screens)/(Companion)/Mind")}
          >
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="#1A1225"
            />
            <Text style={styles.primaryBtnText}>Find Companion</Text>
            <Text style={styles.primaryBtnSub}>Get matched</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryBtn]}
            onPress={() => router.push("./Companion")}
          >
            <Ionicons name="search-outline" size={24} color={THEME.accent} />
            <Text style={styles.secondaryBtnText}>Browse</Text>
            <Text style={styles.secondaryBtnSub}>View all Companions</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your stats</Text>
          <MaterialCommunityIcons
            name="chart-box-outline"
            size={20}
            color={THEME.textSecondary}
          />
        </View>
        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <MaterialCommunityIcons
                name={stat.icon as any}
                size={24}
                color={THEME.accent}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* My Companions */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => router.push("./Companion")}
        >
          <Text style={styles.sectionTitle}>My Companions</Text>
          <Text style={styles.viewAll}>View All {">"}</Text>
        </TouchableOpacity>

        {COMPANIONS.map((comp) => (
          <View key={comp.id} style={styles.companionCard}>
            <View style={styles.compHeader}>
              <View style={styles.compInfo}>
                <View style={styles.smallAvatar}>
                  <Text style={styles.smallAvatarText}>{comp.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.compName}>{comp.name}</Text>
                  <Text style={styles.compSub}>
                    {comp.age} years • ★ {comp.rating}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.connectBtn}>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={16}
                  color="#1A1225"
                />
                <Text style={styles.connectBtnText}>Connect</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsContainer}>
              {comp.tags.map((tag, i) => (
                <View key={i} style={styles.tagChip}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>
                <MaterialCommunityIcons name="calendar-blank" size={12} /> Last
                session {comp.lastSession}
              </Text>
              <Text style={styles.footerText}>
                {comp.totalSessions} sessions
              </Text>
            </View>
          </View>
        ))}

        {/* Recent Sessions */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => router.push("./Sessions")}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="external-link" size={18} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
          </View>
          <Text style={styles.viewAll}>View All {">"}</Text>
        </TouchableOpacity>

        <View style={styles.sessionsContainer}>
          {RECENT_SESSIONS.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionRow}>
                <Text style={styles.sessionName}>
                  Session with {session.name}
                </Text>
                <View style={styles.ratingRow}>
                  {[...Array(5)].map((_, i) => (
                    <MaterialCommunityIcons
                      key={i}
                      name="star"
                      size={14}
                      color={i < session.rating ? THEME.textPrimary : "#333"}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.sessionTopic}>{session.topic}</Text>

              <View style={styles.sessionFooter}>
                <View style={styles.sessionMeta}>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons
                      name="calendar-blank"
                      size={14}
                      color={THEME.textSecondary}
                    />
                    <Text style={styles.metaText}>{session.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={14}
                      color={THEME.textSecondary}
                    />
                    <Text style={styles.metaText}>{session.duration}</Text>
                  </View>
                </View>

                <View style={styles.priceTag}>
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={16}
                    color={THEME.accent}
                  />
                  <Text style={styles.priceText}>{session.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Credits */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => router.push("/(User)/(Screens)/(Credits)/Credit")}
        >
          <Text style={styles.sectionTitle}>Credits & Payments</Text>
          <Text style={styles.viewAll}>View All {">"}</Text>
        </TouchableOpacity>
        <View style={styles.creditsCard}>
          <Text style={styles.creditsLabel}>Available Credits</Text>
          <Text style={styles.creditsValue}>450</Text>
          <Text style={styles.creditsSub}>Worth ₹450</Text>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => router.push("/(User)/(Screens)/(Credits)/Credit")}
          >
            <Text style={styles.buyBtnText}>Buy Credits</Text>
          </TouchableOpacity>
        </View>

        {/* Explore More Menu */}
        <Text
          style={[styles.sectionTitle, { marginTop: 25, marginBottom: 15 }]}
        >
          Explore More
        </Text>
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as RelativePathString)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconBox}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={THEME.textPrimary}
                  />
                </View>
                <View>
                  <Text style={styles.menuTitle}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>
          ))}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Profile Section
  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.cardBg,
    borderWidth: 1,
    borderColor: THEME.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    color: THEME.accent,
    fontWeight: "300",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  userLocation: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 20,
  },

  // Details Card
  detailsCard: {
    width: "100%",
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  userIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 8,
  },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userIdText: {
    color: THEME.textPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: 11,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  infoBlock: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    backgroundColor: THEME.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  chipText: {
    fontSize: 12,
    color: THEME.textPrimary,
  },

  // Action Buttons
  actionButtonsRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  primaryBtn: {
    backgroundColor: THEME.accent,
  },
  primaryBtnText: {
    color: "#1A1225",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  primaryBtnSub: {
    color: "#1A1225",
    opacity: 0.7,
    fontSize: 12,
  },
  secondaryBtn: {
    backgroundColor: THEME.cardBg,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  secondaryBtnText: {
    color: THEME.textPrimary,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  secondaryBtnSub: {
    color: THEME.textSecondary,
    fontSize: 12,
  },

  // Stats
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  viewAll: {
    color: THEME.textSecondary,
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },
  statCard: {
    width: "48%",
    backgroundColor: THEME.cardBg,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Companions
  companionCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  compHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  compInfo: {
    flexDirection: "row",
    gap: 10,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.background,
    borderWidth: 1,
    borderColor: THEME.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  smallAvatarText: {
    color: THEME.accent,
    fontWeight: "bold",
  },
  compName: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  compSub: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  connectBtn: {
    flexDirection: "row",
    backgroundColor: THEME.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    alignItems: "center",
  },
  connectBtnText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A1225",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: THEME.textSecondary,
    fontSize: 11,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    paddingTop: 10,
  },
  footerText: {
    color: THEME.textSecondary,
    fontSize: 11,
  },

  // Recent Sessions (New)
  sessionsContainer: {
    marginBottom: 25,
  },
  sessionCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.textPrimary,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 2,
  },
  sessionTopic: {
    fontSize: 13,
    color: THEME.textSecondary,
    marginBottom: 12,
  },
  sessionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingTop: 12,
  },
  sessionMeta: {
    flexDirection: "row",
    gap: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Credits
  creditsCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  creditsLabel: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  creditsValue: {
    color: THEME.textPrimary,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 5,
  },
  creditsSub: {
    color: THEME.textSecondary,
    fontSize: 14,
    marginBottom: 15,
  },
  buyBtn: {
    backgroundColor: "#333333",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buyBtnText: {
    color: THEME.textPrimary,
    fontWeight: "600",
  },

  // Menu
  menuContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuIconBox: {
    width: 30,
    alignItems: "center",
  },
  menuTitle: {
    color: THEME.textPrimary,
    fontSize: 15,
    fontWeight: "500",
  },
  menuSub: {
    color: THEME.textSecondary,
    fontSize: 11,
  },
});
