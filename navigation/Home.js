import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
   
    <Stack.Navigator
       screenOptions={{
        headerShown: false,
       }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='DestinationSearch' component={DestinationSearch} />
      <Stack.Screen name='SearchResults' component={SearchResults} />
    </Stack.Navigator>
  
  )
}

export default HomeNavigator;

const styles = StyleSheet.create({})