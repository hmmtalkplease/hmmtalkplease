import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#1A1225",
  glass: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  accent: "#00FFFF",
  textMain: "#FFFFFF",
};

interface TimeSlotItemProps {
  time: string;
  initialValue: boolean;
}

const TimeSlotItem = ({ time, initialValue }: TimeSlotItemProps) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.slotCard}>
      <Text style={styles.timeText}>{time}</Text>
      <Switch
        trackColor={{ false: "#3E3E3E", true: COLORS.accent }}
        thumbColor={"#FFFFFF"}
        ios_backgroundColor="#3E3E3E"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
      />
    </View>
  );
};

const TimeSlotScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Header */}
        <Text style={styles.dateHeader}>Edit Schedule - 9 September, 2025</Text>

        {/* Time Slot List */}
        <TimeSlotItem time="5:00 AM - 10:00 AM" initialValue={true} />
        <TimeSlotItem time="10:30 AM - 11:30 AM" initialValue={true} />
        <TimeSlotItem time="2:00 PM - 5:00 PM" initialValue={true} />
        <TimeSlotItem time="4:30 PM - 5:30 PM" initialValue={true} />

        {/* --- Primary Action Button (Thematic Update) --- */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.9}>
          <Text style={styles.addButtonText}>+ Add New Time Slot</Text>
        </TouchableOpacity>
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
  dateHeader: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 25,
    marginTop: 10,
  },
  slotCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textMain,
  },

  addButton: {
    backgroundColor: COLORS.accent,
    height: 56,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  addButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default () => (
  <SafeAreaProvider>
    <TimeSlotScreen />
  </SafeAreaProvider>
);
