import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const THEME = {
  background: '#1A1225',
  accent: '#00FFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  buttonText: '#1A1225',
};

export default function HmmTalkLanding() {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingTop: insets.top, 
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right 
        }
      ]}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hmm Talk</Text>
          <Text style={styles.subtitle}>
            Welcome to Hmm Talk. How would you like to engage today?
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.85}
            onPress={() => router.replace("/(User)/(tabs)/Home")}
          >
            <MaterialCommunityIcons 
              name="account-voice" 
              size={54} 
              color={THEME.buttonText} 
            />
            <Text style={styles.buttonText}>I want to be heard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.85}
            onPress={() => router.push("/(Listener)/(tabs)/Home")}
          >
            <MaterialCommunityIcons 
              name="ear-hearing" 
              size={54} 
              color={THEME.buttonText} 
            />
            <Text style={styles.buttonText}>I want to listen</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 42,
    fontWeight: '300',
    color: THEME.textPrimary,
    letterSpacing: 1.2,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  buttonContainer: {
    width: '100%',
    gap: 25,
  },
  button: {
    backgroundColor: THEME.accent,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    // Neon Shadow Logic
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: THEME.buttonText,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});