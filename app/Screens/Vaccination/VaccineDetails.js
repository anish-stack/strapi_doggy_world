import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RatingStars from './RatingStars';
import DatePicker from './DatePicker';
const { width } = Dimensions.get('window')
export default function VaccineDetails() {
  const route = useRoute();
  const { id } = route.params || {};
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const handleFormSubmit = (data) => {
    setAppointmentDetails(data);
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (!id) {
      setError('No vaccination ID provided.');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://admindoggy.adsdigitalmedia.com/api/vaccinations?filters[documentId][$eq]=${id}&populate=*`
        );
        setData(response.data.data[0] || {});
      } catch (err) {
        setError('Failed to fetch vaccination details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text>No data available</Text>
      </View>
    );
  }

  const handleClinicSelect = (clinic) => {
    if (selectedClinic && selectedClinic.id === clinic.id) {
      setSelectedClinic(null);
      
    } else {
      setIsModalOpen(true);
      setSelectedClinic(clinic);
    }
    
  };


  const handleBookNow = () => {
    if (selectedClinic) {
      console.log(`Booking at ${selectedClinic.clinic_name}`);
    }
  };

  return (
    <ScrollView scrollEventThrottle={16} overScrollMode="never" decelerationRate="normal" showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

      <Image
        source={{ uri: data.image?.url || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.title}>{data.title}</Text>
          <Text style={styles.forage}>Forage: {data.forage}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>

            ₹{data.discount_price} <Text style={styles.strikePrice}>₹{data.price}</Text>
          </Text>
        </View>

      </View>
      <View style={styles.containerTest}>
        <Text style={styles.title}>These Vaccinations Include:</Text>
        {data.name && data.name.length > 0 && (
          data.name.map((item, index) => (
            <View key={index} style={styles.vaccineItem}>
              <Icon name="check-circle" style={styles.iconTest} />
              <Text style={styles.vaccineName}>{item.vaccine_name}</Text>
            </View>
          ))
        )}
      </View>
      {/* {selectedDate && (
        <Text style={{ marginTop: 20 }}>Selected Date: {selectedDate.toDateString()}</Text>
      )} */}
      <View style={styles.Homecontainer}>
        <ImageBackground
          style={styles.homeSample}
          source={require('./dodo.png')}
          imageStyle={styles.imageStyle} // Rounded corners for the image
        >

          <View style={styles.overlay} />


          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setIsModalOpen(true)} style={styles.bookNowButton}>
              <Text style={styles.bookNow}>Book Now Test At Your Home</Text>
              <Icon name="long-arrow-alt-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <Text style={styles.subTitle}>Available Clinics (Choose any one) </Text>
      <View style={styles.clinicContainer}>
        {data.clinics?.map((clinic) => (
          <TouchableOpacity
            key={clinic.id}
            style={[
              styles.clinicCard,
              selectedClinic?.id === clinic.id && styles.selectedClinic,
            ]}
            onPress={() => handleClinicSelect(clinic)}
          >
            <Text style={styles.clinicName}>{clinic.clinic_name}</Text>
            <Text style={styles.clinicDetails}>{clinic.Address}</Text>

            <View style={styles.clinicFooter}>
              <Text style={styles.clinicTime}>🕒 {clinic.time}</Text>
              <RatingStars rating={clinic.Rating} />
            </View>


            {/* <Text > {clinic.Rating} <Icon name='star'/></Text> */}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.info}>Information</Text>
        <Text style={styles.description}>{data.small_dsec}</Text>
      </View>
      <DatePicker
        isOpen={isModalOpen}
        vaccineItem={data}
        TypeOfBooking={selectedClinic ? 'Clinic' : 'Home'}
        Clinic={selectedClinic}
        onClosed={() => setIsModalOpen(false)}
        onFormSubmit={handleFormSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    flexGrow: 1, // Ensures the container stretches to fill the screen
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#B32113',
  },
  forage: {
    fontSize: 13,
    color: '#111',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: '#B32113',
    marginBottom: 10,
    marginTop: 10


  },
  strikePrice: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#111',
    marginLeft: 8,
  },
  descriptionContainer: {
    backgroundColor: '#f9f9f9', // Light gray background for a clean look
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1, // For Android shadow
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B32113',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 24,

    color: '#333',
  },
  vaccineList: {
    marginLeft: 16,
  },
  vaccineItem: {
    fontSize: 16,
    color: '#333',
  },
  clinicContainer: {
    padding: 4,
  },
  clinicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedClinic: {
    borderColor: '#B32113',
    borderWidth: 2,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B32113',
    marginTop: 5,

    marginBottom: 5,
  },
  clinicDetails: {
    fontSize: 14,
    color: '#555', // Neutral gray for address
    marginBottom: 10,
  },
  clinicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  clinicTime: {
    fontSize: 13,
    color: '#003873',
  },
  clinicRating: {
    // position: 'absolute',

    right: 2,
    marginBottom: 12,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 13,
    fontWeight: '600',
    color: '#f44336',
  },
  bookButton: {
    width: width,
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1d1d1',
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,

    paddingHorizontal: 2,
    alignItems: 'center'
  },
  details: {
    width: width / 2.2,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,

    backgroundColor: '#f2dada',

  },
  priceContainer: {
    width: width / 2.2,

    textAlign: 'center',
    backgroundColor: '#f2dada',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  Homecontainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f9f9f9', // Light background color
  },
  homeSample: {
    width: '100%',
    height: 120,
    borderRadius: 12, // Rounded corners
    overflow: 'hidden',
    position: 'relative',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(179, 33, 49,0.2)',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B32123',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  bookNow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  bookNow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    marginLeft: 5, // Optional spacing for the icon
  },
  containerTest: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,

    borderWidth: 1,
    borderColor: '#ddd',
  },

  vaccineItem: {

    flexDirection: 'row',
    alignItems: 'start',
    marginBottom: 8,
    marginTop: 5,
  },
  iconTest: {
    color: '#B32113',
    fontSize: 18,
    marginRight: 8,
  },
  vaccineName: {
    fontSize: 14,
    color: '#212529',
  },
});
