import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
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
  success: '#00FF9D',
  badgeText: '#1A1225',
};

// --- MOCK DATA ---
const CREDIT_PACKAGES = [
  { id: 1, credits: 100, cost: '₹100', bonus: null, tag: null },
  { id: 2, credits: 250, cost: '₹250', bonus: null, tag: null },
  { id: 3, credits: 500, cost: '₹500', bonus: null, tag: null },
  { id: 4, credits: 1000, cost: '₹1000', bonus: '+75', tag: 'Recommended' },
  { id: 5, credits: 2500, cost: '₹2500', bonus: '+50', tag: null },
  { id: 6, credits: 5000, cost: '₹4500', bonus: '+150', tag: 'Best Deal' },
];

const TRANSACTIONS = [
  { id: 1, title: 'Purchased 500 credits', date: 'Today', amount: '+₹500', type: 'credit' },
  { id: 2, title: 'Session deduction', date: 'Yesterday', amount: '₹75', type: 'debit' },
  { id: 3, title: 'Session extension', date: 'Yesterday', amount: '₹50', type: 'debit' },
  { id: 4, title: 'Purchased 250 credits', date: '2 days ago', amount: '+₹250', type: 'credit' },
];

export default function CreditsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(4); // Default to ID 4

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="wallet-outline" size={20} color={THEME.textPrimary} />
            <Text style={styles.headerTitle}>Credits & Payments</Text>
          </View>
          <Text style={styles.headerSubtitle}>your payments remain anonymous and secure</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Current Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>450</Text>
          <Text style={styles.balanceUnit}>Credits</Text>
          <Text style={styles.balanceWorth}>(Worth ₹450)</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.conversionText}>1 credit = ₹1</Text>
        </View>

        {/* Free Trial Status */}
        <View style={styles.trialCard}>
          <View style={styles.trialHeader}>
            <View>
              <Text style={styles.trialTitle}>Free Trial Status</Text>
              <Text style={styles.trialSub}>Free Sessions Used: 0/2</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.trialCount}>2</Text>
              <Text style={styles.trialRemaining}>Remaining</Text>
            </View>
          </View>
          <View style={styles.trialInfoBox}>
            <Text style={styles.trialInfoText}>2 free 10-minute sessions for new users.</Text>
          </View>
        </View>

        {/* Credit Packages Grid */}
        <Text style={styles.sectionTitle}>+ Choose a Credit Package</Text>
        <View style={styles.packagesGrid}>
          {CREDIT_PACKAGES.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <TouchableOpacity 
                key={pkg.id} 
                style={[styles.packageCard, isSelected && styles.packageCardSelected]}
                onPress={() => setSelectedPackage(pkg.id)}
                activeOpacity={0.9}
              >
                {pkg.tag && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{pkg.tag}</Text>
                  </View>
                )}
                
                <View style={styles.pkgContent}>
                  <View>
                    <Text style={styles.pkgCredits}>{pkg.credits}</Text>
                    {pkg.bonus && (
                      <View style={styles.bonusRow}>
                        <MaterialCommunityIcons name="gift-outline" size={12} color={THEME.accent} />
                        <Text style={styles.bonusText}>{pkg.bonus}</Text>
                      </View>
                    )}
                    <Text style={styles.pkgCost}>{pkg.cost}</Text>
                  </View>
                  
                  {/* Radio Circle */}
                  <View style={[styles.radioOuter, isSelected && { borderColor: THEME.accent }]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <TouchableOpacity style={styles.paymentMethodCard}>
          <View style={styles.paymentIconBox}>
            <MaterialCommunityIcons name="credit-card-outline" size={24} color={THEME.textPrimary} />
          </View>
          <View>
            <Text style={styles.methodTitle}>Razorpay</Text>
            <Text style={styles.methodSub}>(UPI / Card / QR Code)</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.paymentMethodCard}>
          <View style={styles.paymentIconBox}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color={THEME.textPrimary} />
          </View>
          <View>
            <Text style={styles.methodTitle}>Scan QR for Payment</Text>
            <Text style={styles.methodSub}>Quick and secure</Text>
          </View>
        </TouchableOpacity>

        {/* Transaction History */}
        <View style={styles.historyHeader}>
          <MaterialCommunityIcons name="history" size={20} color={THEME.textPrimary} />
          <Text style={styles.sectionTitleNoMargin}>Transaction History</Text>
        </View>

        <View style={styles.historyContainer}>
          {TRANSACTIONS.map((t) => (
            <View key={t.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={styles.historyIconBox}>
                  <MaterialCommunityIcons 
                    name={t.type === 'credit' ? "plus-box" : "credit-card-minus-outline"} 
                    size={20} 
                    color={THEME.textPrimary} 
                  />
                </View>
                <View>
                  <Text style={styles.historyTitle}>{t.title}</Text>
                  <Text style={styles.historyDate}>{t.date}</Text>
                </View>
              </View>
              <Text style={t.type === 'credit' ? styles.amountCredit : styles.amountDebit}>
                {t.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Cost Breakdown */}
        <View style={styles.breakdownContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 }}>
             <MaterialCommunityIcons name="clock-outline" size={18} color={THEME.textPrimary} />
             <Text style={styles.breakdownTitle}>Session Cost Breakdown</Text>
          </View>
          
          <View style={styles.breakdownRow}>
            <Text style={styles.bdLabel}>First 5 minutes</Text>
            <Text style={styles.bdValue}>₹75</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.bdLabel}>Each additional 5 minutes</Text>
            <Text style={styles.bdValue}>₹50</Text>
          </View>
          <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.bdLabel}>Maximum session duration</Text>
            <Text style={styles.bdValue}>45 mins</Text>
          </View>
        </View>

        {/* Policies */}
        <View style={styles.policyCard}>
          <Text style={styles.policyTitle}>Payment & Refund Policies</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.policyText}>No personal payment data stored</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.policyText}>Razorpay handled externally</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.policyText}>Credits are non-expiring</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.policyText}>Refund available only for unused credits</Text>
          </View>
          
          <View style={styles.policyDivider} />
          <Text style={styles.policyFooter}>
            Powered by Razorpay. We do not store any payment details.
          </Text>
        </View>

        {/* Invoice Button */}
        <TouchableOpacity style={styles.invoiceButton}>
          <Text style={styles.invoiceBtnText}>Download Invoice</Text>
          <Feather name="download" size={20} color={THEME.textPrimary} />
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
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 5,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: '300',
    color: THEME.textPrimary,
    lineHeight: 56,
  },
  balanceUnit: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: '500',
  },
  balanceWorth: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: THEME.border,
    marginVertical: 15,
  },
  conversionText: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: '600',
  },

  // Trial Card
  trialCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  trialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.textPrimary,
  },
  trialSub: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 4,
  },
  trialCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  trialRemaining: {
    fontSize: 10,
    color: THEME.textSecondary,
  },
  trialInfoBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  trialInfoText: {
    color: THEME.textSecondary,
    fontSize: 12,
  },

  // Packages Grid
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.textPrimary,
    marginBottom: 15,
    marginTop: 10,
  },
  packagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 25,
  },
  packageCard: {
    width: '48%', // 2 columns
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    position: 'relative',
    height: 110,
    justifyContent: 'center',
  },
  packageCardSelected: {
    borderColor: THEME.accent,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: THEME.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: THEME.badgeText,
  },
  pkgContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pkgCredits: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME.textPrimary,
  },
  bonusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  bonusText: {
    fontSize: 12,
    color: THEME.accent,
    fontWeight: '600',
  },
  pkgCost: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginTop: 6,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.accent,
  },

  // Payment Methods
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    gap: 15,
  },
  paymentIconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.textPrimary,
  },
  methodSub: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 2,
  },

  // History
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitleNoMargin: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.textPrimary,
  },
  historyContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTitle: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 11,
    color: THEME.textSecondary,
    marginTop: 2,
  },
  amountCredit: {
    color: THEME.success,
    fontWeight: '600',
  },
  amountDebit: {
    color: THEME.textPrimary,
    fontWeight: '600',
  },

  // Breakdown
  breakdownContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  breakdownTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.textPrimary,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  bdLabel: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  bdValue: {
    color: THEME.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },

  // Policies
  policyCard: {
    backgroundColor: '#2A2A2A', // Slightly different greyish for the policy box
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.textPrimary,
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    color: THEME.textPrimary,
    fontSize: 14,
  },
  policyText: {
    color: '#D0D0D0',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  policyDivider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 15,
  },
  policyFooter: {
    color: '#999',
    fontSize: 11,
    textAlign: 'center',
  },

  // Invoice Button
  invoiceButton: {
    flexDirection: 'row',
    backgroundColor: THEME.cardBg,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
    gap: 10,
    marginBottom: 10,
  },
  invoiceBtnText: {
    color: THEME.textPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
});