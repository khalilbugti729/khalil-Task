import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';

interface ListItemProps {
  text?: string;
}

const ListItem = ({text}: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: CUSTOM_THEME.GREY_COLOR,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
  },
});
