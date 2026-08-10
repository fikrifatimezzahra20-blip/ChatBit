import {
  Ionicons
} from "@expo/vector-icons";

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

export default function Login() {
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
                Welcome Back
              </Text>

              <Text style={styles.subtitle}>
                Glad to see you again!
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>

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

              {/* Forgot password */}
              <TouchableOpacity
                style={styles.forgotContainer}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Login button */}
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.85}
                onPress={() => router.replace("/(app)/conversations")}
              >
                <Text style={styles.loginButtonText}>
                  Log In
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.line} />

                <Text style={styles.orText}>
                  or continue with
                </Text>

                <View style={styles.line} />
              </View>

              {/* Social buttons */}
              <View style={styles.socialContainer}>

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.googleText}>G</Text>

                  <Text style={styles.socialText}>
                    Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="logo-apple"
                    size={21}
                    color="#111827"
                  />

                  <Text style={styles.socialText}>
                    Apple
                  </Text>
                </TouchableOpacity>

              </View>

              {/* Register */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Don&apos;t have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/register")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.registerLink}>
                    {" "}Sign up
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
    marginBottom: 100,

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
    marginBottom: 50,
  },

  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 50,
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

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 2,
    marginBottom: 24,
  },

  forgotText: {
    color: "#6850B8",
    fontSize: 13,
    fontWeight: "600",
  },

  loginButton: {
    height: 56,
    width: "100%",
    borderRadius: 28,

    backgroundColor: "#8A6BE8",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(100,110,150,0.18)",
  },

  orText: {
    color: "#737B94",
    fontSize: 12,
    marginHorizontal: 12,
  },

  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },

  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,

    backgroundColor: "rgba(229, 249, 250, 0.66)",

    borderWidth: 1,
    borderColor: "rgba(120,130,170,0.18)",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  googleText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4285F4",
  },

  socialText: {
    color: "#27345F",
    fontSize: 14,
    fontWeight: "600",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 27,
  },

  registerText: {
    color: "#69738E",
    fontSize: 14,
  },

  registerLink: {
    color: "#8A6BE8",
    fontSize: 14,
    fontWeight: "700",
  },
});