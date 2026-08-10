import {
  Ionicons,
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import ScreenBackground from "../../../components/ScreenBackground";
import PresenceIndicator from "../../../components/PresenceIndicator";

type Message = {
  id: string;
  text?: string;
  image?: string;
  mine: boolean;
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How can I help you today? 👋",
      mine: false,
    },
  ]);

  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage = () => {
    const text = message.trim();

    if (!text) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      mine: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    setMessage("");

    Keyboard.dismiss();
  };

  // =========================
  // PICK IMAGE
  // =========================

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],

        // مهم بزاف:
        allowsEditing: false,

        // الصورة بالجودة الأصلية قدر الإمكان
        quality: 1,

        // ما نحولوش الصورة
        base64: false,

        // ما نقصوهاش
        aspect: undefined,
      });

    if (result.canceled) {
      return;
    }

    const selectedImage = result.assets[0];

    if (!selectedImage?.uri) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      image: selectedImage.uri,
      mine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ScreenBackground type="welcome">

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <Pressable
          style={styles.screen}
          onPress={() => Keyboard.dismiss()}
        >

          {/* ================= HEADER ================= */}

          <View style={styles.header}>

            {/* Back */}

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={25}
                color="#27345F"
              />
            </TouchableOpacity>

            {/* Profile */}

            <View style={styles.profileContainer}>

              <View style={styles.avatarContainer}>

                <Image
                  source={{
                    uri:
                      "https://i.pravatar.cc/150?img=47",
                  }}
                  style={styles.avatar}
                />

                <View style={styles.onlineDot} />

              </View>

              <View style={styles.userInfo}>

                <Text style={styles.userName}>
                  Sarah Johnson
                </Text>

                <PresenceIndicator online />

              </View>

            </View>

            {/* Header actions */}

            <View style={styles.headerActions}>

              <TouchableOpacity
                style={styles.headerIcon}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="call-outline"
                  size={21}
                  color="#8061D9"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerIcon}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="videocam-outline"
                  size={22}
                  color="#8061D9"
                />
              </TouchableOpacity>

            </View>

          </View>

          {/* ================= MESSAGES ================= */}

          <ScrollView
            style={styles.messages}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {messages.map((item) => (

              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  item.mine
                    ? styles.myRow
                    : styles.otherRow,
                ]}
              >

                <View
                  style={[
                    styles.bubble,
                    item.mine
                      ? styles.myBubble
                      : styles.otherBubble,
                  ]}
                >

                  {/* IMAGE */}

                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.messageImage}

                      // مهم:
                      // الصورة كاملة بلا crop
                      resizeMode="contain"
                    />
                  )}

                  {/* TEXT */}

                  {item.text && (
                    <Text
                      style={[
                        styles.messageText,
                        item.mine
                          ? styles.myText
                          : styles.otherText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  )}

                  {item.mine && (
                    <View style={styles.messageMeta}>

                      <Text style={styles.time}>
                        {new Date().toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Text>

                      <Ionicons
                        name="checkmark-done"
                        size={14}
                        color="#7C8CF8"
                      />

                    </View>
                  )}

                </View>

              </View>

            ))}

          </ScrollView>

          {/* ================= INPUT ================= */}

          <View style={styles.inputArea}>

            <View style={styles.inputContainer}>

              {/* IMAGE BUTTON */}

              <TouchableOpacity
                style={styles.attachButton}
                onPress={pickImage}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="image-outline"
                  size={23}
                  color="#8061D9"
                />
              </TouchableOpacity>

              {/* INPUT */}

              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                placeholderTextColor="#8992AA"
                style={styles.input}
                multiline
                returnKeyType="default"
              />

              {/* SEND */}

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !message.trim() &&
                    styles.sendButtonDisabled,
                ]}
                onPress={sendMessage}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="send"
                  size={18}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

            </View>

          </View>

        </Pressable>

      </KeyboardAvoidingView>

    </ScreenBackground>
  );
}

const styles = StyleSheet.create({

  keyboard: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,

    backgroundColor:
      "rgba(255,255,255,0.72)",

    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(120,130,170,0.12)",
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.8)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  profileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },

  onlineDot: {
    position: "absolute",

    width: 11,
    height: 11,
    borderRadius: 6,

    backgroundColor: "#58D6B2",

    right: 0,
    bottom: 1,

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  userInfo: {
    marginLeft: 10,
  },

  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#27345F",
    marginBottom: 1,
  },

  headerActions: {
    flexDirection: "row",
    gap: 5,
  },

  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      "rgba(255,255,255,0.65)",
  },

  // =========================
  // MESSAGES
  // =========================

  messages: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 17,
    paddingVertical: 20,

    gap: 12,
  },

  messageRow: {
    width: "100%",
    flexDirection: "row",
  },

  myRow: {
    justifyContent: "flex-end",
  },

  otherRow: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 20,
  },

  myBubble: {
    backgroundColor: "#8A6BE8",

    borderBottomRightRadius: 5,
  },

  otherBubble: {
    backgroundColor:
      "rgba(255,255,255,0.9)",

    borderBottomLeftRadius: 5,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  myText: {
    color: "#FFFFFF",
  },

  otherText: {
    color: "#27345F",
  },

  messageMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",

    marginTop: 4,
    gap: 3,
  },

  time: {
    fontSize: 9,
    color: "rgba(255,255,255,0.75)",
  },

  // =========================
  // IMAGE
  // =========================

  messageImage: {
    width: 230,
    height: 230,

    borderRadius: 14,

    marginBottom: 2,
  },

  // =========================
  // INPUT
  // =========================

  inputArea: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,

    backgroundColor:
      "rgba(255,255,255,0.72)",

    borderTopWidth: 1,
    borderTopColor:
      "rgba(120,130,170,0.12)",
  },

  inputContainer: {
    minHeight: 54,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 28,

    paddingLeft: 7,
    paddingRight: 7,

    backgroundColor:
      "rgba(255,255,255,0.94)",

    borderWidth: 1,
    borderColor:
      "rgba(120,130,170,0.18)",

    shadowColor: "#7580B5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  attachButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,

    maxHeight: 100,

    paddingHorizontal: 8,
    paddingVertical: 10,

    color: "#27345F",
    fontSize: 14,
  },

  sendButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#8A6BE8",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  sendButtonDisabled: {
    opacity: 0.55,
  },
});