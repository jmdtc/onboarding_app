import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { baseColors } from '../constants/colors';
import { arrow_back } from '../assets/index';

export function BottomButton({onPress, text, disabled}) {
  const styles = StyleSheet.create({
    view: {
      width: '100%',
    },
    container: {
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 12,
      height: 56,
      backgroundColor: !disabled ? baseColors.background : baseColors.disabledBackground,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: baseColors.buttonText
    }
  })

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        disabled={disabled}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ContinueButton({navigation, nextScreen, disabled = false}) {
  return (
    <BottomButton
      text='Continue'
      onPress={() => navigation.navigate(nextScreen)}
      disabled={disabled}
    />
  );
};

export function BackButton() {
  return (
    <View
      style={{
        paddingHorizontal: 16
      }}
    >
      <Image
        source={arrow_back}
        style={{
          width: 24,
          height:24,
        }}
      />
    </View>
  )
}
