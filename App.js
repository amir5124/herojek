import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid, Platform} from 'react-native';
import DestinationSearch from './screens/DestinationSearch';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SearchResults from './screens/SearchResults';
import Geolocation from '@react-native-community/geolocation';
import Router from './navigation/Root'

navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {

  

  return (
    <>
       <StatusBar barStyle="dark-content" />
       {/* <HomeScreen /> */}
       {/* <DestinationSearch /> */}
       {/* <SearchResults /> */}
       <Router />
    </>
      
  );
};


export default App;
