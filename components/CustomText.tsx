import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { baseColors } from '../constants/colors';

export default function(props) {
  const defaultStyle = {
    fontFamily: 'MuseoRegular',
    color: baseColors.text
  };
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return <Text {...props} style={[defaultStyle, ...incomingStyle]} />;
};
