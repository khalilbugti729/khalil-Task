import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
