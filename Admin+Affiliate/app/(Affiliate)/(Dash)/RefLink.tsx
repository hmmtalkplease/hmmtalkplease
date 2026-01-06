import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Alert,
  Share,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
  iconColor: "#FFFFFF",
};

// --- MOCK DATA ---
const REFERRAL_CODE = "LISTEN233454";
const REFERRAL_LINK = "https://listenup.app/ref/LISTEN247";
const STATS = {
  clicks: 1234,
  signups: 247,
};

export default function ReferralLinkScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCopy = (text: string, type: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", `Your ${type} has been copied to clipboard.`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on ListenUp! Use my code ${REFERRAL_CODE} or click here: ${REFERRAL_LINK}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleDownloadQR = () => {
    Alert.alert("Download", "QR Code saved to gallery.");
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Referral Link</Text>
          <Text style={styles.headerSubtitle}>Share and Earn rewards</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Code Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your Referral Code</Text>
          <View style={styles.copyContainer}>
            <Text style={styles.codeText}>{REFERRAL_CODE}</Text>
            <TouchableOpacity onPress={() => handleCopy(REFERRAL_CODE, "code")}>
              <Feather name="copy" size={20} color={THEME.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Referral Link Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your Referral Link</Text>
          <View style={styles.copyContainer}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {REFERRAL_LINK}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(REFERRAL_LINK, "link")}>
              <Feather name="copy" size={20} color={THEME.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Link Performance Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Link Performance</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Clicks</Text>
            <Text style={styles.statValue}>{STATS.clicks}</Text>
          </View>

          <View style={[styles.statRow, { marginBottom: 0 }]}>
            <Text style={styles.statLabel}>Signups</Text>
            <Text style={styles.statValue}>{STATS.signups}</Text>
          </View>
        </View>

        {/* Share Via Section */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Share via</Text>
          <View style={styles.shareButtonsRow}>
            {/* WhatsApp */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <FontAwesome
                name="whatsapp"
                size={32}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>

            {/* X (Twitter) */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <FontAwesome name="twitter" size={28} color={THEME.textPrimary} />
              {/* Note: 'X' icon not standard in all vector sets yet, using Twitter as fallback or Feather 'x' */}
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <FontAwesome
                name="facebook"
                size={28}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.card}>
          <View style={styles.qrHeader}>
            <Text style={styles.cardLabel}>QR Code</Text>
            <TouchableOpacity onPress={handleDownloadQR}>
              <Feather name="download" size={20} color={THEME.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.qrContainer}>
            {/* Simulated QR Code using Icon */}
            <MaterialCommunityIcons
              name="qrcode"
              size={140}
              color={THEME.textPrimary}
            />
          </View>
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
    marginTop: 15,
    paddingHorizontal: 15,
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
    marginTop: 4,
  },

  // Card Styles
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: THEME.textSecondary, // Standard label color for "Your Referral Code", etc.
    marginBottom: 12,
  },

  // Copy Container (Inputs)
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  codeText: {
    fontSize: 18,
    color: THEME.textPrimary,
    fontWeight: "600",
    letterSpacing: 1,
  },
  linkText: {
    fontSize: 14,
    color: THEME.textPrimary,
    flex: 1,
    marginRight: 10,
  },

  // Stats
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  statValue: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: "600",
  },

  // Share Buttons
  shareButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  shareButton: {
    flex: 1,
    aspectRatio: 1, // Makes them square
    backgroundColor: THEME.inputBg,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },

  // QR Code
  qrHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
