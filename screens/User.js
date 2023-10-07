import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";
import { useSelector } from "react-redux";
import DetailListItem from "../components/DetailListItem";
import { ActivityIndicator } from "react-native-paper";

const User = () => {
  const [user, setUser] = useState([]);
  const { loading, error } = useSelector((state) => state);

  useEffect(() => {
    fetchUserContact()
      .then((users) => {
        setUser(users);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
});
