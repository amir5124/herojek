import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DestinationSearch"
        component={DestinationSearch}
        options={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#21cbc0',
          },
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderPage"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
