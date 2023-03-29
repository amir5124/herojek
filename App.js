import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid, Platform} from 'react-native';
import Router from './navigation/Root'
import {withAuthenticator} from 'aws-amplify-react-native';
import { requestUserPermission, NotificationListener } from './src/utils/pushnotification_helper';
navigator.geolocation = require('@react-native-community/geolocation');
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({Analytics: {disabled: true}});

Amplify.configure(awsconfig);

const App = () => {

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Perawatqu",
          message:
            "Mitra Perawat Qu ingin mengakses lokasi anda " +
            "so you can take awesome rides.",
          buttonNeutral: "Beritahu Nanti",
          buttonNegative: "Batal",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])

  useEffect(() => {
    NotificationListener();
  }, []);

  return (
    <>
       <StatusBar barStyle="light-content" backgroundColor={'#21cbc0'} />
       {/* <HomeScreen /> */}
       {/* <DestinationSearch /> */}
       {/* <SearchResults /> */}
       <Router />
    </>
      
  );
};


export default withAuthenticator(App);
