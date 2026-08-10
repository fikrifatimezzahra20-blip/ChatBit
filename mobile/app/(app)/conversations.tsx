import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenBackground from "../../components/ScreenBackground";

export default function Conversations() {
  return (
    <ScreenBackground type="chat">
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>

          {/* Profile */}
          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.8}
          >
            <View style={styles.profileImage}>
              <Ionicons
                name="person"
                size={22}
                color="#8A6BE8"
              />
            </View>
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require("../../assets/images/backgrounds/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={23}
              color="#27345F"
            />
          </TouchableOpacity>

        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Conversations
          </Text>

          <Text style={styles.subtitle}>
            Your conversations in one place
          </Text>
        </View>

        {/* Empty state */}
        <View style={styles.emptyContainer}>

          <View style={styles.iconCircle}>
            <Ionicons
              name="chatbubbles-outline"
              size={45}
              color="#8A6BE8"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No conversations yet
          </Text>

          <Text style={styles.emptyText}>
            Start a new conversation with our support team.
          </Text>

          {/* New conversation */}
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => router.push("/(app)/new-conversation")}
            activeOpacity={0.85}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.newButtonText}>
              New Conversation
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 22,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEE9FF",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 125,
    height: 65,
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    marginTop: 30,
    marginBottom: 25,
  },

  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#27345F",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#737B94",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(238,233,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#737B94",
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 280,
    marginBottom: 25,
  },

  newButton: {
    height: 54,
    paddingHorizontal: 25,
    borderRadius: 27,
    backgroundColor: "#8A6BE8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  newButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});