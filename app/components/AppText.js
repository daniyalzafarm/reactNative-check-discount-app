import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function AppText({ children, style, ...otherprops }) {
  return (
    <Text style={[styles.text, style]} {...otherprops}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "black",
  },
});
export default AppText;
