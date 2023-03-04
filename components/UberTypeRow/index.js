import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UberTypeRow = (props) => {
  const {type, onPress, isSelected} = props;

  const getImage = () => {
    if (type.type === 'Perawat') {
      return require('../../assets/images/mingguan.png');
    }
    if (type.type === 'Caregiver') {
      return require('../../assets/images/bulanan.png');
    }
    return require('../../assets/images/caregiver.png');
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: isSelected ? '#FFF' : '#f7f7f7'},
      ]}>
      {/* images */}
      <Image style={styles.image} source={getImage()} />
      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type}
          {''}
        </Text>
        <Text style={styles.time}>{type.ket}</Text>
      </View>

      <View style={styles.rightContainer}>
        {/* <Ionicons name={'pricetag'} size={18} color={'#42d742'} /> */}
        <Text style={styles.price}>Rp.{type.price}</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Montserrat SemiBold 600',
    color: '#000',
    marginBottom: 5,
  },
  time: {
    color: '#5d5d5d',
  },
  rightContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
  },
});
