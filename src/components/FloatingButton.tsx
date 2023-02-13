import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CUSTOM_IMAGES} from '../util/CUSTOM_IMAGES';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton = ({onPress}: FloatingButtonProps) => {
  const floatingButton = () => onPress();
  return (
    <TouchableOpacity onPress={floatingButton} style={styles.floatingButton}>
      <Image style={styles.moreImage} source={CUSTOM_IMAGES.PLUSIMAGE} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: CUSTOM_THEME.PRIMARY_COLOR,
    borderRadius: 100,
  },
  moreImage: {
    height: heightPercentageToDP(7),
    width: widthPercentageToDP(7),
    resizeMode: 'contain',
  },
});
