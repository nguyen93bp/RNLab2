import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { fetchContacts } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from "../utils/store";

const Contacts = ({ navigation }) => {
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
  }, []);

  const contactsSorted = contacts
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && contacts && contacts.length > 0 && (
        <FlatList
          data={contactsSorted}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderContact}
        />
      )}
      {!loading && !error && (!contacts || contacts.length === 0) && (
        <Text>No contacts found.</Text>
      )}
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "silver",
    justifyContent: "center",
    flex: 9,
  },
});
