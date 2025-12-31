import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  accent: '#00FFFF', // Neon Cyan
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  buttonText: '#1A1225',
};

export default function UnifiedLoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      

      <View style={styles.contentContainer}>
        
        {/* Title Section */}
        <View style={styles.headerSection}>
          <Text style={styles.appName}>Hmm Talk</Text>
          <Text style={styles.subtitle}>
            Welcome to Hmm Talk. Please select your login portal below.
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          
          {/* Admin Login Button */}
          <TouchableOpacity 
            style={styles.roleButton}
            activeOpacity={0.8}
            onPress={() => router.push("/(Admin)/(tabs)/Dashboard")}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="shield-account-outline" size={32} color={THEME.buttonText} />
            </View>
            <Text style={styles.buttonText}>Admin Login</Text>
          </TouchableOpacity>

          {/* Affiliate Login Button */}
          <TouchableOpacity 
            style={styles.roleButton}
            activeOpacity={0.8}
            onPress={() => router.push("/(Affiliate)/(tabs)/Dashboard")}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="handshake-outline" size={32} color={THEME.buttonText} />
            </View>
            <Text style={styles.buttonText}>Affiliate Login</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  // Header
  headerSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: THEME.textPrimary,
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },

  // Buttons
  buttonContainer: {
    width: '100%',
    gap: 25,
  },
  roleButton: {
    backgroundColor: THEME.accent, // Neon Cyan Background
    height: 140, // Large height like the wireframe
    borderRadius: 30, // Large rounded corners (Squircle/Pill)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  iconCircle: {
    marginBottom: 10,
    // Optional: add a slight dimming circle behind icon if needed, 
    // but wireframe shows clean icon on bg.
  },
  buttonText: {
    color: THEME.buttonText, // Dark text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});