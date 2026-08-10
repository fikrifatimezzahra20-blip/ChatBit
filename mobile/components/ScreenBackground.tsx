import { ImageBackground, StyleSheet, View } from "react-native";

const backgrounds = {
  auth: require("../assets/images/backgrounds/auth.jpg"),
  welcome: require("../assets/images/backgrounds/welcome.jpg"),
  chat: require("../assets/images/backgrounds/chat.jpg"),
  profile: require("../assets/images/backgrounds/profile.png"),
};

type BackgroundType = keyof typeof backgrounds;

type Props = {
  type?: BackgroundType;
  children: React.ReactNode;
};

export default function ScreenBackground({
  type = "welcome",
  children,
}: Props) {
  return (
    <ImageBackground
      source={backgrounds[type]}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
  },
});