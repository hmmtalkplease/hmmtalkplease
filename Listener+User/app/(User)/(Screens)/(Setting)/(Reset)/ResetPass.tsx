import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  accent: '#00FFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
  success: '#00FF9D',
  strengthBarFilled: '#00FFFF',
  strengthBarEmpty: '#3A3045',
};

export default function ResetPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [password, setPassword] = useState('***************');
  const [confirmPassword, setConfirmPassword] = useState('Naruto13@');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Create a strong password</Text>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Enter password"
                  placeholderTextColor={THEME.textSecondary}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Feather 
                    name={isPasswordVisible ? "eye" : "eye-off"} 
                    size={20} 
                    color={THEME.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!isConfirmVisible}
                  placeholder="Confirm password"
                  placeholderTextColor={THEME.textSecondary}
                />
                <TouchableOpacity onPress={() => setIsConfirmVisible(!isConfirmVisible)}>
                  <Feather 
                    name={isConfirmVisible ? "eye" : "eye-off"} 
                    size={20} 
                    color={THEME.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Requirements List */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.reqTitle}>Password must contain:</Text>
              
              <View style={styles.reqItem}>
                <MaterialCommunityIcons name="check" size={18} color={THEME.textPrimary} />
                <Text style={styles.reqText}>At least 8 characters</Text>
              </View>
              
              <View style={styles.reqItem}>
                <MaterialCommunityIcons name="check" size={18} color={THEME.textPrimary} />
                <Text style={styles.reqText}>One uppercase letter</Text>
              </View>
              
              <View style={styles.reqItem}>
                <MaterialCommunityIcons name="check" size={18} color={THEME.textPrimary} />
                <Text style={styles.reqText}>One Number</Text>
              </View>
            </View>
          </View>

          {/* Strength Meter */}
          <View style={styles.strengthContainer}>
            <View style={styles.strengthBars}>
              <View style={[styles.bar, { backgroundColor: THEME.strengthBarFilled }]} />
              <View style={[styles.bar, { backgroundColor: THEME.strengthBarFilled }]} />
              <View style={[styles.bar, { backgroundColor: THEME.strengthBarFilled }]} />
            </View>
            <Text style={styles.strengthText}>Strength: <Text style={{ color: THEME.accent, fontWeight: 'bold' }}>Strong</Text></Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>

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
    paddingHorizontal: 20,
    paddingTop: 20,
    flexGrow: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    marginTop: 10,
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

  // Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  cardHeader: {
    fontSize: 16,
    color: THEME.textSecondary,
    marginBottom: 20,
  },

  // Inputs
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: THEME.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.inputBg,
    borderRadius: 25, // Pill shape input
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

  // Requirements
  requirementsContainer: {
    marginTop: 10,
  },
  reqTitle: {
    fontSize: 14,
    color: THEME.textPrimary,
    marginBottom: 10,
    fontWeight: '500',
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  reqText: {
    color: THEME.textSecondary,
    fontSize: 13,
  },

  // Strength Meter
  strengthContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  strengthBars: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: 15,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  strengthText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },

  // Button
  resetButton: {
    backgroundColor: THEME.accent,
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  resetButtonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});