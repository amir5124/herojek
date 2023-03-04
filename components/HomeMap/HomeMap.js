import React, {useState, useEffect} from 'react';
import {Image, Dimensions, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {API, graphqlOperation} from 'aws-amplify';
import { mapStyle } from '../../global/mapStyle';
import { listCars } from '../../src/graphql/queries';

// import cars from '../../assets/data/cars';

const HomeMap = props => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(
            listCars
          )
        )

        setCars(response.data.listCars.items);
      } catch (e) {
        console.error(e);
        Alert.alert(
          'Error',
          'Yahh..belum ada petugas kami disekitarmu',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    };

    fetchCars();
  }, [])

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
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: -7.039218,
        longitude: 109.902051,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get('window').width / Dimensions.get('window').height,
      }}>
      {cars.map(car => (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image
            style={{
              width: 30,
              height: 30,
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
    </MapView>
  );
};

export default HomeMap;
