import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Thematic Color Constants
const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.06)",
  glassBorder: "rgba(255, 255, 255, 0.12)",
  accent: "#00FFFF", // Neon Cyan
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  barNeutral: "rgba(255, 255, 255, 0.2)",
  barActive: "rgba(255, 255, 255, 0.5)",
};

const StatCard = ({ title, icon, children, footerText }: any) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.headerTitleRow}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </View>
    <View style={styles.cardBody}>{children}</View>
    {footerText && <Text style={styles.footerText}>{footerText}</Text>}
  </View>
);

export default function DashboardScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Usage Time - Vertical Bar Chart */}
          <StatCard 
            title="Usage Time" 
            footerText="Hourly Activity"
            icon={<Feather name="clock" size={20} color={COLORS.accent} />}
          >
            <View style={styles.verticalChartContainer}>
              {[0.4, 0.6, 0.8, 0.7, 0.9, 0.6, 0.5, 0.4].map((h, i) => (
                <View key={i} style={[styles.vBar, { height: h * 80, backgroundColor: i % 2 === 0 ? COLORS.barNeutral : COLORS.barActive }]} />
              ))}
            </View>
          </StatCard>

          {/* Issue Categories - Vertical Bar Chart with Legend */}
          <StatCard 
            title="Issue Categories" 
            icon={<Ionicons name="shapes-outline" size={20} color={COLORS.accent} />}
          >
            <View style={styles.verticalChartContainer}>
              {[0.5, 0.9, 0.6].map((h, i) => (
                <View key={i} style={[styles.vBarLarge, { height: h * 100, backgroundColor: COLORS.barActive }]} />
              ))}
            </View>
            <View style={styles.legendRow}>
               <LegendItem label="Cat A" color={COLORS.barNeutral} />
               <LegendItem label="Cat B" color={COLORS.barActive} />
               <LegendItem label="Cat C" color={COLORS.textSecondary} />
            </View>
          </StatCard>

          {/* Acquisition Sources */}
          <StatCard 
            title="Acquisition Sources" 
            footerText="Source Distribution"
            icon={<MaterialCommunityIcons name="layers-outline" size={22} color={COLORS.accent} />}
          >
             <View style={styles.verticalChartContainer}>
              {[0.4, 0.8, 0.4, 0.3].map((h, i) => (
                <View key={i} style={[styles.vBar, { width: 35, height: h * 80, backgroundColor: i === 1 ? COLORS.barActive : COLORS.barNeutral }]} />
              ))}
            </View>
          </StatCard>

          {/* Payment Conversion - Horizontal Bar Chart */}
          <StatCard 
            title="Payment Conversion" 
            icon={<Feather name="credit-card" size={20} color={COLORS.accent} />}
          >
            <View style={styles.horizontalChart}>
              <HorizontalBar label="Step 1" progress={0.9} />
              <HorizontalBar label="Step 2" progress={0.7} />
              <HorizontalBar label="Step 3" progress={0.4} />
            </View>
          </StatCard>

          {/* Session Completion Rate */}
          <StatCard 
            title="Session Completion Rate" 
            footerText="Overall Performance"
            icon={<MaterialCommunityIcons name="progress-check" size={22} color={COLORS.accent} />}
          >
            <View style={styles.horizontalChart}>
              <HorizontalBar progress={0.8} />
              <HorizontalBar progress={0.6} />
              <HorizontalBar progress={0.3} />
            </View>
          </StatCard>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Sub-components
const LegendItem = ({ label, color }: any) => (
  <View style={styles.legendItem}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const HorizontalBar = ({ label, progress }: any) => (
  <View style={styles.hBarRow}>
    {label && <Text style={styles.hBarLabel}>{label}</Text>}
    <View style={styles.hBarTrack}>
      <View style={[styles.hBarFill, { width: `${progress * 100}%` }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cardHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 10,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  cardBody: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 15,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
  // Vertical Bars
  verticalChartContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  vBar: {
    width: 20,
    borderRadius: 4,
  },
  vBarLarge: {
    width: 40,
    borderRadius: 4,
  },
  // Horizontal Bars
  horizontalChart: {
    width: "100%",
    gap: 12,
  },
  hBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  hBarLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    width: 50,
  },
  hBarTrack: {
    flex: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 7,
    overflow: "hidden",
  },
  hBarFill: {
    height: "100%",
    backgroundColor: COLORS.barActive,
    borderRadius: 7,
  },
  // Legend
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
});