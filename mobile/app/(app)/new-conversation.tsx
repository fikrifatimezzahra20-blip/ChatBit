import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenBackground from "../../components/ScreenBackground";

export default function NewConversation() {
  const [subject, setSubject] = useState("");

  const handleStart = () => {
    const cleanSubject = subject.trim();

    if (!cleanSubject) {
      return;
    }

    router.push({
      pathname: "/(app)/chat/[id]",
      params: {
        id: "1",
        subject: cleanSubject,
      },
    });
  };

  return (
    <ScreenBackground type="chat">
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#27345F"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              New Conversation
            </Text>

            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>

            <View style={styles.iconCircle}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={42}
                color="#8A6BE8"
              />
            </View>

            <Text style={styles.title}>
              How can we help?
            </Text>

            <Text style={styles.subtitle}>
              Tell our support team what you need help with.
            </Text>

            {/* Subject */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="help-circle-outline"
                size={21}
                color="#8A8FA8"
              />

              <TextInput
                placeholder="Conversation subject"
                placeholderTextColor="#8A8FA8"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={handleStart}
              />
            </View>

            {/* Start */}
            <TouchableOpacity
              style={[
                styles.button,
                !subject.trim() && styles.buttonDisabled,
              ]}
              onPress={handleStart}
              activeOpacity={0.85}
              disabled={!subject.trim()}
            >
              <Text style={styles.buttonText}>
                Start Conversation
              </Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

          </View>

        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 24,
  },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#27345F",
  },

  placeholder: {
    width: 44,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(238,233,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#737B94",
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 300,
    marginBottom: 30,
  },

  inputContainer: {
    width: "100%",
    height: 56,
    borderRadius: 15,
    backgroundColor: "rgba(229,249,250,0.75)",
    borderWidth: 1,
    borderColor: "rgba(128,145,212,0.35)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#27345F",
  },

  button: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#8A6BE8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});