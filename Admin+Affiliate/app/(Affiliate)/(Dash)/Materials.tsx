import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Clipboard,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
};

const { width } = Dimensions.get("window");

// --- MOCK DATA ---
const BANNERS = [
  { id: 1, title: "Banner 1", ratio: "16:9" },
  { id: 2, title: "Banner 2", ratio: "16:9" },
];

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

const CAPTIONS = [
  {
    id: 1,
    text: '"Join me on ListenUp - where empathy meets healing. Use my code LISTEN247 for exclusive benefits! 🌟"',
  },
  {
    id: 2,
    text: '"Need someone to listen? I found the perfect app! Get started with code LISTEN247 💚"',
  },
];

export default function MarketingMaterialsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", "Caption copied to clipboard.");
  };

  const handleDownload = (item: string) => {
    Alert.alert("Download", `Downloading ${item}...`);
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
          <Text style={styles.headerTitle}>Materials</Text>
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
        {/* Web Banners */}
        <Text style={styles.sectionLabel}>Web Banners</Text>
        <View style={styles.bannersContainer}>
          {BANNERS.map((banner) => (
            <TouchableOpacity
              key={banner.id}
              style={styles.bannerCard}
              onPress={() => handleDownload(banner.title)}
            >
              <View style={styles.placeholderIcon}>
                <Feather name="image" size={32} color={THEME.textSecondary} />
              </View>
              <Text style={styles.placeholderText}>{banner.title}</Text>
              <View style={styles.downloadBadge}>
                <Feather name="download" size={14} color={THEME.buttonText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media Posts */}
        <Text style={styles.sectionLabel}>Social Media Posts</Text>
        <View style={styles.postsContainer}>
          {POSTS.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => handleDownload(post.title)}
            >
              <Feather name="instagram" size={24} color={THEME.textSecondary} />
              <Text style={styles.postText}>{post.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pre-Written Captions */}
        <Text style={styles.sectionLabel}>Pre-Written Captions</Text>
        <View style={styles.captionsContainer}>
          {CAPTIONS.map((caption, index) => (
            <View
              key={caption.id}
              style={[
                styles.captionCard,
                index === CAPTIONS.length - 1 && { borderBottomWidth: 1 }, // Add bottom border to last item if we want it closed, but standard list style usually omits
              ]}
            >
              <Text style={styles.captionText}>{caption.text}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopy(caption.text)}
              >
                <Feather name="copy" size={18} color={THEME.accent} />
              </TouchableOpacity>
            </View>
          ))}
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
    paddingHorizontal: 10,
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

  // Section Labels
  sectionLabel: {
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 5,
    fontWeight: "500",
  },

  // Banners
  bannersContainer: {
    gap: 15,
    marginBottom: 30,
  },
  bannerCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    position: "relative",
    overflow: "hidden",
  },
  placeholderIcon: {
    marginBottom: 10,
    opacity: 0.5,
  },
  placeholderText: {
    color: THEME.textSecondary,
    fontSize: 14,
  },
  downloadBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: THEME.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  // Posts
  postsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  postCard: {
    width: (width - 60) / 3, // 3 items with gaps
    height: (width - 60) / 3,
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    gap: 8,
  },
  postText: {
    color: THEME.textSecondary,
    fontSize: 12,
  },

  // Captions
  captionsContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
    overflow: "hidden", // Ensures inner items don't bleed out corners
  },
  captionCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 15,
  },
  captionText: {
    flex: 1,
    color: THEME.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
  },
  copyButton: {
    padding: 5,
    marginTop: 2,
  },
});
