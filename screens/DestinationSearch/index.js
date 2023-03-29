import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import PlaceRow from './PlaceRow'
import {useNavigation} from '@react-navigation/native'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCxfdljVSgNFeQKfEzNzeUJUuJVxSxntVQ';

const homePlace = {
    description: 'Rumah',
    geometry: { location: { lat:  6.1750, lng: 106.8283 } },
  };
  const workPlace = {
    description: 'Kantor',
    geometry: { location: { lat: 6.1740, lng: 106.8263 } },
  };

const DestinationSearch = () => {

    const [originPlace, setOriginPlace] = useState(null);
    const [destinationPlace, setDestinationPlace] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (originPlace && destinationPlace) {
            navigation.navigate('SearchResults',{
                originPlace,
                destinationPlace,
            })
        }
    }, [originPlace, destinationPlace]);

    return (
        <SafeAreaView>
            <View keyboardShouldPersistTaps="handled" style={styles.container}>
                
                <GooglePlacesAutocomplete
                    placeholder='Lokasi Sekarang'
                    onPress={(data, details = null) => {
                        setOriginPlace({ data, details })
                    }}
                    enablePoweredByContainer={true}
                    suppressDefaultStyles
                    currentLocation={true}
                    currentLocationLabel='Lokasi saat ini'
                    styles={{
                        textInput: styles.textInput,
                        container: styles.autoCompleteContainer,
                        listView: styles.listView,
                        separator: styles.separator,
                    }}
                    fetchDetails
                    query={{
                        key: 'AIzaSyCxfdljVSgNFeQKfEzNzeUJUuJVxSxntVQ',
                        language: 'idn',
                        components: 'country:idn',
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                    renderDescription={(data) => data.description || data.vicinity}
                   
                />

                <GooglePlacesAutocomplete
                    placeholder='Alamat Rumah'
                    onPress={(data, details = null) => {
                        setDestinationPlace({ data, details })
                    }}
                    enablePoweredByContainer={true}
                    suppressDefaultStyles
                    styles={{
                        textInput: styles.textInput,
                        container: {
                            ...styles.autoCompleteContainer,
                            top: 55,
                        },
                        separator: styles.separator,
                    }}
                    fetchDetails
                    query={{
                        key: 'AIzaSyCxfdljVSgNFeQKfEzNzeUJUuJVxSxntVQ',
                        language: 'idn',
                        components: 'country:idn',
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                />

                {/* circle*/}
                <View style={styles.circle} />

                {/* line*/}
                <View style={styles.line} />

                {/* square*/}
                <View style={styles.square} />
            </View>
        </SafeAreaView>
    )
}

export default DestinationSearch

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
    },
    textInput: {
        backgroundColor: '#eee',
        marginVertical: 5,
        padding: 10,
        marginLeft: 20,
    },
    separator: {
        backgroundColor: '#efefef',
        height: 1,
    },
    listView: {
        position: 'absolute',
        top: 105,
    },
    autoCompleteContainer: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
    },
    square: {
        width: 5,
        height: 5,
        backgroundColor: '#000',
        position: 'absolute',
        top: 80,
        left: 15,
    },
    locationText: {

    },
    circle: {
        width: 5,
        height: 5,
        backgroundColor: '#000',
        position: 'absolute',
        top: 20,
        left: 15,
        borderRadius: 50,
    },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#c4c4c4',
        position: 'absolute',
        top: 28,
        left: 17,
    }
})