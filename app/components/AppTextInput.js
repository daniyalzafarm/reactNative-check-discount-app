import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppTextInput({ iconName, ...otherprops }) {
  return (
    <View style={[styles.container]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.text}
        keyboardType="numeric"
        {...otherprops}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: "row",
    padding: 15,
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.medium,
  },
  icon: {
    margin: 5,
    marginRight: 10,
  },
  text: {
    width: "100%",
    height: "100%",
  },
});
export default AppTextInput;
