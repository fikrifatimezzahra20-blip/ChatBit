import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type ConversationItemProps = {
  subject: string;
  lastMessage?: string;
  time?: string;
  online?: boolean;
  onPress: () => void;
};

export default function ConversationItem({
  subject,
  lastMessage = "No messages yet",
  time = "",
  online = false,
  onPress,
}: ConversationItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={23}
          color="#7C5CE6"
        />

        {online && <View style={styles.onlineDot} />}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={styles.subject}
            numberOfLines={1}
          >
            {subject}
          </Text>

          <Text style={styles.time}>
            {time}
          </Text>
        </View>

        <Text
          style={styles.lastMessage}
          numberOfLines={1}
        >
          {lastMessage}
        </Text>
      </View>

      {/* Arrow */}
      <Ionicons
        name="chevron-forward"
        size={19}
        color="#A0A6BA"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 76,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 10,

    marginBottom: 10,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.68)",

    borderWidth: 1,
    borderColor: "rgba(128,145,212,0.12)",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: "rgba(138,107,232,0.12)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,

    position: "relative",
  },

  onlineDot: {
    position: "absolute",

    width: 12,
    height: 12,
    borderRadius: 6,

    backgroundColor: "#55C9A3",

    right: 0,
    bottom: 1,

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  subject: {
    flex: 1,

    fontSize: 15,
    fontWeight: "700",

    color: "#27345F",

    marginRight: 8,
  },

  time: {
    fontSize: 11,
    color: "#8991A8",
  },

  lastMessage: {
    fontSize: 13,
    color: "#737B94",
  },
});