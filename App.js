import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./app/components/Screen";

import { ListItem } from "react-native-elements";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppTextInput from "./app/components/AppTextInput";
import AppText from "./app/components/AppText";
import SavetoHistory from "./app/components/SavetoHistory";
import IconButton from "./app/components/IconButton";
import ErrorMessage from "./app/components/ErrorMessage";
import colors from "./app/config/colors";

function HomeScreen({ route, navigation }) {
  const [originalPrice, setOriginalPrice] = useState(0);
  const [priceError, setPriceError] = useState("");

  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const [saving, setSaving] = useState(0);

  const [finalPrice, setFinalPrice] = useState(0);

  const [history, setHistory] = useState([]);

  const [saveButton, setSaveButton] = useState(true);

  //On Change of Price Text
  const changePrice = (text) => {
    setSaveButton(true);
    if (text > 0 && text <= 1000000) {
      setOriginalPrice(text);

      const save = text - (text - text * (discount / 100));
      setSaving(save.toFixed(2));

      const final = text - save;
      setFinalPrice(final.toFixed(2));

      setPriceError("");
    } else {
      setOriginalPrice(0);
      setSaving(0);
      setFinalPrice(0);
      setPriceError("Price must be between 1 - 1 Million");
    }
  };

  //On Change of Discount Text
  const changeDiscount = (text) => {
    setSaveButton(true);
    if (text > 0 && text < 100) {
      setDiscount(text);

      const final = originalPrice - originalPrice * (text / 100);
      setFinalPrice(final.toFixed(2));

      const save = originalPrice - final;
      setSaving(save.toFixed(2));
      setDiscountError("");
    } else {
      setDiscount(0);
      setFinalPrice(0);
      setSaving(0);
      setDiscountError("Discount must be between 0-100");
    }
  };

  //Save Item to History
  const saveItem = (orig, disc, fin) => {
    var item = {};
    item["id"] = Math.floor(Math.random() * 10000) + 1;
    item["original"] = orig;
    item["discountPercentage"] = disc;
    item["final"] = fin;
    const array = history;
    array.push(item);
    setHistory(array);
  };
  const handleSave = () => {
    if (saveButton) {
      if (originalPrice == 0) {
        Alert.alert("Save", "Please Enter Price !", [{ text: "OK!" }]);
      } else if (discount == 0) {
        Alert.alert("Save", "Please Enter Discount % !", [{ text: "OK!" }]);
      } else {
        setHistory(() => saveItem(originalPrice, discount, finalPrice));
        setSaveButton(false);
        Alert.alert("Saved !", "Item Saved Successfully !", [{ text: "OK!" }]);
      }
    } else {
      Alert.alert("Already Exists !", "Item Already Exists !", [
        { text: "OK!" },
      ]);
    }
  };

  //Sending Array of History to Next Screen
  const handleSend = () => {
    navigation.navigate("HistoryScreen", { item: history });
  };

  //History Button in HomeScreen Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleSend()}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="history" size={40} color="white" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //HomeScreen Layout
  return (
    <Screen>
      <View>
        <View>
          <AppTextInput
            iconName="currency-usd-circle-outline"
            placeholder="Enter Price"
            onChangeText={(price) => changePrice(price)}
          />
          <ErrorMessage error={priceError} />
          <AppTextInput
            iconName="percent-outline"
            placeholder="Enter Discount Percentage"
            onChangeText={(discount) => changeDiscount(discount)}
          />
          <ErrorMessage error={discountError} />
        </View>
        <View style={styles.finalPrice}>
          <AppText style={{ fontSize: 25 }}>Final Price : </AppText>
          <AppText style={{ fontSize: 25 }}>{finalPrice}</AppText>
        </View>
        <View style={styles.savedPrice}>
          <AppText>You Save : </AppText>
          <AppText style={{ color: "green" }}>{saving}</AppText>
        </View>
        <SavetoHistory onPress={() => handleSave()} />
      </View>
    </Screen>
  );
}

function HistoryScreen({ route, navigation }) {
  //Recieving History List
  const recievedHhistory = route.params?.item;
  const [gainedHistory, setGainedHistory] = useState(recievedHhistory);

  //Delete an Item from History List
  const handleDelete = (deleteItem) => {
    const newHistory = gainedHistory.filter((h) => h.id !== deleteItem.id);
    setGainedHistory(newHistory);
  };

  //Clear History Screen
  const handleClearall = () => {
    setGainedHistory([]);
  };

  //History Clear Button in History Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleClearall()}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="notification-clear-all"
              size={40}
              color="white"
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  //History Screen Layout
  return (
    <Screen>
      <FlatList
        data={gainedHistory}
        keyExtractor={(history) => history.id.toString()}
        renderItem={({ item }) => (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <View style={styles.listContainer}>
                <ListItem.Title style={styles.listTitle}>
                  {item.original}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listDiscount}>
                  -{item.discountPercentage}%
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.final}
                </ListItem.Subtitle>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={35}
                      color={colors.danger}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </Screen>
  );
}

//Navigation Schema
const Stack = createStackNavigator();
const StackNavigation = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    //Options for All Screens
    screenOptions={{
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: "Discont App",
      }}
    />
    <Stack.Screen
      name="HistoryScreen"
      component={HistoryScreen}
      options={({ route }) => ({
        title: "History",
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: { flex: 1, fontSize: 25, alignSelf: "center" },
  listSubTitle: { flex: 1, fontSize: 25, alignSelf: "center" },
  listDiscount: {
    flex: 1,
    color: "green",
    fontSize: 25,
    alignSelf: "center",
  },
  savedPrice: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 20,
  },
  finalPrice: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 20,
  },
});
