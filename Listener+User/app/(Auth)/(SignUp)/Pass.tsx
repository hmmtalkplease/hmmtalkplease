import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';


// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  accent: '#00FFFF', // Neon Cyan
  success: '#00FF9D', // Neon Green
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
  barFilled: '#00FFFF',
  barEmpty: '#3A3045',
};

const SECURITY_QUESTIONS = [
  "Which school did you finish your tenth in?",
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your favorite food?"
];

export default function SecureAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  
  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(SECURITY_QUESTIONS[0]);

  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Validation Logic
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isStrong = hasLength && hasUpper && hasNumber;
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectQuestion = (question: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedQuestion(question);
    setIsDropdownOpen(false);
  };

  const handleCreateAccount = () => {
    if (!passwordsMatch) {
      alert("Passwords do not match!");
      return;
    }
    // Navigate to dashboard
    router.push('./Review');
  };

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
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Secure Your Account</Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Create a strong password</Text>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="**************"
                  placeholderTextColor={THEME.textSecondary}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor={THEME.textSecondary}
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* FUNCTIONAL DROPDOWN */}
            <View style={[styles.inputGroup, { zIndex: 100 }]}>
              <Text style={styles.label}>Choose a security question</Text>
              
              <TouchableOpacity 
                style={styles.dropdownButton} 
                activeOpacity={0.8}
                onPress={toggleDropdown}
              >
                <Text style={styles.dropdownText} numberOfLines={1}>
                  {selectedQuestion}
                </Text>
                <Feather 
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={THEME.textPrimary} 
                />
              </TouchableOpacity>

              {/* Expanded Options */}
              {isDropdownOpen && (
                <View style={styles.dropdownList}>
                  {SECURITY_QUESTIONS.map((q, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.dropdownItem}
                      onPress={() => handleSelectQuestion(q)}
                    >
                      <Text style={styles.dropdownItemText}>{q}</Text>
                      {selectedQuestion === q && (
                        <Feather name="check" size={16} color={THEME.accent} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Security Answer Field */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={securityAnswer}
                  onChangeText={setSecurityAnswer}
                  placeholder="Answer"
                  placeholderTextColor={THEME.textSecondary}
                  secureTextEntry={!showAnswer}
                />
                <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)}>
                  <Feather name={showAnswer ? "eye" : "eye-off"} size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Validation Checklist */}
            <View style={styles.validationContainer}>
              <Text style={styles.validationHeader}>Password must contain:</Text>
              
              <View style={styles.validationItem}>
                <Feather name="check" size={16} color={hasLength ? THEME.success : THEME.textSecondary} />
                <Text style={[styles.validationText, hasLength && styles.validationTextActive]}>
                  At least 8 characters
                </Text>
              </View>

              <View style={styles.validationItem}>
                <Feather name="check" size={16} color={hasUpper ? THEME.success : THEME.textSecondary} />
                <Text style={[styles.validationText, hasUpper && styles.validationTextActive]}>
                  One uppercase letter
                </Text>
              </View>

              <View style={styles.validationItem}>
                <Feather name="check" size={16} color={hasNumber ? THEME.success : THEME.textSecondary} />
                <Text style={[styles.validationText, hasNumber && styles.validationTextActive]}>
                  One Number
                </Text>
              </View>
            </View>
          </View>

          {/* Progress & Strength */}
          <View style={styles.progressSection}>
            <View style={styles.progressBars}>
              <View style={[styles.bar, { backgroundColor: hasLength ? THEME.barFilled : THEME.barEmpty }]} />
              <View style={[styles.bar, { backgroundColor: hasUpper ? THEME.barFilled : THEME.barEmpty }]} />
              <View style={[styles.bar, { backgroundColor: hasNumber ? THEME.barFilled : THEME.barEmpty }]} />
            </View>
            
            <Text style={styles.strengthText}>
              Strength: <Text style={{ color: isStrong ? THEME.success : THEME.textSecondary }}>
                {isStrong ? 'Strong' : 'Weak'}
              </Text>
            </Text>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity 
            style={[styles.createButton, !isStrong && styles.createButtonDisabled]}
            onPress={handleCreateAccount}
            disabled={!isStrong}
          >
            <Text style={styles.createButtonText}>Create Account</Text>
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
    paddingTop: 10,
    flexGrow: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 5,
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

  // Main Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  sectionTitle: {
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
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
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

  // Dropdown Styles
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 15,
    height: 50,
  },
  dropdownText: {
    color: THEME.textPrimary,
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: '#2A2235', // Slightly lighter than card
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownItemText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },

  // Validation
  validationContainer: {
    marginTop: 10,
  },
  validationHeader: {
    fontSize: 14,
    color: THEME.textPrimary,
    marginBottom: 10,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  validationText: {
    fontSize: 13,
    color: THEME.textSecondary,
  },
  validationTextActive: {
    color: THEME.success,
  },

  // Progress Section
  progressSection: {
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  progressBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  strengthText: {
    fontSize: 14,
    color: THEME.textSecondary,
    fontWeight: '500',
  },

  // Button
  createButton: {
    backgroundColor: THEME.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  createButtonDisabled: {
    backgroundColor: THEME.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});