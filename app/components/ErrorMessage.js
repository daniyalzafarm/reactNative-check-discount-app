import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";

function ErrorMessage({ error }) {
  if (!error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}
const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: 20,
  },
});
export default ErrorMessage;
