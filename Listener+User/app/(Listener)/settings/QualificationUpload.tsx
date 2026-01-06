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
  verified: "#4CD964",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  infoBg: "rgba(0, 255, 255, 0.05)",
};

interface DocumentRowProps {
  title: string;
  status: string;
  isVerified: boolean;
}

const DocumentRow = ({ title, status, isVerified }: DocumentRowProps) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowHeader}>
        <Text style={styles.documentTitle}>{title}</Text>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={isVerified ? "check-decagram" : "clock-outline"}
            size={18}
            color={isVerified ? COLORS.verified : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.statusText,
              isVerified ? styles.verifiedText : styles.pendingText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {!isVerified && (
        <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
          <MaterialCommunityIcons name="upload" size={20} color="#000" />
          <Text style={styles.uploadButtonText}>Upload File</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DocumentsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Thematic Info Banner */}
        <View style={styles.infoBanner}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={COLORS.accent}
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              All documents will be reviewed within 3-5 business days.
            </Text>
            <Text style={[styles.infoText, { marginTop: 4, opacity: 0.7 }]}>
              You'll be notified once verification is complete.
            </Text>
          </View>
        </View>

        {/* Main Glass Card */}
        <View style={styles.mainCard}>
          <Text style={styles.cardHeader}>Required Documents</Text>

          <DocumentRow
            title="Certification Documentation"
            status="Verified"
            isVerified={true}
          />

          <DocumentRow title="ID Proof" status="Pending" isVerified={false} />

          <DocumentRow
            title="Training Certificate"
            status="Pending"
            isVerified={false}
          />
        </View>
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
  },

  infoBanner: {
    backgroundColor: COLORS.infoBg,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 24,
    alignItems: "flex-start",
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoText: {
    color: COLORS.textMain,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },

  mainCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 20,
  },

  rowContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  documentTitle: {
    fontSize: 14,
    color: COLORS.textMain,
    fontWeight: "600",
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  verifiedText: {
    color: COLORS.verified,
  },
  pendingText: {
    color: COLORS.textSecondary,
  },

  uploadButton: {
    backgroundColor: COLORS.accent,
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  uploadButtonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default () => (
  <SafeAreaProvider>
    <DocumentsScreen />
  </SafeAreaProvider>
);
