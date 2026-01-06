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
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Thematic Color Constants
const COLORS = {
  bg: '#1A1225',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  accent: '#00FFFF', // Neon Cyan
  textMain: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  inputBg: 'rgba(255, 255, 255, 0.05)',
};

export default function WithdrawFundsScreen() {
  const [amount, setAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- Hero Balance Card --- */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹4,500.00</Text>
        </View>

        {/* --- Input Section --- */}
        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Amount to Withdraw</Text>
          <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Amount"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          <Text style={styles.inputLabel}>Payment Method</Text>
          <TouchableOpacity style={styles.methodSelector} activeOpacity={0.7}>
            <Text style={styles.methodText}>Select Payment Method</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={COLORS.accent} />
          </TouchableOpacity>

          {/* --- Thematic Info Banner --- */}
          <View style={styles.infoBanner}>
            <MaterialCommunityIcons name="information" size={20} color={COLORS.accent} />
            <Text style={styles.infoText}>
              Withdrawals typically take 3-5 business days to process. Minimum withdrawal amount is ₹500.
            </Text>
          </View>

          {/* --- Action Button --- */}
          <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.9}>
            <Text style={styles.withdrawButtonText}>Initiate Withdrawal</Text>
          </TouchableOpacity>
        </View>

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
  },
  // Balance Card (Hero Element)
  balanceCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    paddingVertical: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 30,
    marginTop: 10,
  },
  balanceLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  balanceAmount: {
    color: COLORS.textMain,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  // Form Elements
  formSection: {
    gap: 15,
  },
  inputLabel: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 15,
    height: 60,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  inputFocused: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(0, 255, 255, 0.03)',
  },
  currencyPrefix: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: '500',
  },
  methodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
    borderRadius: 15,
    height: 60,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  methodText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  // Info Banner
  infoBanner: {
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: COLORS.textMain,
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
  },
  // Withdraw Button
  withdrawButton: {
    backgroundColor: COLORS.accent,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    // Glow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  withdrawButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});