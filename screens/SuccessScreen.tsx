import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Text from '../components/CustomText';
import { selectOnboarding } from '../slices/onboardingSlice';
import useObjectSelector from '../slices/useObjectSelector';
import { getActivityLevelDescription } from './ActivityLevel'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  successMessageContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingBottom: 16
  },
  successMessage: {
    fontFamily: 'MuseoMedium',
    fontSize: 16
  },
  recapContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  goalSectionContainer: {
    paddingVertical: 8
  },
  title: {
    textTransform: 'capitalize',
    fontFamily: 'MuseoMedium',
    paddingBottom: 4
  }
});

const SuccessScreen = ({navigation}) => {
  const onboardingSummary = useObjectSelector(selectOnboarding)

  return (
    <View style={styles.container}>
      <View style={styles.successMessageContainer}>
        <Text style={styles.successMessage}>Congratulations on completing our onboarding process!</Text>
        <Text style={styles.successMessage}>You picked:</Text>
      </View>
      <View style={styles.recapContainer}>
      {
        Object
          .keys(onboardingSummary)
          .map(key => {
            switch (key) {
              case 'goals':
                return (
                  <View
                    key={key}
                    style={styles.goalSectionContainer}
                  >
                    <Text style={styles.title}>
                      {key.replace(/_/g, ' ')}
                    </Text>
                    {
                      Object
                        .keys(onboardingSummary.goals)
                        .filter(goalName => onboardingSummary.goals[goalName].checked)
                        .map(goalName => {
                          return (
                            <Text key={goalName}>
                              {'\u2022 ' + onboardingSummary.goals[goalName].title}
                            </Text>
                          )
                        })
                    }
                  </View>
                )
              case 'activity_level':
                return (
                  <View
                    key={key}
                    style={styles.goalSectionContainer}
                  >
                    <Text style={styles.title}>
                      {key.replace(/_/g, ' ')}
                    </Text>
                    <Text>{getActivityLevelDescription(onboardingSummary[key])}</Text>
                  </View>
                )
              case 'due_date':
                return (
                  <View
                    key={key}
                    style={styles.goalSectionContainer}
                  >
                    <Text style={styles.title}>
                      {key.replace(/_/g, ' ')}
                    </Text>
                    <Text>{
                      new Date(onboardingSummary[key])
                        .toLocaleDateString('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                    }
                    </Text>
                  </View>
                )
              default:
                return (
                  <View
                    key={key}
                    style={styles.goalSectionContainer}
                  >
                    <Text style={styles.title}>
                      {key.replace(/_/g, ' ')}
                    </Text>
                    <Text>{onboardingSummary[key]}</Text>
                  </View>
                )
            }
          })
      }
      </View>
    </View>
  );
};

export default SuccessScreen;
