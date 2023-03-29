import React, {useState, useEffect} from 'react';
import {Image, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useRef} from 'react';

const OrderMap = ({car}) => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const map = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        map.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => setError(error),
      {enableHighAccuracy: true, maximumAge: 1000},
    );
  }, []);

  useFocusEffect(() => {
    const onBackPress = () => {
      navigation.navigate('Home');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  const getImage = type => {
    if (type === 'Perawat') {
      return require('../../assets/images/mingguan.png');
    }
    if (type === 'Caregiver') {
      return require('../../assets/images/bulanan.png');
    }
    return require('../../assets/images/caregiver.png');
  };

  return (
    <MapView
    ref={map}
    style={{width: '100%', height: Dimensions.get('window').height - 0}}
    showsUserLocation={true}
    region={region}
     >
      {car && (
        <Marker coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image
            style={{
              width: 50,
              height: 50,
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
      )}
    </MapView>
  );
};

export default OrderMap;
