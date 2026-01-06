import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  accent: '#00FFFF', // Neon Cyan
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
  warningBg: 'rgba(255, 255, 255, 0.03)',
};

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
          showsVerticalScrollIndicator={false}
        >
          
          {/* Logo / Header */}
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="robot-happy-outline" size={40} color={THEME.buttonText} />
            </View>
            <Text style={styles.welcomeText}>Welcome back to Hmm Talk!</Text>
          </View>

          {/* Login Form Card */}
          <View style={styles.card}>
            
            {/* User ID Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>User ID:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="USER-XXXXXX"
                  placeholderTextColor={THEME.textSecondary}
                  value={userId}
                  onChangeText={setUserId}
                  autoCapitalize="characters"
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons name="content-copy" size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="*************"
                  placeholderTextColor={THEME.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Remember Me Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={0.8}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Feather name="check" size={14} color={THEME.buttonText} />}
            </View>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={()=>router.push(".././Splash")}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Forgot Password Links */}
          <TouchableOpacity style={styles.forgotLinks}>
            <Text style={styles.forgotText}>
              Forgot Password? <Text style={styles.linkHighlight}>Reset Password</Text>
            </Text>
          </TouchableOpacity>

          {/* User ID Warning Box */}
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>Lost your User ID?</Text>
            <Text style={styles.warningText}>
              Unfortunately, account recovery is not possible without it
            </Text>
          </View>

          {/* Footer Sign Up */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('./(Signup)/Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  scrollContent: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    flexGrow: 1, // Ensures content is centered if screen is tall
  },

  // Header
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24, // Squircle
    backgroundColor: THEME.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },

  // Form Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.inputBg,
    borderRadius: 25, // Pill shape inputs
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: 15,
    marginRight: 10,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  checkboxLabel: {
    color: THEME.textSecondary,
    fontSize: 14,
  },

  // Sign In Button
  signInButton: {
    backgroundColor: THEME.cardBg, 
    borderWidth: 1,
    borderColor: THEME.textPrimary,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  signInButtonText: {
    color: THEME.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Links
  forgotLinks: {
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  linkHighlight: {
    color: THEME.textPrimary,
    fontWeight: '600',
  },

  // Warning Box
  warningBox: {
    backgroundColor: THEME.warningBg,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 40,
  },
  warningTitle: {
    color: THEME.textPrimary, // Keeping it neutral, not red, as per image style
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  warningText: {
    color: THEME.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: THEME.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});