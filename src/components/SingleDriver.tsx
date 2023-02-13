import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CUSTOM_IMAGES} from '../util/CUSTOM_IMAGES';
import MoreButton from './MoreButton';
import {DriverResponseModel} from '../model/DriverModel';

interface SingleProductFavoriteProps {
  onPress: () => void;
  driver?: any;
  moreButtonPress: () => void;
  data: DriverResponseModel;
}

const SingleDriver = ({
  onPress,
  moreButtonPress,
  data,
}: SingleProductFavoriteProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.userNameText}>{data.name}</Text>
          <MoreButton onPress={moreButtonPress} />
        </View>
        <Image style={styles.productImage} source={CUSTOM_IMAGES.CARIMAGE} />
      </View>
    </TouchableOpacity>
  );
};

export default SingleDriver;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(4),
  },
  titleContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  userNameText: {
    marginLeft: heightPercentageToDP(0.6),
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  productImage: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(43),
  },
});
