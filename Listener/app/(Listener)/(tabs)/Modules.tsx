import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
};

// Interface for type safety
interface Module {
  id: string;
  title: string;
  count: number;
}

export default function TrainingHub() {
  const [search, setSearch] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API Fetch
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData: Module[] = [
          { id: "crisis-intervention", title: "Crisis Intervention", count: 5 },
          { id: "active-listening", title: "Active Listening Skills", count: 6 },
          { id: "platform-policy", title: "Platform Policy", count: 3 },
          { id: "empathy-basics", title: "Empathy Basics", count: 4 },
          { id: "trauma-informed", title: "Trauma Informed Care", count: 8 },
        ];

        setModules(mockData);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Filter modules based on search input
  const filteredModules = modules.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={COLORS.textSecondary}
          />
          <TextInput
            placeholder="Search Modules"
            placeholderTextColor="rgba(255,255,255,0.3)"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.accent} />
            <Text style={styles.loaderText}>Loading modules...</Text>
          </View>
        ) : filteredModules.length > 0 ? (
          filteredModules.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/modules/[id]",
                  params: { id: item.id, title: item.title },
                })
              }
            >
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={24}
                  color={COLORS.accent}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.count} modules</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>No modules found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  searchSection: { padding: 20 },
  searchBar: {
    flexDirection: "row",
    backgroundColor: COLORS.glass,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  searchInput: { color: "#FFF", marginLeft: 10, flex: 1 },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.glass,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTitle: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  cardSub: { color: COLORS.textSecondary, fontSize: 13 },
  loaderContainer: { marginTop: 50, alignItems: "center" },
  loaderText: { color: COLORS.textSecondary, marginTop: 10 },
  noResultsText: { color: COLORS.textSecondary, textAlign: "center", marginTop: 20 },
});