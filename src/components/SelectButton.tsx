import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';

interface SelectButtonProps {
  onPress: () => void;
  text: string;
}

const SelectButton = ({onPress, text}: SelectButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;

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
