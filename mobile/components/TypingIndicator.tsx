import { StyleSheet, Text, View } from "react-native";

export default function TypingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>
          Support is typing...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },

  bubble: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 18,
  },

  text: {
    color: "#8A6BE8",
    fontSize: 13,
    fontStyle: "italic",
  },
});