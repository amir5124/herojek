import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import UberTypeRow from '../UberTypeRow';
import typesData from '../../assets/data/types';
import CovidMessages from '../CovidMessages/CovidMessages';
import FIREBASE from '../../config/FIREBASE';

const UberTypes = ({typeState, onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;
  const [token, setToken] = useState();

  async function sendPushNotification(title, message) {
    const FIREBASE_API_KEY =
      'AAAADkcvkN0:APA91bEHNRZwVtqInZ6cAZ60ACb2MKwOv3XNHMztKtWIUDErteabFvwlVoOSZOcaO0o0NKAOZf6hV84wI8YZgCaa400TM_YJny58QHLHVTc9dB905W1J5afdfoBIS6V2i9iIE5V-rNvR';
    // const token = await messaging().getToken();
    const messageBody = {
      to: token,
      notification: {
        title: selectedType,
        body: 'Ada Orderan Masuk',
        priority: 'high',
        sound: 'default',
        show_in_foreground: true,
      },
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=' + FIREBASE_API_KEY,
      },
      body: JSON.stringify(messageBody),
    })
      .then(response => {
        console.log('Push notification response: ', response);
      })
      .catch(error => {
        console.log('Error sending push notification: ', error);
      });
  }

  // Mendapatkan referensi database Firebase
  const database = FIREBASE.database();

  // Mendapatkan token FCM dari database Firebase
  const fcmTokenRef = database.ref('tokens');
  fcmTokenRef.once('value', snapshot => {
    const fcmToken = snapshot.val();
    setToken(fcmToken);
    // Gunakan token FCM untuk mengirim notifikasi
  });

  return (
    <View style={{backgroundColor: '#fff'}}>
      {typesData.map(type => (
        <UberTypeRow
          type={type}
          key={type.id}
          isSelected={type.type === selectedType}
          onPress={() => setSelectedType(type.type)}
        />
      ))}
      {/* <View style={{padding: 0, margin: 0}}> 
        <CovidMessages />
      </View> */}

      <Pressable
        onPress={() => {
          onSubmit();
          sendPushNotification();
        }}
        style={{
          backgroundColor: '#21cbc0',
          padding: 18,
          margin: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Konfirmasi Order
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;

const styles = StyleSheet.create({});
