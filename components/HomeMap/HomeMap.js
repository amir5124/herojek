import React, { useState, useEffect } from "react";
import { Image, FlatList } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {mapStyle} from '../../global/mapStyle'
// import {API, graphqlOperation} from 'aws-amplify';
// import { listCars } from '../../graphql/queries';

import cars from '../../assets/data/cars';

const HomeMap = (props) => {
  //const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await API.graphql(
  //         graphqlOperation(
  //           listCars
  //         )
  //       )

  //       setCars(response.data.listCars.items);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchCars();
  // }, [])

  const getImage = (type) => {
    if (type === 'LinkRide') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'LinkX') {
      return require('../../assets/images/top-Comfort.png');
    }
    if (type === 'LinkL') {
      return require('../../assets/images/top-UberXL.png');
    }
    
  };

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: -7.034105,
        longitude: 108.799492,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>

      {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{ latitude: car.latitude, longitude: car.longitude }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              transform: [{
                rotate: `${car.heading}deg`
              }]
            }}
            source={getImage(car.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;