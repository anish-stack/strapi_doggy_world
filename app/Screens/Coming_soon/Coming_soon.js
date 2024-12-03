import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Coming_soon() {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with your actual home screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://i.ibb.co/j6dvt5N/360-F-490948181-Hkp-X8e-P23-SDtleou-GEZj-Sn-H8dr-KYt-Y7-M.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.subtitle}>
        Exciting offers and new features are launching soon! Please stay tuned for updates and be ready to enjoy amazing deals.
      </Text>

      {/* Offers Section */}
      <View style={styles.offersContainer}>
        <Text style={styles.offersTitle}>Upcoming Offers:</Text>
        <Text style={styles.offerItem}>🎉 Buy 1 Get 1 Free on Select Services</Text>
        <Text style={styles.offerItem}>💥 Up to 50% Off on Vaccination Packages</Text>
        <Text style={styles.offerItem}>✨ Exclusive Discounts for New Users</Text>
        <Text style={styles.offerItem}>🌟 Early Bird Discounts on Special Events</Text>
        <Text style={styles.offerItem}>📦 Free Home Delivery for Bookings Over ₹1000</Text>
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B32113',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  offersContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
 
    marginBottom: 20,
  },
  offersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B32113',
    marginBottom: 10,
  },
  offerItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  homeButton: {
    backgroundColor: '#B32113',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
