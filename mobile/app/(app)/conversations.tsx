import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenBackground from "../../components/ScreenBackground";
import ConversationItem from "../../components/ConversationItem";
import { useConversations } from "../../hooks/useConversations";
import { logout } from "../../services/auth.service";

export default function Conversations() {
  const { data: conversations = [], isLoading, isRefetching, refetch } = useConversations();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <ScreenBackground type="chat">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Profile */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/(app)/profile")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color="#7C5CE6"
            />
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
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={23}
              color="#27345F"
            />
          </TouchableOpacity>
        </View>

        {/* Title and New Action */}
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Conversations</Text>
            <Text style={styles.subtitle}>Your conversations in one place</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/(app)/new-conversation")}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* List or Loading or Empty state */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8A6BE8" />
          </View>
        ) : conversations.length > 0 ? (
          <FlatList
            data={conversations}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#8A6BE8" />
            }
            renderItem={({ item }) => {
              const dateStr = item.createdat || (item as any).created_at;
              const time = dateStr
                ? new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "";

              let statusText = "Pending agent";
              if (item.status === "en_cours") statusText = "Active conversation";
              if ((item.status as string) === "closed" || item.status === "fermee") statusText = "Closed";

              return (
                <ConversationItem
                  subject={item.subject}
                  lastMessage={statusText}
                  time={time}
                  online={item.status === "en_cours"}
                  onPress={() =>
                    router.push({
                      pathname: "/(app)/chat/[id]",
                      params: {
                        id: String(item.id),
                        name: item.subject,
                      },
                    })
                  }
                />
              );
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="chatbubbles-outline"
                size={45}
                color="#8A6BE8"
              />
            </View>

            <Text style={styles.emptyTitle}>No conversations yet</Text>

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
              <Text style={styles.newButtonText}>New Conversation</Text>
            </TouchableOpacity>
          </View>
        )}
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#8A6BE8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8A6BE8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#27345F",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#737B94",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(138,107,232,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#737B94",
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
    marginBottom: 25,
  },
  newButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8A6BE8",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 25,
    gap: 8,
    shadowColor: "#8A6BE8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  newButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});