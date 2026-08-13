import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

export default function Input({
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
}: InputProps) {
  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color="#8A8FA8"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8A8FA8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
    borderRadius: 15,

    backgroundColor: "rgba(229, 249, 250, 0.66)",

    borderWidth: 1,
    borderColor: "rgba(128, 145, 212, 0.44)",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 17,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 12,

    color: "#27345F",
    fontSize: 15,
  },
});