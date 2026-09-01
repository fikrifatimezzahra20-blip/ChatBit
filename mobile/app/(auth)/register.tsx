import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import ScreenBackground from "../../components/ScreenBackground";
import { register } from "../../services/auth.service";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "AGENT">("CLIENT");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = fullname.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullname: cleanName,
        email: cleanEmail,
        password,
        role,
      });

      Alert.alert("Success", "Your account has been created!", [
        {
          text: "Continue",
          onPress: () => router.replace("/(app)/conversations"),
        },
      ]);
    } catch (error: any) {
      console.log("Registration error:", error);

      const message =
        error?.response?.data?.message ||
        "Could not create account. Please check your connection and try again.";

      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Let&apos;s start your journey</Text>
            </View>

            {/* Role Selector */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "CLIENT" && styles.roleButtonActive,
                ]}
                onPress={() => setRole("CLIENT")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={role === "CLIENT" ? "#FFFFFF" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    role === "CLIENT" && styles.roleButtonTextActive,
                  ]}
                >
                  Client
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "AGENT" && styles.roleButtonActive,
                ]}
                onPress={() => setRole("AGENT")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="headset-outline"
                  size={16}
                  color={role === "AGENT" ? "#FFFFFF" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    role === "AGENT" && styles.roleButtonTextActive,
                  ]}
                >
                  Support Agent
                </Text>
              </TouchableOpacity>
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
                  value={fullname}
                  onChangeText={setFullname}
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
                  value={email}
                  onChangeText={setEmail}
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
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
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
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={21}
                    color="#8A8FA8"
                  />
                </TouchableOpacity>
              </View>

              {/* Create Account Button */}
              <TouchableOpacity
                style={[styles.createButton, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/login")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginLink}> Log in</Text>
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
    marginBottom: 40,
    shadowColor: "#7C8CF8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#3c355af6",
  },
  roleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(235, 240, 255, 0.6)",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(138, 107, 232, 0.2)",
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  roleButtonActive: {
    backgroundColor: "#8A6BE8",
    shadowColor: "#8A6BE8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555D75",
  },
  roleButtonTextActive: {
    color: "#FFFFFF",
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
    shadowOffset: { width: 0, height: 3 },
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
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