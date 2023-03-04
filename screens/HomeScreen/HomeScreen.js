import React from 'react';
import {  View, Dimensions } from 'react-native';
import CovidMessages from '../../components/CovidMessages/CovidMessages';
import HomeMap from '../../components/HomeMap/HomeMap';
import HomeSearch from '../../components//HomeSearch/HomeSearch';

const HomeScreen = () => {
    return (
        <View>

            <View style={{ height: Dimensions.get('window').height - 420 }}>
                <HomeMap />
            </View>

            <CovidMessages />

            <HomeSearch />
         
        </View>
    )
}

export default HomeScreen;