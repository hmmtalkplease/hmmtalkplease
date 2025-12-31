import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

// --- THEME CONSTANTS ---
const THEME = {
  background: "#1A1225",
  cardBg: "#251D30",
  inputBg: "rgba(255, 255, 255, 0.05)",
  accent: "#00FFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#3A3045",
  buttonText: "#1A1225",
};

export default function ResetSecurityQuestionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [userId, setUserId] = useState("USER-A7K3M9P2");
  const [password, setPassword] = useState("***************");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(
    "Which school did you finish your tenth in?"
  );
  const [securityAnswer, setSecurityAnswer] = useState("***************");
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Security Question</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* User ID (Read Only) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>User ID:</Text>
              <View style={[styles.inputContainer, styles.readOnlyInput]}>
                <Text style={styles.inputText}>{userId}</Text>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Enter password"
                  placeholderTextColor={THEME.textSecondary}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color={THEME.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Question Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Choose a security question</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText} numberOfLines={1}>
                  {selectedQuestion}
                </Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={THEME.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Answer Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={securityAnswer}
                  onChangeText={setSecurityAnswer}
                  secureTextEntry={!isAnswerVisible}
                  placeholder="Enter answer"
                  placeholderTextColor={THEME.textSecondary}
                />
                <TouchableOpacity
                  onPress={() => setIsAnswerVisible(!isAnswerVisible)}
                >
                  <Feather
                    name={isAnswerVisible ? "eye" : "eye-off"}
                    size={20}
                    color={THEME.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset Security Question</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 20,
    flexGrow: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.textPrimary,
  },

  // Card
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 40,
  },

  // Inputs
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: THEME.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.inputBg,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 15,
    height: 50,
  },
  readOnlyInput: {
    backgroundColor: "rgba(255, 255, 255, 0.02)", // Slightly dimmer for read-only
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: 14,
    marginRight: 10,
  },
  inputText: {
    color: THEME.textPrimary,
    fontSize: 14,
    flex: 1,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.inputBg,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 15,
    height: 50,
  },

  // Button
  resetButton: {
    backgroundColor: THEME.accent,
    borderRadius: 30,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  resetButtonText: {
    color: THEME.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
