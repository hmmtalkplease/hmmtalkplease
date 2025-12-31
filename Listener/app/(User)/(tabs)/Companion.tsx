import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  accent: '#00FFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  heart: '#FF4757', // Red for favorites
  buttonText: '#1A1225',
};

// --- MOCK DATA ---
const COMPANIONS_LIST = [
  {
    id: 1,
    name: 'Sakura',
    ageRange: '24-26 years',
    languages: ['English', 'Hindi', 'Japanese'],
    specialties: ['Career Transitions', 'Workplace stress', 'Anxiety'],
    rating: 4.9,
    sessionsCount: 5,
    lastSession: '2025-11-26',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Pheonix',
    ageRange: '27-29 years',
    languages: ['English', 'Tamil'],
    specialties: ['Relationship stress', 'Self-Confidence', 'Life transitions'],
    rating: 4.7,
    sessionsCount: 4,
    lastSession: '2025-11-26',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Orion',
    ageRange: '24-26 years',
    languages: ['English', 'Hindi', 'Bengali'],
    specialties: ['Mental Health', 'Work-life Balance', 'Anxiety'],
    rating: 5,
    sessionsCount: 3,
    lastSession: '2025-11-20',
    isFavorite: true,
  },
];

export default function MyCompanionsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top+10 }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Companions</Text>
          <Text style={styles.headerSubtitle}>{COMPANIONS_LIST.length} saved listeners</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color={THEME.buttonText} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        {COMPANIONS_LIST.map((companion) => (
          <View key={companion.id} style={styles.card}>
            
            {/* Card Header: Avatar, Info, Heart */}
            <View style={styles.cardTopRow}>
              <View style={styles.avatarRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{companion.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.name}>{companion.name}</Text>
                  <Text style={styles.age}>{companion.ageRange}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons 
                  name={companion.isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={companion.isFavorite ? THEME.heart : THEME.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            {/* Languages */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Languages</Text>
              <View style={styles.chipContainer}>
                {companion.languages.map((lang, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{lang}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Specialties */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Specialties</Text>
              <View style={styles.chipContainer}>
                {companion.specialties.map((spec, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{spec}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Footer Stats */}
            <View style={styles.cardFooter}>
              <View style={styles.ratingBox}>
                <MaterialCommunityIcons name="star" size={18} color={THEME.accent} />
                <Text style={styles.ratingText}>
                  {companion.rating} <Text style={styles.sessionCount}>({companion.sessionsCount} sessions)</Text>
                </Text>
              </View>
              <Text style={styles.lastSession}>Last: {companion.lastSession}</Text>
            </View>

            {/* Start Session Button */}
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="message-text-outline" size={20} color={THEME.buttonText} />
              <Text style={styles.actionButtonText}>Start Session</Text>
            </TouchableOpacity>

          </View>
        ))}
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
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: THEME.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: THEME.background,
    borderWidth: 1,
    borderColor: THEME.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.accent,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  age: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 2,
  },

  // Chips Section
  sectionBlock: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    color: THEME.textPrimary,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: THEME.border,
    marginVertical: 15,
  },

  // Footer Stats
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  sessionCount: {
    fontWeight: '400',
    color: THEME.textSecondary,
    fontSize: 13,
  },
  lastSession: {
    fontSize: 13,
    color: THEME.textSecondary,
  },

  // Action Button
  actionButton: {
    backgroundColor: THEME.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30, // Pill shape
    gap: 10,
  },
  actionButtonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});