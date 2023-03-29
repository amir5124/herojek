import {Image, Dimensions, ToastAndroid, Alert, Pressable, View, SafeAreaView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapStyle} from '../../global/mapStyle';
import {API, graphqlOperation} from 'aws-amplify';
import {listCars} from '../../src/graphql/queries';
import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import cars from '../../assets/data/cars';

export default class HomeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      initialRegion: {
        latitude: -6.2,
        longitude: 106.816666,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get('window').width / Dimensions.get('window').height,
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleUserLocation();
      this.fetchCars();
    }, 5000);
  }

  handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.map.animateToRegion({
          ...this.state.initialRegion,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        this.setState({
          ...this.state.initialRegion,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      err => {
        console.log(err);
        alert('Harap hidupkan GPS lokasi anda');
      },
    );
  };

  onChangeValue = initialRegion => {
    ToastAndroid.show.initialRegion, ToastAndroid.SHORT;
    this.setState({
      initialRegion,
    });
  };

  fetchCars = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listCars));

      this.setState({cars: response.data.listCars.items});
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
        {cancelable: false},
      );
    }
  };

  getImage = type => {
    if (type === 'Perawat') {
      return require('../../assets/images/mingguan.png');
    }
    if (type === 'Caregiver') {
      return require('../../assets/images/bulanan.png');
    }
    return require('../../assets/images/caregiver.png');
  };

  render() {
    // console.log(this.state.cars);
    return (
      <SafeAreaView>
      <MapView
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        scrollEnabled={false}
        customMapStyle={mapStyle}
        zoomEnabled={false}
        initialRegion={this.state.initialRegion}
        onRegionChangeComplete={this.onChangeValue}
        ref={ref => (this.map = ref)}>
        {this.state.cars.map(car => (
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
              source={this.getImage(car.type)}
            />
          </Marker>
        ))}
       
      </MapView>
      
        <Pressable
          onPress={() => console.warn('Hey')}
          style={{
            top: 10,
            left: 10,
            position: 'absolute',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 25,
          }}>
          <MaterialIcons name={'menu'} size={24} color="#4a4a4a" />
        </Pressable>
       
    </SafeAreaView>
    );
  }
}
