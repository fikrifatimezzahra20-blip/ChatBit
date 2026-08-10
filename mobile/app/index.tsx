import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import ScreenBackground from "../components/ScreenBackground";

export default function Index() {
  return (
    <ScreenBackground type="welcome">
      <View style={styles.container}>

        {/* Logo */}
        <Image
          source={require("../assets/images/backgrounds/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to ChatBit</Text>

          <Text style={styles.subtitle}>
            A new wave of conversations
          </Text>

          <Text style={styles.description}>
            Connect, chat and share in a calm and beautiful space.
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 55,
  },

  logo: {
    width: 250,
    height: 200,
    marginBottom: 30,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 230,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#222d52",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5b4697de",
    marginBottom: 10,
  },

  description: {
    fontSize: 12,
    color: "#404a5fee",
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 310,
  },

  button: {
    width: "90%",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#8A6BE8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    marginTop: 18,
  },

  loginText: {
    color: "#53617D",
    fontSize: 14,
  },

  loginLink: {
    color: "#8A6BE8",
    fontSize: 14,
    fontWeight: "700",
  },
});