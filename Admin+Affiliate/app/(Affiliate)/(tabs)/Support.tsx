import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  success: "#00FF9D", // Neon Green
  warning: "#FFD700", // Gold
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const TICKETS = [
  {
    id: "12847",
    title: "Payment not received",
    status: "In Progress",
    statusColor: THEME.warning,
  },
  {
    id: "12847",
    title: "Account Verification issue",
    status: "Resolved",
    statusColor: THEME.success,
  },
];

const FAQS = [
  "How do I get paid?",
  "How do I track my referrals?",
  "What is the minimum withdrawal amount?",
  "How do I change my payment method?",
];

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Scroll Refs & State
  const scrollViewRef = useRef<ScrollView>(null);
  const [ticketSectionY, setTicketSectionY] = useState(0);
  const [faqSectionY, setFaqSectionY] = useState(0);

  // Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Scroll Handlers
  const scrollToTicket = () => {
    scrollViewRef.current?.scrollTo({ y: ticketSectionY, animated: true });
  };

  const scrollToFaq = () => {
    scrollViewRef.current?.scrollTo({ y: faqSectionY, animated: true });
  };

  // Layout Capturers
  const onTicketLayout = (event: LayoutChangeEvent) => {
    setTicketSectionY(event.nativeEvent.layout.y);
  };

  const onFaqLayout = (event: LayoutChangeEvent) => {
    setFaqSectionY(event.nativeEvent.layout.y);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Gradient Glow */}
      <LinearGradient
        colors={["rgba(0, 255, 255, 0.08)", "transparent"]}
        style={styles.headerGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Support</Text>
          <Text style={styles.headerSubtitle}>We're Here to Help!</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Help */}
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.quickHelpRow}>
          <TouchableOpacity
            style={styles.quickHelpCard}
            activeOpacity={0.8}
            onPress={scrollToFaq}
          >
            <View style={styles.iconCircle}>
              <Feather name="help-circle" size={24} color={THEME.buttonText} />
            </View>
            <Text style={styles.quickHelpTitle}>FAQs</Text>
            <Text style={styles.quickHelpSub}>Common questions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickHelpCard}
            activeOpacity={0.8}
            onPress={scrollToTicket} // "Community" button scrolls to Ticket section per request
          >
            <View style={styles.iconCircle}>
              <Feather name="users" size={24} color={THEME.buttonText} />
            </View>
            <Text style={styles.quickHelpTitle}>Community</Text>
            <Text style={styles.quickHelpSub}>Connect With Others</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Us */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactRow}>
            <View style={styles.contactIconBox}>
              <Feather name="message-square" size={20} color={THEME.accent} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Live Chat</Text>
              <Text style={styles.contactSub}>Available 9 AM - 6 PM IST</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactRow}>
            <View style={styles.contactIconBox}>
              <Feather name="mail" size={20} color={THEME.accent} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email Support</Text>
              <Text style={styles.contactSub}>affiliatesupport@gmail.com</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={THEME.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Create Support Ticket Section */}
        <View onLayout={onTicketLayout} style={styles.ticketSection}>
          <Text style={styles.sectionTitle}>Create a Support Ticket</Text>
          <View style={styles.card}>
            {/* Category Dropdown (Simulated) */}
            <TouchableOpacity style={styles.dropdownInput}>
              <Text style={styles.inputTextPlaceholder}>Select a Category</Text>
              <Feather
                name="chevron-down"
                size={20}
                color={THEME.textSecondary}
              />
            </TouchableOpacity>

            {/* Subject Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Subject"
                placeholderTextColor={THEME.textSecondary}
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            {/* Message Input */}
            <View style={styles.textAreaContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Message"
                placeholderTextColor={THEME.textSecondary}
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Tickets */}
        <Text style={styles.sectionTitle}>My Tickets</Text>
        <View style={styles.ticketsContainer}>
          {TICKETS.map((ticket, index) => (
            <TouchableOpacity key={index} style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: ticket.statusColor },
                  ]}
                >
                  <Text style={styles.statusText}>{ticket.status}</Text>
                </View>
              </View>
              <Text style={styles.ticketId}>Ticket #{ticket.id}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All Tickets</Text>
          </TouchableOpacity>
        </View>

        {/* Popular FAQs Section */}
        <View onLayout={onFaqLayout} style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Popular FAQ's</Text>
          <View style={styles.faqContainer}>
            {FAQS.map((faq, index) => (
              <TouchableOpacity key={index} style={styles.faqRow}>
                <Text style={styles.faqText}>{faq}</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Video Tutorials */}
        <Text style={styles.sectionTitle}>Video Tutorials</Text>
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder} />
          <View style={styles.videoPlaceholder} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
    paddingHorizontal: 25,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
  },

  sectionTitle: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    fontWeight: "500",
    paddingLeft: 5,
  },

  // Quick Help
  quickHelpRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  quickHelpCard: {
    flex: 1,
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    height: 130,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: THEME.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  quickHelpTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  quickHelpSub: {
    fontSize: 12,
    color: THEME.textSecondary,
    textAlign: "center",
  },

  // Contact Us
  contactContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 15,
    color: THEME.textPrimary,
    fontWeight: "500",
  },
  contactSub: {
    fontSize: 12,
    color: THEME.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: 70, // Align with text start
  },

  // Ticket Form
  ticketSection: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  inputContainer: {
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    justifyContent: "center",
  },
  textAreaContainer: {
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    height: 100,
  },
  input: {
    paddingHorizontal: 15,
    height: 50,
    color: THEME.textPrimary,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    paddingTop: 15,
  },
  inputTextPlaceholder: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: THEME.accent,
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: THEME.buttonText,
    fontWeight: "bold",
    fontSize: 14,
  },

  // My Tickets
  ticketsContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 25,
  },
  ticketCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  ticketTitle: {
    color: THEME.textPrimary,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    marginRight: 10,
  },
  ticketId: {
    color: THEME.textSecondary,
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  viewAllBtn: {
    alignItems: "center",
    paddingTop: 5,
  },
  viewAllText: {
    color: THEME.textSecondary,
    fontSize: 12,
    textDecorationLine: "underline",
  },

  // Popular FAQs
  faqSection: {
    marginBottom: 25,
  },
  faqContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingVertical: 5,
  },
  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  faqText: {
    color: THEME.textPrimary,
    fontSize: 14,
  },

  // Video Tutorials
  videoContainer: {
    gap: 15,
    marginBottom: 20,
  },
  videoPlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    // Add subtle gradient/shimmer effect placeholder
    opacity: 0.8,
  },
});
