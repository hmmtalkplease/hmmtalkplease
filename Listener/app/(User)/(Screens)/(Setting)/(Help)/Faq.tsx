import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';


// --- THEME CONSTANTS ---
const THEME = {
  background: '#1A1225',
  cardBg: '#251D30',
  accent: '#00FFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#3A3045',
  buttonText: '#1A1225',
  tabInactiveBg: 'rgba(255, 255, 255, 0.05)',
};

// --- DATA ---
const USER_FAQS = [
  {
    id: 1,
    question: 'How does anonymity work?',
    answer: 'We prioritize your privacy by using pseudonyms instead of real names. We never store your phone number or email address linked to your profile, ensuring your identity remains completely hidden from listeners.',
  },
  {
    id: 2,
    question: 'How do I save a listener to My Companion?',
    answer: 'When viewing a listener’s profile or after a session, tap the "Heart" icon. This will add them to your "My Companions" list for quick access later.',
  },
  {
    id: 3,
    question: 'Can I schedule regular sessions?',
    answer: 'Yes! You can book slots in advance with your preferred listeners. Go to their profile and select "Book Session" to see their available calendar slots.',
  },
  {
    id: 4,
    question: 'Is the service available 24/7?',
    answer: 'Our platform is global, so there are usually listeners available at any time of day. However, specific listeners set their own schedules.',
  },
];

const LISTENER_FAQS = [
  {
    id: 101,
    question: 'How do I become a verified listener?',
    answer: 'To become verified, you must complete our training module and pass a background check. Once approved, you will receive a "Verified" badge on your profile.',
  },
  {
    id: 102,
    question: 'How and when do I get paid?',
    answer: 'Payouts are processed weekly via direct bank transfer or PayPal. You can track your earnings in real-time from your Dashboard.',
  },
  {
    id: 103,
    question: 'Can I set my own availability?',
    answer: 'Absolutely. You have full control over your schedule. Use the "Availability" tab in your profile settings to open or block specific time slots.',
  },
  {
    id: 104,
    question: 'What if a user behaves inappropriately?',
    answer: 'We have a zero-tolerance policy. Use the "Report" button immediately during or after a session. Our moderation team reviews reports 24/7.',
  },
];

export default function FAQScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State for Tabs
  const [activeTab, setActiveTab] = useState<'user' | 'listener'>('user');
  
  // State for Accordion (keeps track of open question ID)
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleTabChange = (tab: 'user' | 'listener') => {
    setActiveTab(tab);
    setExpandedId(null); // Reset expanded state when switching tabs
  };

  const currentFaqs = activeTab === 'user' ? USER_FAQS : LISTENER_FAQS;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ Section</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'user' && styles.tabButtonActive]}
          onPress={() => handleTabChange('user')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'user' && styles.tabTextActive]}>
            User FAQ's
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'listener' && styles.tabButtonActive]}
          onPress={() => handleTabChange('listener')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'listener' && styles.tabTextActive]}>
            Listener FAQ's
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        {currentFaqs.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Feather 
                  name={isExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={THEME.textPrimary} 
                />
              </TouchableOpacity>
              
              {isExpanded && (
                <View style={styles.cardBody}>
                  <View style={styles.divider} />
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
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

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: THEME.tabInactiveBg,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: THEME.accent,
  },
  tabText: {
    color: THEME.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: THEME.buttonText,
    fontWeight: 'bold',
  },

  // FAQ Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    color: THEME.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 15,
  },
  answerText: {
    fontSize: 14,
    color: THEME.textSecondary,
    lineHeight: 22,
  },
});