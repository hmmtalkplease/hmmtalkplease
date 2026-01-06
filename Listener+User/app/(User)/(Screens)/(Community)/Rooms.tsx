import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  accent: '#00FFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
};

// --- MOCK DATA ---
const AVAILABLE_ROOMS = [
  {
    id: 1,
    title: 'Anxiety Support',
    type: 'Issue-based',
    members: 48,
  },
  {
    id: 2,
    title: 'Depression Chat',
    type: 'Issue-based',
    members: 112,
  },
  {
    id: 3,
    title: 'Social Anxiety',
    type: 'Issue-based',
    members: 65,
  },
  {
    id: 4,
    title: 'Workplace Stress',
    type: 'Issue-based',
    members: 30,
  },
  {
    id: 5,
    title: 'Mindfulness Practice',
    type: 'Wellness',
    members: 89,
  },
  {
    id: 6,
    title: 'Sleep Support',
    type: 'Wellness',
    members: 42,
  },
];

export default function CommunityRoomsAvailableScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Rooms Available</Text>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {AVAILABLE_ROOMS.map((room) => (
            <View key={room.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.roomTitle}>{room.title}</Text>
                  <Text style={styles.roomType}>{room.type}</Text>
                </View>
                <View style={styles.memberBadge}>
                  <Feather name="users" size={12} color={THEME.textSecondary} />
                  <Text style={styles.memberCount}>{room.members}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },

  // List
  listContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  roomType: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  memberCount: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  joinButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: THEME.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
});