import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {ReactNode} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CUSTOM_IMAGES} from '../util/CUSTOM_IMAGES';

interface SorryModalProps {
  isVisible: boolean;
  closeButtonPressed: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
}

const SelectModal = ({
  closeButtonPressed,
  isVisible,
  children,
}: SorryModalProps) => {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeButtonPressed}>
          <View style={styles.closeImageContainer}>
            <Image
              style={styles.closeImage}
              source={CUSTOM_IMAGES.CLOSEIMAGE}
            />
          </View>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

export default SelectModal;

const styles = StyleSheet.create({
  container: {
    paddingtop: 50,
    paddingBottom: heightPercentageToDP(5),
    backgroundColor: 'white',
    borderRadius: 7,
    height: '30%',
    marginTop: 60,
  },
  closeImage: {
    width: widthPercentageToDP(7),
    height: heightPercentageToDP(4),
    resizeMode: 'contain',
  },
  closeImageContainer: {
    marginTop: heightPercentageToDP(1),
    paddingHorizontal: heightPercentageToDP(1),
  },
});
