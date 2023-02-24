import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UberTypeRow from '../UberTypeRow';
import typesData from '../../assets/data/types';

const UberTypes = () => {

    const confirm = () => {
        console.warn('confirmed')
    }
  return (
    <View>
      {typesData.map((type)=> (
      <UberTypeRow type={type} key={type.id} />
      ))}

      <Pressable onPress={confirm} style={{
        backgroundColor: '#000',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
        <Text style={{
            color: '#fff',
            fontWeight: 'bold',
        }}>
            Confirm Uber
        </Text>
      </Pressable>
    </View>
  )
}

export default UberTypes;

const styles = StyleSheet.create({})