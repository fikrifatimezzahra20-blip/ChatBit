import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenBackground from "../../../components/ScreenBackground";

type Message = {
  id: string;
  text?: string;
  image?: string;
  mine: boolean;
  time: string;
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    id: string;
    name?: string;
    avatar?: string;
    phone?: string;
  }>();

  const scrollRef = useRef<ScrollView>(null);

  const contactName = params.name || "ChatBit Support";
  const phoneNumber = params.phone || "";

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 👋 How can we help you today?",
      mine: false,
      time: "10:30",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // =========================
  // SEND TEXT MESSAGE
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
      time: getCurrentTime(),
    };

    setMessages((previous) => [...previous, newMessage]);

    setMessage("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  // =========================
  // PICK IMAGE
  // =========================

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to your photos."
        );

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        base64: false,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (!uri) {
        return;
      }

      // الصورة غير كتدخل للـpreview
      // ما كتترسلش مباشرة
      setSelectedImage(uri);
    } catch (error) {
      console.log("Image picker error:", error);

      Alert.alert(
        "Error",
        "Could not open your photo library."
      );
    }
  };

  // =========================
  // SEND IMAGE
  // =========================

  const sendImage = () => {
    if (!selectedImage) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      image: selectedImage,
      mine: true,
      time: getCurrentTime(),
    };

    setMessages((previous) => [...previous, newMessage]);

    setSelectedImage(null);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  // =========================
  // CANCEL IMAGE
  // =========================

  const cancelImage = () => {
    setSelectedImage(null);
  };

  // =========================
  // PHONE CALL
  // =========================

  const makeCall = async () => {
    if (!phoneNumber) {
      Alert.alert(
        "Call",
        "No phone number is available for this contact."
      );

      return;
    }

    const url = `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Call unavailable",
          "Your device cannot make phone calls."
        );
      }
    } catch (error) {
      console.log("Call error:", error);
    }
  };

  // =========================
  // VIDEO CALL
  // =========================

  const makeVideoCall = () => {
    Alert.alert(
      "Video call",
      "Video calling will be connected later."
    );
  };

  // =========================
  // DISMISS KEYBOARD
  // =========================

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScreenBackground type="chat">
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : 0
        }
      >
        <View style={styles.container}>

          {/* =====================================================
              HEADER
          ====================================================== */}

          <View
            style={[
              styles.header,
              {
                paddingTop: insets.top,
                height: 70 + insets.top,
              },
            ]}
          >

            {/* BACK BUTTON */}

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={27}
                color="#27345F"
              />
            </TouchableOpacity>

            {/* PROFILE + NAME */}

            <View style={styles.profileArea}>

              <View style={styles.avatar}>

                {params.avatar ? (
                  <Image
                    source={{ uri: params.avatar }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Ionicons
                    name="person"
                    size={23}
                    color="#8A6BE8"
                  />
                )}

              </View>

              <View style={styles.nameArea}>

                <Text
                  style={styles.contactName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {contactName}
                </Text>

                <View style={styles.onlineRow}>

                  <View style={styles.onlineDot} />

                  <Text style={styles.onlineText}>
                    Online
                  </Text>

                </View>

              </View>

            </View>

            {/* CALL + VIDEO */}

            <View style={styles.headerActions}>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={makeCall}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="call-outline"
                  size={22}
                  color="#7355C7"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={makeVideoCall}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="videocam-outline"
                  size={23}
                  color="#7355C7"
                />
              </TouchableOpacity>

            </View>

          </View>

          {/* =====================================================
              MESSAGES
          ====================================================== */}

          <Pressable
            style={styles.messagesArea}
            onPress={dismissKeyboard}
          >
            <ScrollView
              ref={scrollRef}
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
                      ? styles.myMessageRow
                      : styles.theirMessageRow,
                  ]}
                >

                  <View
                    style={[
                      styles.bubble,
                      item.mine
                        ? styles.myBubble
                        : styles.theirBubble,
                    ]}
                  >

                    {/* IMAGE */}

                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.messageImage}
                        resizeMode="contain"
                      />
                    )}

                    {/* TEXT */}

                    {item.text && (
                      <Text
                        style={[
                          styles.messageText,
                          item.mine
                            ? styles.myMessageText
                            : styles.theirMessageText,
                        ]}
                      >
                        {item.text}
                      </Text>
                    )}

                    {/* TIME */}

                    <Text
                      style={[
                        styles.messageTime,
                        item.mine
                          ? styles.myMessageTime
                          : styles.theirMessageTime,
                      ]}
                    >
                      {item.time}
                    </Text>

                  </View>

                </View>
              ))}

            </ScrollView>
          </Pressable>

          {/* =====================================================
              IMAGE PREVIEW
          ====================================================== */}

          {selectedImage && (
            <View style={styles.previewContainer}>

              <View style={styles.previewHeader}>

                <Text style={styles.previewTitle}>
                  Send image
                </Text>

                <TouchableOpacity
                  onPress={cancelImage}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="close-circle"
                    size={28}
                    color="#7355C7"
                  />
                </TouchableOpacity>

              </View>

              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={styles.sendImageButton}
                onPress={sendImage}
                activeOpacity={0.85}
              >

                <Ionicons
                  name="paper-plane"
                  size={18}
                  color="#FFFFFF"
                />

                <Text style={styles.sendImageText}>
                  Send image
                </Text>

              </TouchableOpacity>

            </View>
          )}

          {/* =====================================================
              MESSAGE INPUT
          ====================================================== */}

          {!selectedImage && (
            <View style={styles.inputArea}>

              {/* IMAGE BUTTON */}

              <TouchableOpacity
                style={styles.attachButton}
                onPress={pickImage}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="image-outline"
                  size={24}
                  color="#7355C7"
                />
              </TouchableOpacity>

              {/* TEXT INPUT */}

              <TextInput
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                placeholderTextColor="#8992AA"
                multiline
                maxLength={1000}
                returnKeyType="default"
                blurOnSubmit={false}
              />

              {/* SEND BUTTON */}

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !message.trim() &&
                    styles.sendButtonDisabled,
                ]}
                onPress={sendMessage}
                activeOpacity={0.8}
                disabled={!message.trim()}
              >
                <Ionicons
                  name="paper-plane"
                  size={19}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

// ============================================================
// TIME
// ============================================================

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  keyboard: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,

    backgroundColor: "rgba(255,255,255,0.92)",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(120,130,170,0.15)",

    shadowColor: "#5F6B99",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  headerButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.80)",

    flexShrink: 0,
  },

  profileArea: {
    flex: 1,

    minWidth: 0,

    flexDirection: "row",
    alignItems: "center",

    marginLeft: 7,
    marginRight: 6,
  },

  avatar: {
    width: 45,
    height: 45,

    borderRadius: 23,

    backgroundColor: "rgba(255,255,255,0.95)",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.5,
    borderColor: "rgba(138,107,232,0.25)",

    overflow: "hidden",

    flexShrink: 0,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  nameArea: {
    flex: 1,

    minWidth: 0,

    marginLeft: 10,
  },

  contactName: {
    fontSize: 16,
    fontWeight: "700",

    color: "#27345F",

    maxWidth: "100%",
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 3,
  },

  onlineDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#5CCFA7",

    marginRight: 5,
  },

  onlineText: {
    fontSize: 11,

    color: "#5C9D83",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",

    flexShrink: 0,

    gap: 2,
  },

  actionButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.80)",
  },

  // ==========================================================
  // MESSAGES
  // ==========================================================

  messagesArea: {
    flex: 1,
  },

  messages: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },

  messageRow: {
    width: "100%",

    marginBottom: 12,

    flexDirection: "row",
  },

  myMessageRow: {
    justifyContent: "flex-end",
  },

  theirMessageRow: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "78%",

    paddingHorizontal: 15,
    paddingTop: 11,
    paddingBottom: 7,

    borderRadius: 19,
  },

  myBubble: {
    backgroundColor: "#8A6BE8",

    borderBottomRightRadius: 5,
  },

  theirBubble: {
    backgroundColor: "rgba(255,255,255,0.92)",

    borderBottomLeftRadius: 5,

    borderWidth: 1,
    borderColor: "rgba(120,130,170,0.12)",
  },

  messageText: {
    fontSize: 15,

    lineHeight: 21,
  },

  myMessageText: {
    color: "#FFFFFF",
  },

  theirMessageText: {
    color: "#27345F",
  },

  messageTime: {
    fontSize: 9,

    marginTop: 5,

    alignSelf: "flex-end",
  },

  myMessageTime: {
    color: "rgba(255,255,255,0.72)",
  },

  theirMessageTime: {
    color: "#8992AA",
  },

  // ==========================================================
  // IMAGE MESSAGE
  // ==========================================================

  messageImage: {
    width: 220,
    height: 220,

    borderRadius: 12,

    marginBottom: 4,

    backgroundColor: "rgba(255,255,255,0.2)",
  },

  // ==========================================================
  // IMAGE PREVIEW
  // ==========================================================

  previewContainer: {
    backgroundColor: "rgba(255,255,255,0.96)",

    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,

    borderTopWidth: 1,
    borderTopColor: "rgba(120,130,170,0.15)",
  },

  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 8,
  },

  previewTitle: {
    fontSize: 14,
    fontWeight: "700",

    color: "#27345F",
  },

  previewImage: {
    width: "100%",
    height: 180,

    borderRadius: 14,

    backgroundColor: "#F1F3F8",
  },

  sendImageButton: {
    height: 48,

    borderRadius: 24,

    marginTop: 10,

    backgroundColor: "#8A6BE8",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  sendImageText: {
    color: "#FFFFFF",

    fontSize: 14,
    fontWeight: "700",
  },

  // ==========================================================
  // INPUT
  // ==========================================================

  inputArea: {
    minHeight: 68,

    flexDirection: "row",
    alignItems: "flex-end",

    paddingHorizontal: 12,
    paddingVertical: 10,

    backgroundColor: "rgba(255,255,255,0.90)",

    borderTopWidth: 1,
    borderTopColor: "rgba(120,130,170,0.12)",
  },

  attachButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(138,107,232,0.10)",

    marginRight: 8,
  },

  textInput: {
    flex: 1,

    minHeight: 44,
    maxHeight: 110,

    borderRadius: 22,

    backgroundColor: "rgba(235,248,249,0.85)",

    borderWidth: 1,
    borderColor: "rgba(120,130,170,0.18)",

    paddingHorizontal: 17,
    paddingTop: Platform.OS === "ios" ? 12 : 10,
    paddingBottom: Platform.OS === "ios" ? 10 : 8,

    color: "#27345F",

    fontSize: 14,
  },

  sendButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#8A6BE8",

    marginLeft: 8,
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },
});