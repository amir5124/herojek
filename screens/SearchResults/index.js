import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UberTypes from '../../components/UberTypes';
import RouteMap from '../../components/RouteMap';

import {useRoute} from '@react-navigation/native'


const SearchResults = () => {

  const route = useRoute();

  console.log(route.params);
  const {originPlace, destinationPlace} = route.params
  
    return (
      <View style={{display: 'flex', justifyContent: 'space-between',}}>

    <View style={{height: Dimensions.get('window').height - 420 }}>
      <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <View style={{height: 400,}}>
      <UberTypes />
      </View>

    </View>
    );
  };

  export default SearchResults;


const styles = StyleSheet.create({})