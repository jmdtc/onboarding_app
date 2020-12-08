import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box';
import Text from '../components/CustomText';
import { baseColors } from '../constants/colors';
import { toggleGoal, selectGoals } from '../slices/onboardingSlice';
import useObjectSelector from '../slices/useObjectSelector';
import { ContinueButton } from '../components/Buttons';
import { bg_img } from '../assets/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  checkboxesOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16
  },
  headlineContainer: {
    paddingTop: 8,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  headline: {
    fontSize: 24
  },
  tagline: {
    fontSize: 16
  },
  chechboxesContainer: {
    paddingBottom: 12,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLine: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    width: '80%',
  },
  checkboxText: {
    paddingHorizontal: 16,
    fontSize: 16
  }
});

const Landing = ({navigation}) => {
  const dispatch = useDispatch()
  const goals = useObjectSelector(selectGoals)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
        <ImageBackground
          source={bg_img}
          style={styles.image}
          resizeMode='cover'
        >
        </ImageBackground >
        </View>
        <View style={styles.checkboxesOverlay}>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>What are your goals?</Text>
            <Text style={styles.tagline}>Help us tailor our program to your needs</Text>
          </View>
          <View style={styles.chechboxesContainer}>
          {
            Object
              .keys(goals)
              .map(goalName => {
                return (
                  <TouchableWithoutFeedback
                    style={styles.checkboxLine}
                    key={goalName}
                    onPress={() => dispatch(
                      toggleGoal(goals[goalName])
                    )}
                  >
                    <View style={styles.checkboxLine}>
                      <CheckBox
                        isChecked={goals[goalName].checked}
                        onClick={() => dispatch(
                          toggleGoal(goals[goalName])
                        )}
                        checkBoxColor={baseColors.checkBoxBorder}
                      />
                      <Text style={styles.checkboxText}>{goals[goalName].title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
          }
          </View>
        </View>
      </View>
      <ContinueButton
        disabled={
          Object
            .keys(goals)
            .every(goalName => !goals[goalName].checked)
        }
        navigation={navigation}
        nextScreen='Due Date'
      />
    </View>
  );
};

export default Landing;
