import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CUSTOM_IMAGES} from '../util/CUSTOM_IMAGES';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

interface MoreButtonProps {
  onPress: () => void;
}

const MoreButton = ({onPress}: MoreButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.moreImage} source={CUSTOM_IMAGES.MOREIMAGE} />
    </TouchableOpacity>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  moreImage: {
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(5),
    resizeMode: 'contain',
  },
});
