import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

import ScreenBackground from "../../components/ScreenBackground";

export default function Register() {
  return (
    <ScreenBackground type="auth">
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            {/* Back */}
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

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Create Account
              </Text>

              <Text style={styles.subtitle}>
                Let&apos;s start your journey
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>

              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#8A8FA8"
                />

                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#8A8FA8"
                  autoCapitalize="words"
                  style={styles.input}
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#8A8FA8"
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#8A8FA8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#8A8FA8"
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#8A8FA8"
                  secureTextEntry
                  style={styles.input}
                />

                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons
                    name="eye-outline"
                    size={21}
                    color="#8A8FA8"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#8A8FA8"
                />

                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#8A8FA8"
                  secureTextEntry
                  style={styles.input}
                />

                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons
                    name="eye-outline"
                    size={21}
                    color="#8A8FA8"
                  />
                </TouchableOpacity>
              </View>

              {/* Create Account */}
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.85}
              >
                <Text style={styles.createButtonText}>
                  Create Account
                </Text>
              </TouchableOpacity>

              {/* Login */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/login")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginLink}>
                    {" "}Log in
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 45,
    paddingBottom: 35,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "rgba(255, 255, 255, 0.75)",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 70,

    shadowColor: "#7C8CF8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    marginBottom: 38,
  },

  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: "#3c355af6",
  },

  form: {
    width: "100%",
  },

  inputContainer: {
    height: 56,
    width: "100%",
    borderRadius: 15,

    backgroundColor: "rgba(229, 249, 250, 0.66)",

    borderWidth: 1,
    borderColor: "rgba(128, 145, 212, 0.44)",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 17,
    marginBottom: 15,

    shadowColor: "#7580B5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 12,

    color: "#27345F",
    fontSize: 15,
  },

  createButton: {
    height: 56,
    width: "100%",
    borderRadius: 28,

    backgroundColor: "#8A6BE8",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 10,

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 27,
  },

  loginText: {
    color: "#69738E",
    fontSize: 14,
  },

  loginLink: {
    color: "#8A6BE8",
    fontSize: 14,
    fontWeight: "700",
  },
});