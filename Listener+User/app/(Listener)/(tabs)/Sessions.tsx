import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Thematic Color Constants
const COLORS = {
  bg: '#1A1225',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  accent: '#00FFFF', // Neon Cyan
  active: '#4CD964', // Green for Active
  upcoming: '#63B3ED', // Blue for Upcoming
  textMain: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  cardBg: 'rgba(255, 255, 255, 0.04)',
};

interface SessionCardProps {
  user: string;
  time: string;
  status: 'ACTIVE' | 'UPCOMING';
  category: string;
}

const SessionCard = ({ user, time, status, category }: SessionCardProps) => {
  const isActive = status === 'ACTIVE';

  return (
    <View style={styles.sessionCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.userText}>{user}</Text>
        <View style={[styles.badge, { backgroundColor: isActive ? 'rgba(76, 217, 100, 0.2)' : 'rgba(99, 179, 237, 0.2)' }]}>
          <Text style={[styles.badgeText, { color: isActive ? COLORS.active : COLORS.upcoming }]}>
            {status}
          </Text>
        </View>
      </View>

      <Text style={styles.timeText}>{time}</Text>
      
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Issue Category:</Text>
        <Text style={styles.categoryValue}>{category}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.actionButton, !isActive && styles.secondaryButton]} 
        activeOpacity={0.8}
      >
        <Text style={[styles.actionButtonText, !isActive && styles.secondaryButtonText]}>
          {isActive ? 'Join Session' : 'Cancel Session'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MySessionsScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Segmented Control (Tabs) --- */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Upcoming' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.tabTextActive]}>Upcoming/Active</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Completed' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabText, activeTab === 'Completed' && styles.tabTextActive]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SessionCard 
          user="User #789" 
          time="Today, 3:00 PM - 3:45 PM" 
          status="ACTIVE" 
          category="Work & Career Stress" 
        />
        
        <SessionCard 
          user="User #123" 
          time="Tomorrow, 3:00 PM - 3:45 PM" 
          status="UPCOMING" 
          category="Work & Career Stress" 
        />

        <SessionCard 
          user="User #456" 
          time="Tomorrow, 2:00 PM - 2:45 PM" 
          status="UPCOMING" 
          category="Work & Career Stress" 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.glass,
    margin: 20,
    padding: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sessionCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userText: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  categoryValue: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: COLORS.accent,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButtonText: {
    color: COLORS.accent,
  },
});