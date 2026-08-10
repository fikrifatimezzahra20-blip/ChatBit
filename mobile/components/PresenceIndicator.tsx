import { StyleSheet, Text, View } from "react-native";

type Props = {
  online?: boolean;
};

export default function PresenceIndicator({
  online = true,
}: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: online ? "#58D6B2" : "#A0A6B8",
          },
        ]}
      />

      <Text style={styles.text}>
        {online ? "Online" : "Offline"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  text: {
    fontSize: 11,
    color: "#66718C",
  },
});