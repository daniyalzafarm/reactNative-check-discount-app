import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
function IconButton({ iconName, size = 40, color = "black", onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        </View>
        {title && <AppText>{title}</AppText>}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 10,
  },
});
export default IconButton;
