import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {mapStyle} from '../../global/mapStyle';
import {API, graphqlOperation} from 'aws-amplify';
import {listCars} from '../../src/graphql/queries';
import {useRef} from 'react';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCxfdljVSgNFeQKfEzNzeUJUuJVxSxntVQ';

const RouteMap = ({origin, destination}) => {
  const MARKUP_HARGA = 1000;

  const [cars, setCars] = useState([]);
  const [estDuration, setEstDuration] = useState(0);
  const [estDistance, setEstDistance] = useState(0);
  const [harga, setHarga] = useState(0);
  const mapRef = useRef(null);

  global.calculatedDistance = estDistance;
  global.calculatedDuration = estDuration;
  global.calculatedPrice = harga;

  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.graphql(graphqlOperation(listCars));
        setCars(res.data.listCars.items);
      } catch (e) {
        console.log('ERRORRRR!!!', e);
      }
    };
    fetchCars();
  }, []);

  const getImage = type => {
    if (type === 'LinkRide') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'LinkX') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  };

  useEffect(() => {
    if (!originLoc || !destinationLoc) return;
    mapRef.current.fitToCoordinates([originLoc, destinationLoc], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [originLoc, destinationLoc]);

  const onReady = async result => {
    setEstDuration(result.duration);
    setEstDistance(result.distance);
  };

  const formatRupiah = money => {
    setHarga(estDuration * MARKUP_HARGA);
  };

  useEffect(() => {
    formatRupiah();
  });

  return (
    <View>
      <MapView
        ref={mapRef}
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
        }}>
        {cars.map(car => (
          <Marker
            key={car.id}
            coordinate={{latitude: car.latitude, longitude: car.longitude}}>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
                transform: [
                  {
                    rotate: `${car.heading}deg`,
                  },
                ],
              }}
              source={getImage(car.type)}
            />
          </Marker>
        ))}
        <MapViewDirections
          origin={originLoc}
          destination={destinationLoc}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={onReady}
          strokeWidth={5}
          strokeColor="#21bcb0"
        />

        <Marker coordinate={originLoc}>
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.markerOrigin2}
            resizeMode="cover"
          />
        </Marker>

        <Marker coordinate={destinationLoc}>
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.markerDestination}
            resizeMode="cover"
          />
        </Marker>
      </MapView>
      <Pressable
        onPress={() => console.warn('hey')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: '#fff', fontSize: 16}}>
            {estDistance.toFixed(1)} km
          </Text>
        </Text>
      </Pressable>
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
    borderRadius: 10,
  },
  balanceButton: {
    position: 'absolute',
    backgroundColor: '#000',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 15,
    left: 10,
  },
  balanceText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
