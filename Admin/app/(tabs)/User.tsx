import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Using hook for granular layout control
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// --- Interfaces for Type Safety ---
interface UserItem {
  id: string;
  userId: string;
  lastActive: string;
  status: "Active" | "Inactive";
}

// --- Theme Configuration ---
const COLORS = {
  bg: "#1A1225", // Deep Purple
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF", // Neon Cyan
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  activePill: "rgba(0, 255, 255, 0.1)",
  inactivePill: "rgba(255, 255, 255, 0.05)",
};

// --- Sub-Component: User Card ---
const UserCard: React.FC<{ user: UserItem }> = ({ user }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.userInfo}>
        <Text style={styles.userIdText}>{user.userId}</Text>
        <Text style={styles.activeText}>Last active: {user.lastActive}</Text>
        <View
          style={[
            styles.statusPill,
            user.status === "Active"
              ? styles.statusActive
              : styles.statusInactive,
          ]}
        >
          <Text
            style={[
              styles.statusPillText,
              {
                color:
                  user.status === "Active"
                    ? COLORS.accent
                    : COLORS.textSecondary,
              },
            ]}
          >
            {user.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: "../Usr_Management/[id]",
            params: { id: user.userId },
          })
        }
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- Main Screen ---
export default function UserManagementScreen() {
  const insets = useSafeAreaInsets(); // Access device-specific insets
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const mockData: UserItem[] = [
        {
          id: "1",
          userId: "USER-A7K3M9P2",
          lastActive: "2 hours ago",
          status: "Active",
        },
        {
          id: "2",
          userId: "USER-B9L4N0Q3",
          lastActive: "3 hours ago",
          status: "Inactive",
        },
        {
          id: "3",
          userId: "USER-C1M5O1R4",
          lastActive: "5 mins ago",
          status: "Active",
        },
        {
          id: "4",
          userId: "USER-D2N6P2S5",
          lastActive: "12 hours ago",
          status: "Active",
        },
      ];

      setUsers(mockData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.userId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top > 0 ? 10 : 20 }, // Adjust top padding based on safe area
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              placeholderTextColor={COLORS.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* User List */}
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  searchSection: { marginBottom: 20, gap: 12 },
  searchBarContainer: {
    backgroundColor: COLORS.glass,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: "center",
  },
  searchInput: { color: COLORS.textMain, fontSize: 16 },
  filterButton: {
    backgroundColor: COLORS.glass,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: { color: COLORS.textMain, fontSize: 16, fontWeight: "500" },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: { flex: 1 },
  userIdText: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  activeText: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 10 },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: COLORS.activePill,
    borderColor: COLORS.accent,
  },
  statusInactive: {
    backgroundColor: COLORS.inactivePill,
    borderColor: COLORS.glassBorder,
  },
  statusPillText: { fontSize: 12, fontWeight: "600" },
  viewButton: {
    backgroundColor: COLORS.glass,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  viewButtonText: { color: COLORS.textMain, fontWeight: "600" },
});
