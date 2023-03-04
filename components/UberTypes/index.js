import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UberTypeRow from '../UberTypeRow';
import typesData from '../../assets/data/types';
import CovidMessages from '../CovidMessages/CovidMessages';

const UberTypes = ({typeState, onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'key=AAAAG0qCOb0:APA91bEYLn604KFSZ9r4NyBIxqvGIE8diD17Mlape8cYoOQDGcioNp8aaBbvGkqhyX3VEyAhnitkdeoznHwZWVZz-VDG6Bu_equhZ2yabEcsPAo4V3hOsaQReqzjiL4210jiGDwW34FA',
  );

  var raw = JSON.stringify({
    to: 'cm4f6uXRT_GQ5UmIS1kA6m:APA91bH4fjeE3tVxeO50AsyjBWf2cnNLn-y9anAWDNEqrORFQyP43HXx-aPiZzqOVHObtNiCMdYMr0BVyB4wFt-r625L6DqLDuw5pSNAiF5zB6oQeQEzRHsbwv2eIyC9SiUZq9prHBOj',
    notification: {
      title: 'Pesanan membutuhkan driver',
      key: '{type.type === selectedType}',
      mutable_content: true,
      sound: 'default',
    },
    data: {
      key: '{type.type === selectedType}',
      dl: '<deeplink action on tap of notification>',
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const onNotif = () => {
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions).then(result =>
      console.log(JSON.stringify(result)),
    );
  };

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
