import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

// --- Theme Configuration ---
const COLORS = {
  bg: '#1A1225',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  accent: '#00FFFF', // Neon Cyan
  textMain: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.5)',
};

// --- Sub-Component: Settings Group ---
const SettingsGroup = ({ title, icon, iconLib, children }: any) => {
  const IconComp = iconLib || MaterialCommunityIcons;
  return (
    <View style={styles.groupWrapper}>
      <View style={styles.groupHeader}>
        <IconComp name={icon} size={20} color={COLORS.textMain} />
        <Text style={styles.groupTitle}>{title}</Text>
      </View>
      <View style={styles.glassCard}>
        {children}
      </View>
    </View>
  );
};

// --- Sub-Component: Settings Item ---
const SettingsItem = ({ label, isLast, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.itemRow, !isLast && styles.itemBorder]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.itemLabel}>{label}</Text>
    <Feather name="chevron-right" size={20} color={COLORS.accent} />
  </TouchableOpacity>
);

export default function AdminSettingsScreen() {
  const handleLogout = () => {
    console.log("User Logged Out");
    // Add navigation or auth logic here
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Financial Section */}
        <SettingsGroup title="Financial" icon="currency-inr" iconLib={MaterialCommunityIcons}>
          <SettingsItem label="Pricing Adjustments" />
          <SettingsItem label="Payment Gateway" isLast />
        </SettingsGroup>

        {/* Platform Section */}
        <SettingsGroup title="Platform" icon="shield-outline" iconLib={Ionicons}>
          <SettingsItem label="Platform Policies" />
          <SettingsItem label="Feature Flags" />
          <SettingsItem label="Notification Templates" isLast />
        </SettingsGroup>

        {/* System Section */}
        <SettingsGroup title="System" icon="zap" iconLib={Feather}>
          <SettingsItem label="API Configuration" />
          <SettingsItem label="Security Settings" />
          <SettingsItem label="Backup & Recovery" isLast />
        </SettingsGroup>

        {/* Account Section */}
        <SettingsGroup title="Account" icon="user" iconLib={Feather}>
          <SettingsItem label="Admin Profile" />
          <SettingsItem label="Team Members" />
          <SettingsItem label="Audit Logs" isLast />
        </SettingsGroup>

        {/* --- NEON LOG OUT BUTTON --- */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // Extra padding for the button
  },
  groupWrapper: {
    marginBottom: 25,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
    gap: 10,
  },
  groupTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  glassCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  itemLabel: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.9,
  },
  // --- Logout Button Styles ---
  logoutButton: {
    backgroundColor: COLORS.accent,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // Neon Glow Effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  logoutButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});