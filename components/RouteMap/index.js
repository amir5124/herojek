import React, {useState} from "react";
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { mapStyle } from '../../global/mapStyle'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCxfdljVSgNFeQKfEzNzeUJUuJVxSxntVQ';

const RouteMap = ({ }) => {

   
    const origin = {
        latitude: -7.034105,
        longitude: 109.793492,
    };

    const destination = {
        latitude: -7.034205,
        longitude: 108.799492,
    };

    

    return (
        <View>
            <MapView
                style={{
                    width: '100%',
                    height: '100%',
                }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: -7.034805,
                    longitude: 109.799492,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0421,
                }}
                >

               
                 <MapViewDirections
                 origin={origin}
                 destination={destination}
                 apikey={GOOGLE_MAPS_APIKEY}
                 strokeWidth={5}
                 strokeColor="black"
             />
           

                <Marker coordinate={origin} >
                    <Image
                        source={require('../../assets/images/location.png')}
                        style={styles.markerOrigin2}
                        resizeMode="cover"
                    />
                </Marker>

                <Marker coordinate={destination} >
                    <Image
                        source={require('../../assets/images/location.png')}
                        style={styles.markerDestination}
                        resizeMode="cover"
                    />
                </Marker>
            </MapView>
            </View>
    );
};

export default RouteMap;

const styles = StyleSheet.create({
    markerDestination: {
        width: 16,
        height: 16,

    },
    markerOrigin2: {
        width: 20,
        height: 20,
        borderRadius: 10
    }
});