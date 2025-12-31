import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  warningBg: 'rgba(255, 215, 0, 0.05)', // Subtle gold tint for warning
  accent: '#00FFFF', // Neon Cyan
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
  warningBorder: 'rgba(255, 215, 0, 0.3)',
};

// --- MOCK DATA ---
const USER_DETAILS = {
  userId: 'USER-A7K3M9P2',
  name: 'Naruto',
  age: '24',
  category: 'Professional',
  languages: 'English, Hindi',
};

export default function ReviewProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCreateAccount = () => {
    if (!isAgreed) {
      Alert.alert('Terms Required', 'Please agree to the Terms of Service to continue.');
      return;
    }
    // Navigate to completion or dashboard
    router.push('/Created');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Your Profile</Text>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        
        <Text style={styles.introText}>Please confirm your details:</Text>

        {/* Details Card */}
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>User ID:</Text>
            <Text style={styles.detailValue}>{USER_DETAILS.userId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{USER_DETAILS.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age:</Text>
            <Text style={styles.detailValue}>{USER_DETAILS.age}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{USER_DETAILS.category}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Languages:</Text>
            <Text style={styles.detailValue}>{USER_DETAILS.languages}</Text>
          </View>
        </View>

        {/* Warning / Reminder Card */}
        <View style={styles.warningCard}>
          <View style={styles.warningIconContainer}>
            <MaterialIcons name="warning-amber" size={28} color="#FFD700" />
          </View>
          
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Important Reminder:</Text>
            
            <View style={styles.listItem}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Save your User ID</Text>
            </View>
            
            <View style={styles.listItem}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>We don't collect email/phone</Text>
            </View>
            
            <View style={styles.listItem}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Recovery is not possible without your id</Text>
            </View>
          </View>
        </View>

        {/* Terms Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          activeOpacity={0.8}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
            {isAgreed && <Feather name="check" size={14} color={THEME.buttonText} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I understand and agree to the Terms of Service
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity 
          style={[styles.createButton, !isAgreed && styles.createButtonDisabled]}
          onPress={handleCreateAccount}
          disabled={!isAgreed}
        >
          <Text style={styles.createButtonText}>Create My Account</Text>
        </TouchableOpacity>

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
    flexGrow: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

  introText: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 15,
    marginLeft: 5,
  },

  // Details Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  detailLabel: {
    fontSize: 15,
    color: THEME.textSecondary,
  },
  detailValue: {
    fontSize: 15,
    color: THEME.textPrimary,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },

  // Warning Card
  warningCard: {
    flexDirection: 'row',
    backgroundColor: THEME.warningBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.warningBorder,
    marginBottom: 30,
  },
  warningIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFD700', // Gold color for warning text
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    color: THEME.textSecondary,
    marginRight: 8,
    fontSize: 13,
    lineHeight: 20,
  },
  listText: {
    color: THEME.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },

  // Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  checkboxLabel: {
    flex: 1,
    color: THEME.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  // Button
  createButton: {
    backgroundColor: THEME.accent, // Neon Cyan
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