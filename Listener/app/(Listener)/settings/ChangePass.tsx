import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  bg: '#1A1225',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  accent: '#00FFFF', // Neon Cyan
  textMain: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  inputBg: 'rgba(255, 255, 255, 0.05)',
};

const ChangePasswordScreen = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        <View style={styles.card}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'current' && styles.inputFocused
              ]}
              placeholder="••••••••••••"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry
              onFocus={() => setFocusedField('current')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'new' && styles.inputFocused
              ]}
              placeholder="••••••••••••"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry
              onFocus={() => setFocusedField('new')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'confirm' && styles.inputFocused
              ]}
              placeholder="••••••••••••"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              secureTextEntry
              onFocus={() => setFocusedField('confirm')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Requirement Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Password must be at least 8 characters and include uppercase, lowercase, and numbers.
            </Text>
          </View>

          {/* Update Button */}
          <TouchableOpacity style={styles.button} activeOpacity={0.9}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    marginTop: 25,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: COLORS.textMain,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  inputFocused: {
    borderColor: COLORS.accent,
    borderWidth: 1.5,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.accent,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Glow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default () => (
  <SafeAreaProvider>
    <ChangePasswordScreen />
  </SafeAreaProvider>
);