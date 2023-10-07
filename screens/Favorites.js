import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from "../utils/store";

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const { loading, error, contacts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((contacts) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e) => {
        console.log(e);
        dispatch(fetchContactsError());
      });
  }, [dispatch]);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };

  const favorites = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "silver",
    justifyContent: "center",
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
});
