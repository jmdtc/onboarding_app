import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Text from '../components/CustomText';
import { setDueDate, selectDueDate } from '../slices/onboardingSlice';
import { ContinueButton } from '../components/Buttons';
import { bg_img } from '../assets/index';

const getDateText = function(date: string): string {
  const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  if (Platform.OS === 'android') {
    return 'Your estimated due date is ' + new Date(date).toLocaleDateString('en-GB', dateOptions)
  }
  return 'Select your estimated due date'
}

export default function DueDate({navigation}) {
  const date = useSelector(selectDueDate)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={bg_img}
          style={styles.image}
          resizeMode='cover'
        >
        </ ImageBackground>
      </View>
      <View style={styles.datePickerOverlay}>
        <View style={styles.datePickerLabelContainer}>
          <Text style={styles.datePickerLabel}>{getDateText(date)}</Text>
        </View>
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            mode='date'
            is24Hour={true}
            display='spinner'
            value={new Date(date)}
            onChange={(event, date) => {
              dispatch(setDueDate(date.getTime()))}}
          />
        </View>
      </View>
      <ContinueButton
          navigation={navigation}
          nextScreen='Activity Level'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  datePickerOverlay: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  datePickerContainer: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingBottom: 52,
  },
  datePickerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomColor: '#CECECE',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  datePickerLabel: {
    fontSize: 16,
    fontFamily: 'MuseoMedium'
  },
});
