import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  text?: string;
  image?: string;
  isMe: boolean;
  time: string;
};

export default function MessageBubble({
  text,
  image,
  isMe,
  time,
}: Props) {
  return (
    <View style={[styles.row, isMe ? styles.right : styles.left]}>
      <View style={[styles.bubble, isMe ? styles.me : styles.other]}>

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.photo}
          />
        )}

        {text && (
          <Text style={[styles.text, isMe && styles.white]}>
            {text}
          </Text>
        )}

        <Text style={[styles.time, isMe && styles.whiteTime]}>
          {time}
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    marginBottom: 12,
    flexDirection: "row",
  },

  right: {
    justifyContent: "flex-end",
  },

  left: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    padding: 12,
  },

  me: {
    backgroundColor: "#8A6BE8",
    borderBottomRightRadius: 4,
  },

  other: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomLeftRadius: 4,
  },

  text: {
    fontSize: 15,
    color: "#27345F",
    lineHeight: 21,
  },

  white: {
    color: "#fff",
  },

  photo: {
    width: 190,
    height: 140,
    borderRadius: 12,
    marginBottom: 6,
  },

  time: {
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 10,
    color: "#8A8FA8",
  },

  whiteTime: {
    color: "rgba(255,255,255,0.75)",
  },
});