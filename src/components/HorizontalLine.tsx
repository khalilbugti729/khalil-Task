import {View} from 'react-native';
import React from 'react';

interface HorizontalLine {
  height: number;
  color: string;
}

const HorizontalLine = ({height, color}: HorizontalLine) => {
  return <View style={{backgroundColor: color, height: height}} />;
};

export default HorizontalLine;
