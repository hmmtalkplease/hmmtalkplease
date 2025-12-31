import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
};

export default function ModuleDetail() {
  const { id, title } = useLocalSearchParams();

  // Simulated lesson data logic
  const lessons = [
    { id: "1", title: "Lesson 1: Introduction", completed: true },
    { id: "2", title: "Lesson 2: Core Ethics", completed: true },
    { id: "3", title: "Lesson 3: Practical Exercise", completed: false },
  ];

  const progress =
    (lessons.filter((l) => l.completed).length / lessons.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          title: typeof title === "string" ? title : "Module Details",
          headerTitleAlign: "center",
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Progress Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerLabel}>Course Progress</Text>
            <Text style={styles.headerTitle}>{title || id}</Text>
          </View>
          <Text style={styles.percentText}>{progress.toFixed(0)}%</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        {/* Lessons List */}
        {lessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonCard}>
            <MaterialCommunityIcons
              name={
                lesson.completed ? "checkbox-marked" : "checkbox-blank-outline"
              }
              size={24}
              color={lesson.completed ? COLORS.accent : COLORS.textSecondary}
            />
            <Text style={styles.lessonText}>{lesson.title}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue Module</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  headerLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  percentText: { color: COLORS.accent, fontSize: 20, fontWeight: "bold" },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    marginBottom: 30,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 3,
    shadowColor: COLORS.accent,
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  lessonCard: {
    flexDirection: "row",
    backgroundColor: COLORS.glass,
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  lessonText: { color: "#FFF", marginLeft: 15, fontSize: 16 },
  primaryButton: {
    backgroundColor: COLORS.accent,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
