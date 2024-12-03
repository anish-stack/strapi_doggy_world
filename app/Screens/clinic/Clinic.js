import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, Animated, Linking, StyleSheet } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import UpperLayout from '../../layouts/UpperLayout';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Clinic({isUpperLayoutShow = true}) {


  const ClinicsData = [
    {
      id: 1,
      name: 'Doggy World - Sector 8, Rohini',
      address: 'Plot 147, Pocket B 6, Sector 8, Rohini, New Delhi, Delhi 110085',
      opening_hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      map: 'https://maps.app.goo.gl/vALJ4ayVibCZxDq69',
      image: ['https://i.ibb.co/zVB1Nq4/8.jpg', 'https://i.ibb.co/ZLdtHP1/8-1.jpg', 'https://i.ibb.co/6NfWYmD/8-3.jpg', 'https://i.ibb.co/m9xBn8y/8-4.jpg']
    },
    {
      id: 2,
      name: 'Doggy World - Sector 24 Rohini',
      address: 'Plot 147, Pocket B 6, Sector 8, Rohini, New Delhi, Delhi 110085',
      opening_hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      map: 'https://maps.app.goo.gl/GZ3aBTr9xyttise7A',
      image: ['https://i.ibb.co/R3CbHD2/24.jpg', 'https://i.ibb.co/XWw2sMc/24-1.jpg', 'https://i.ibb.co/wWH5KsZ/24-2.jpg', 'https://i.ibb.co/XC5Ch3r/24-3.jpg']
    },
    {
      id: 3,
      name: 'Doggy World - Derawal Nagar',
      address: 'Derawal Nagar, Model Town, Delhi',
      opening_hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      map: 'https://maps.app.goo.gl/sAkHCh5f22JVHNZM7',
      image: ['https://i.ibb.co/N64Zq61/m1.jpg', 'https://i.ibb.co/dmbDSz4/m.jpg', 'https://i.ibb.co/wyyWTNG/m2.jpg', 'https://i.ibb.co/r5jC4xT/m4.jpg']
    },
    {
      id: 4,
      name: 'Doggy World - Paschim Vihar',
      address: 'Paschim Vihar, New Delhi',
      opening_hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      map: 'https://maps.app.goo.gl/54czbh8EZLjBiyt96',
      image: ['https://i.ibb.co/bsY0mby/o.jpg', 'https://i.ibb.co/LrhgJYf/o1.jpg', 'https://i.ibb.co/t2Q0YBR/o2.jpg', 'https://i.ibb.co/pjNfJYf/o3.jpg']
    },
  ];

  return (
    <View style={styles.container}>
      {isUpperLayoutShow && (

      <UpperLayout title={"Choose a Clinic"} />
      )}

      {/* Scrollable View for Clinics */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {ClinicsData.reduce((rows, clinic, index) => {

          if (index % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(clinic);
          return rows;
        }, []).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(clinic => (
              <ClinicCard key={clinic.id} item={clinic} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const ClinicCard = ({ item }) => {
  const navigataion = useNavigation()
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(false); // New state to track selection

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = (activeIndex + 1) % item.image.length;
      setActiveIndex(newIndex);
      scrollViewRef.current.scrollTo({ x: newIndex * 200, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, item.image.length]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const dotPosition = Animated.divide(scrollX, 200);

  return (
    <View style={styles.clinicCard}>
      <View style={{ width: 200 }}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {item.image.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[styles.image, { width: 200 }]}
            />
          ))}
        </ScrollView>

        {/* Dots for Image Indicators */}
        <View style={styles.dotsContainer}>
          {item.image.map((_, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
          })}
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.clinicName}>{item.name}</Text>
        <Text style={styles.clinicHours}>Opening Hours: {item.opening_hours}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.map);
            }}
            style={styles.mapButton}
          >
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity 
 activeOpacity={0.9}style={styles.selectButton} onPress={() => navigataion.navigate('Book-Grooming', { item: item })}>
            <Text style={styles.selectButtonText}>{selected ? 'Deselect' : 'Select Clinic'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  clinicCard: {
    flex: 0.49,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {

    height: width * 0.4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 8,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  clinicHours: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },

  dotsContainer: {
    width: width / 2.2,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#B32113',
    borderRadius: 4,
    marginHorizontal: 4,
  },


  selectButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  selectButtonText: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  mapButton: {
    backgroundColor: '#B32113',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
