import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native";
import colors from "../utils/colors";
import { View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";

const ContactListItem = ({ name, avatar, phone, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.grey}
      style={styles.container}
    >
      <View style={styles.contactInfo}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  details: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4,
  },
});
