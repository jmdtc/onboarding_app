import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import cacheAssets from './helpers/cacheAssets';
import { StackParamList } from './types';
import store from './store/store'
import { BackButton } from './components/Buttons'
import Landing from './screens/Landing';
import DueDate from './screens/DueDate';
import ActivityLevel from './screens/ActivityLevel';
import SuccessScreen from './screens/SuccessScreen';

export default function App() {
  const [assetsLoading, setAssetsLoading] = useState(true)
  if (assetsLoading) {
    return (
      <AppLoading
        startAsync={cacheAssets}
        onFinish={() => setAssetsLoading(false)}
        onError={console.error}
      />
    )
  }

  const Stack = createStackNavigator<StackParamList>();
  const stackScreenOptions = {
    title: '',
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerBackImage: BackButton 
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={stackScreenOptions}
            name='Landing'
            component={Landing}
          />
          <Stack.Screen
            options={stackScreenOptions}
            name='Due Date'
            component={DueDate}
          />
          <Stack.Screen
            options={stackScreenOptions}
            name='Activity Level'
            component={ActivityLevel}
          />
          <Stack.Screen
            options={stackScreenOptions}
            name='Success Screen'
            component={SuccessScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
