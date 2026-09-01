import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: "100%",
    borderRadius: 27,
    backgroundColor: "#8A6BE8",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#8A6BE8",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9,
    elevation: 5,
  },

  disabled: {
    opacity: 0.55,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});