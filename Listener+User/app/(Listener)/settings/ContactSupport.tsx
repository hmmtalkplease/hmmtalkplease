import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  iconBg: "rgba(255, 255, 255, 0.05)",
};

interface SupportCardProps {
  title: string;
  description: string;
  buttonText: string;
  iconName: any;
}

const SupportCard = ({
  title,
  description,
  buttonText,
  iconName,
}: SupportCardProps) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name={iconName}
          size={28}
          color={COLORS.accent}
        />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>

    <Text style={styles.cardDescription}>{description}</Text>

    <TouchableOpacity style={styles.button} activeOpacity={0.9}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const SupportScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SupportCard
          title="In App Support"
          description="Browse FAQs and send a direct message to our support team for quick assistance."
          buttonText="Send Chat"
          iconName="chat-outline"
        />

        <SupportCard
          title="Email Support Form"
          description="For detailed inquiries and documentation access, submit a support request via email."
          buttonText="Send Email"
          iconName="email-outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: COLORS.iconBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.accent,
    height: 54,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default () => (
  <SafeAreaProvider>
    <SupportScreen />
  </SafeAreaProvider>
);
