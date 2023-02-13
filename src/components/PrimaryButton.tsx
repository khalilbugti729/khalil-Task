import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';
import React from 'react';
interface PrimaryButtonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}
const PrimaryButton = ({onPress, text}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.primaryButtonContainer}>
      <Text style={styles.primaryButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  primaryButtonContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: CUSTOM_THEME.PRIMARY_COLOR,
    paddingHorizontal: heightPercentageToDP(10),
    paddingVertical: heightPercentageToDP(1.5),
  },
  primaryButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
