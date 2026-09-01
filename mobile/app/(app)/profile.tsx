import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {Alert,Image,Modal,Platform,Pressable,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from "react-native";

import ScreenBackground from "../../components/ScreenBackground";

const DEFAULT_NAME = "Fatima Zahra";

export default function Profile() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(DEFAULT_NAME);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [showImageOptions, setShowImageOptions] = useState(false);

  // --------------------------------
  // Load saved profile
  // --------------------------------

  useEffect(() => {
    // حاليا كنخليو البيانات local.
    // منين نربطو backend، غادي ناخدو الاسم والصورة من user.
  }, []);

  // --------------------------------
  // Pick image from gallery
  // --------------------------------

  const pickFromGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }

      setShowImageOptions(false);
    } catch (error) {
      console.log("Gallery error:", error);

      Alert.alert(
        "Error",
        "Could not open your gallery."
      );
    }
  };

  // --------------------------------
  // Take photo with camera
  // --------------------------------

  const takePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow camera access."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }

      setShowImageOptions(false);
    } catch (error) {
      console.log("Camera error:", error);

      Alert.alert(
        "Error",
        "Could not open your camera."
      );
    }
  };

  // --------------------------------
  // Change name
  // --------------------------------

  const startEditingName = () => {
    setTempName(name);
    setEditingName(true);
  };

  const saveName = () => {
    const cleanName = tempName.trim();

    if (!cleanName) {
      Alert.alert(
        "Invalid name",
        "Please enter your name."
      );
      return;
    }

    setName(cleanName);
    setEditingName(false);
  };

  // --------------------------------
  // Logout
  // --------------------------------

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: () => {
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  return (
    <ScreenBackground type="profile">
      <View style={styles.container}>

        {/* =========================
            HEADER
        ========================== */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-back"
              size={25}
              color="#27345F"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            My Profile
          </Text>

          <View style={styles.headerSpace} />

        </View>


        {/* =========================
            CONTENT
        ========================== */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* =========================
              PROFILE CARD
          ========================== */}

          <View style={styles.profileCard}>

            {/* Profile image */}

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => setShowImageOptions(true)}
              activeOpacity={0.85}
            >

              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../../assets/images/backgrounds/profile.png")
                }
                style={styles.avatar}
              />

              {/* Online */}

              <View style={styles.onlineDot} />

              {/* Camera button */}

              <View style={styles.cameraButton}>
                <Ionicons
                  name="camera"
                  size={18}
                  color="#FFFFFF"
                />
              </View>

            </TouchableOpacity>


            {/* Name */}

            {editingName ? (
              <View style={styles.nameEditContainer}>

                <TextInput
                  value={tempName}
                  onChangeText={setTempName}
                  autoFocus
                  placeholder="Your name"
                  placeholderTextColor="#8A8FA8"
                  style={styles.nameInput}
                  maxLength={30}
                />

                <TouchableOpacity
                  style={styles.saveNameButton}
                  onPress={saveName}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="checkmark"
                    size={21}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

              </View>
            ) : (
              <TouchableOpacity
                style={styles.nameRow}
                onPress={startEditingName}
                activeOpacity={0.7}
              >
                <Text style={styles.name}>
                  {name}
                </Text>

                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color="#8A6BE8"
                />
              </TouchableOpacity>
            )}

            <View style={styles.statusRow}>

              <View style={styles.smallOnlineDot} />

              <Text style={styles.statusText}>
                Online
              </Text>

            </View>

            <Text style={styles.profileDescription}>
              Connect, chat and share 🌊
            </Text>

          </View>


          {/* =========================
              MENU
          ========================== */}

          <View style={styles.menuCard}>

            {/* Starred */}

            <ProfileItem
              icon="star-outline"
              title="Starred Messages"
              onPress={() => {
                Alert.alert(
                  "Coming soon",
                  "Starred messages will be available soon."
                );
              }}
            />

            {/* Help */}

            <ProfileItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => {
                Alert.alert(
                  "Help & Support",
                  "How can we help you?"
                );
              }}
              last
            />

          </View>


          {/* =========================
              LOGOUT
          ========================== */}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >

            <Ionicons
              name="log-out-outline"
              size={21}
              color="#E94B8B"
            />

            <Text style={styles.logoutText}>
              Log Out
            </Text>

          </TouchableOpacity>


          <Text style={styles.version}>
            ChatBit • Connect. Chat. Share.
          </Text>

        </ScrollView>


        {/* =========================
            IMAGE OPTIONS MODAL
        ========================== */}

        <Modal
          visible={showImageOptions}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setShowImageOptions(false)
          }
        >

          <Pressable
            style={styles.modalOverlay}
            onPress={() =>
              setShowImageOptions(false)
            }
          >

            <Pressable
              style={styles.imageOptionsCard}
              onPress={(event) =>
                event.stopPropagation()
              }
            >

              <View style={styles.modalHandle} />

              <Text style={styles.modalTitle}>
                Change Profile Photo
              </Text>

              <Text style={styles.modalSubtitle}>
                Choose how you want to add your photo
              </Text>


              {/* Gallery */}

              <TouchableOpacity
                style={styles.optionButton}
                onPress={pickFromGallery}
                activeOpacity={0.8}
              >

                <View style={styles.optionIcon}>
                  <Ionicons
                    name="images-outline"
                    size={24}
                    color="#7C8CF8"
                  />
                </View>

                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>
                    Choose from Gallery
                  </Text>

                  <Text style={styles.optionSubtitle}>
                    Select a photo from your phone
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                />

              </TouchableOpacity>


              {/* Camera */}

              <TouchableOpacity
                style={styles.optionButton}
                onPress={takePhoto}
                activeOpacity={0.8}
              >

                <View style={styles.optionIcon}>
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color="#8A6BE8"
                  />
                </View>

                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>
                    Take a Photo
                  </Text>

                  <Text style={styles.optionSubtitle}>
                    Open your camera
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                />

              </TouchableOpacity>


              {/* Cancel */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setShowImageOptions(false)
                }
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

            </Pressable>

          </Pressable>

        </Modal>

      </View>
    </ScreenBackground>
  );
}


/* =========================================
   PROFILE ITEM COMPONENT
========================================= */

type ProfileItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  last?: boolean;
};

function ProfileItem({
  icon,
  title,
  onPress,
  last = false,
}: ProfileItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        last && styles.lastMenuItem,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >

      <View style={styles.menuIcon}>
        <Ionicons
          name={icon}
          size={21}
          color="#7C5CE3"
        />
      </View>

      <Text style={styles.menuText}>
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={19}
        color="#A0A5B8"
      />

    </TouchableOpacity>
  );
}


/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  /* Header */

  header: {
    height: 75,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.82)",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#7C8CF8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#27345F",
  },

  headerSpace: {
    width: 43,
  },

  /* Scroll */

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  /* Profile */

  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 28,
    paddingVertical: 27,
    paddingHorizontal: 20,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "rgba(150,160,210,0.18)",

    shadowColor: "#6974A8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 4,
  },

  avatarContainer: {
    width: 118,
    height: 118,
    borderRadius: 59,
    marginBottom: 14,
    position: "relative",
  },

  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  onlineDot: {
    position: "absolute",
    right: 5,
    bottom: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#58D3A8",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -2,

    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#8A6BE8",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 3,
    borderColor: "#FFFFFF",

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#27345F",
  },

  nameEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 8,
  },

  nameInput: {
    width: 190,
    height: 45,
    borderRadius: 14,

    backgroundColor: "rgba(235,248,249,0.8)",

    borderWidth: 1,
    borderColor: "rgba(124,140,248,0.35)",

    paddingHorizontal: 14,

    color: "#27345F",
    fontSize: 17,
    textAlign: "center",
  },

  saveNameButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#8A6BE8",
    alignItems: "center",
    justifyContent: "center",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  smallOnlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#58D3A8",
    marginRight: 6,
  },

  statusText: {
    color: "#57A98E",
    fontSize: 13,
    fontWeight: "600",
  },

  profileDescription: {
    marginTop: 10,
    color: "#737B94",
    fontSize: 13,
  },

  /* Menu */

  menuCard: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 24,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "rgba(150,160,210,0.18)",

    shadowColor: "#6974A8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  menuItem: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(120,130,170,0.12)",
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,

    backgroundColor: "rgba(138,107,232,0.10)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  menuText: {
    flex: 1,
    color: "#354064",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Logout */

  logoutButton: {
    height: 57,
    marginTop: 18,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.76)",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,

    borderWidth: 1,
    borderColor: "rgba(233,75,139,0.15)",
  },

  logoutText: {
    color: "#E94B8B",
    fontSize: 15,
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    color: "#8D95AA",
    fontSize: 11,
    marginTop: 20,
  },

  /* Modal */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(35,40,70,0.38)",
    justifyContent: "flex-end",
  },

  imageOptionsCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 22,
  },

  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D6D9E4",
    alignSelf: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#27345F",
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#7A829A",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  optionButton: {
    minHeight: 70,
    borderRadius: 18,

    backgroundColor: "#F7F8FC",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,
    marginBottom: 10,
  },

  optionIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    color: "#303A5D",
    fontSize: 14,
    fontWeight: "700",
  },

  optionSubtitle: {
    color: "#8A91A7",
    fontSize: 11,
    marginTop: 4,
  },

  cancelButton: {
    height: 52,
    borderRadius: 18,

    backgroundColor: "#EEEAFB",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 5,
  },

  cancelText: {
    color: "#7559C9",
    fontSize: 14,
    fontWeight: "700",
  },

});