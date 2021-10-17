import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
function SavetoHistory({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="content-save-all-outline"
            size={25}
            color="white"
          />
        </View>
        <AppText style={styles.text}>Save to History</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
    borderRadius: 15,
    width: 200,
    height: 50,
    marginVertical: 20,
    alignSelf: "center",
  },
  icon: {
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
export default SavetoHistory;
