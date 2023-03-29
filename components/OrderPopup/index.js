import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {getOrder, getCar} from '../../src/graphql/queries';
import {Linking} from 'react-native';

const OrderPopup = () => {
  const [order, setOrder] = useState(null);

  const route = useRoute();
  console.log(route.params.id);

  // Fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {id: route.params.id}),
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {}
    };
    fetchOrder();
  }, []);

   // Fungsi untuk membuka WhatsApp dengan nomor telepon tertentu
   const openWhatsApp = (phone, message) => {
    // Masukkan nomor telepon dengan format internasional, misalnya +6281234567890
    let url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Pastikan aplikasi WhatsApp terinstall di perangkat Anda');
      });
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.popupContainer}>
        <View style={styles.row}>
          <View style={styles.userBg}>
            <MaterialIcons name={'person'} size={35} color={'white'} />
          </View>
        </View>

        <Text style={styles.minutes}>Nama Petugas {order?.user?.username}</Text>
        <Text style={styles.minutes}>Status {order?.status}</Text>
        <View style={styles.minutes}>
          {order && (
            <Pressable
              onPress={() => {
                const phone = `+${order?.user?.phoneNumber}`;
                const message = 'Halo, saya klien Aplikasi Perawatku';
                openWhatsApp(phone, message);
              }}
              style={[styles.roundButton, {bottom: 10}]}>
              <MaterialIcons name={'chat'} size={30} color="#fff" />
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default OrderPopup;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    bottom: 230,
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  popupContainer: {
    backgroundColor: '#000',
    borderRadius: 10,
    height: 200,
    marginTop: 400,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  minutes: {
    color: 'lightgrey',
    fontSize: 22,
  },
  distance: {
    color: 'lightgrey',
    fontSize: 23,
  },
  uberType: {
    color: 'lightgrey',
    fontSize: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBg: {
    backgroundColor: '#1495FF',
    borderRadius: 50,
    width: 40,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
  },
  declineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chat: {
    backgroundColor: '#eee',
    height: 45,
    width: '70%',
    borderRadius: 5,
  },
});
