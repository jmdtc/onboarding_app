import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Text from '../components/CustomText';
import Slider from '@react-native-community/slider';
import { ContinueButton } from '../components/Buttons';
import { setActivityLevel, selectActivityLevel } from '../slices/onboardingSlice';
import { clouds_bg, rocket_ios, rocket_android } from '../assets/index';

export const getActivityLevelDescription = function (activityLevel: number): string {
  switch (activityLevel) {
    case 1:
      return 'I don’t exercise.'
    case 2:
      return 'I rarely exercise.'
    case 3:
      return 'I sometimes exercise.'
    case 4:
      return 'I regularly exercise.'
    case 5:
      return 'I often exercise.'
  }
}

const calculateThumbHeight = function(activityLevel: number, sliderHeight: number, nSteps: number): string {
  // First we calculate the distance to start from 0
  const stepSize = sliderHeight / (nSteps - 1)
  const stepDistance = (activityLevel * stepSize) - stepSize

  // Then we inverted the % since 5 is on top and 1 on the bottom
  const invertedPercentage = 100 - (stepDistance / sliderHeight) * 100

  //Then we weight the actual percentage according to both systems implementations
  if (Platform.OS === 'ios') {
    //In iOS by the bottom and upper part of the rocket
    const rocketWeighting = (((invertedPercentage/100)* 92) / sliderHeight) * 100
    const topWeighting = (activityLevel - 1) * 1.5
    return `${invertedPercentage - rocketWeighting + topWeighting}%`
  }
  // In android
  const androidWeighting = (invertedPercentage * 0.09) + 8
  return `${invertedPercentage - androidWeighting}%`
};

const sliderHeight = 300
const maxValue = 5

export default function ActivityLevel({navigation}) {
  const activityLevel = useSelector(selectActivityLevel)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>To get your perfect workouts, tell us your activity level!</Text>
      </View>
      <View style={styles.sliderContainer}>
        <ImageBackground
          source={clouds_bg}
          style={styles.image}
        >
          <Text style={
            [
              styles.activityLevelLabel,
              {top: calculateThumbHeight(activityLevel, sliderHeight, maxValue)
            }]
          }>
            {activityLevel}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={maxValue}
            step={1}
            value={activityLevel}
            thumbImage={
              Platform.OS === 'ios' ? // different implementation and this API gives
                rocket_ios :          // no way to change the thumb size
                rocket_android        // so we rely on different images
            }
            minimumTrackTintColor='#DEF4F2'
            maximumTrackTintColor='#9DD6D2'
            onValueChange={(val) => {
              dispatch(setActivityLevel(val))
            }}
          />
        </ImageBackground>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {getActivityLevelDescription(activityLevel)}
        </Text>
      </View>
      <ContinueButton
        navigation={navigation}
        nextScreen='Success Screen'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headlineContainer: {
    flex: 1.5,
    paddingHorizontal: 40,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontFamily: 'MuseoMedium',
    textAlign: 'center',
    lineHeight: 16
  },
  sliderContainer: {
    flex: 3,
    paddingTop: 32,
  },
  slider: {
    width: 300,
    height: '100%',
    transform: [{ rotate: '-90deg' }]
  },
  activityLevelLabel: {
    position: 'absolute',
    fontFamily: 'MuseoMedium',
    left: '49%',
    zIndex: 1000,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  descriptionText: {
    fontFamily: 'MuseoMedium',
  },
});
