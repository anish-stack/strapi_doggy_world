import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function AllGroomingServices() {
  const navigataion = useNavigation()
  const services = [
    {
      id: '1',
      title: 'Bath',
      type: 'Bath',
      desc: ["Shampoo", "Nail Cut", "Anal Gland"],
      startPrice: '₹ 500',
      endPrice: '₹ 1,160',
      anyOffer: true,
      offer: "If You Pay Online The complimentary checkup is free",
      PriceVary: false,
    },
    {
      id: '2',
      title: 'Hair Cutting',
      type: 'Haircut',
      desc: ["Breed-specific Haircut", "Nail Trim", "Ear Cleaning"],
      startPrice: '₹ 650',
      endPrice: '₹ 1,000',
      anyOffer: false,
      offer: "",
      PriceVary: true,
    },
    {
      id: '3',
      title: 'Bath & Haircut',
      type: 'Bath&Haircut',
      desc: ["Full Bath", "Customized Haircut", "Ear Cleaning", "Nail Trim"],
      startPrice: '₹ 1,150',
      endPrice: '₹ 2,600',
      anyOffer: true,
      offer: "If You Pay Online The complimentary checkup is free",
      PriceVary: false,
    },
    {
      id: '4',
      title: 'Dry Bath',
      type: 'Bath',
      desc: ["Waterless Shampoo", "Deodorizing Spray", "Brush Out"],
      startPrice: '₹ 350',
      endPrice: '',
      anyOffer: true,
      offer: "If You Pay Online The complimentary checkup is free",
      PriceVary: false,
    },
    {
      id: '5',
      title: 'Puppy Grooming',
      type: 'Haircut',
      desc: ["Gentle Shampoo", "Face & Ear Cleaning", "Paw & Nail Trim"],
      startPrice: '₹ 700',
      endPrice: '₹ 1,200',
      anyOffer: false,
      offer: "",
      PriceVary: false,
    },
    {
      id: '6',
      title: 'Senior Dog Grooming',
      type: 'Haircut',
      desc: ["Sensitive Shampoo", "Gentle Nail Trim", "Coat Conditioning"],
      startPrice: '₹ 800',
      endPrice: '₹ 1,500',
      anyOffer: true,
      offer: "If You Pay Online The complimentary checkup is free",
      PriceVary: false,
    }
  ];

  const renderServicesByType = (type) => {
    return services
      .filter(service => service.type === type)
      .map(service => (
        <View key={service.id} style={styles.card}>
          <View style={styles.head}>
            <Text style={styles.headText}>{service?.title}</Text>
          </View>
          <View style={styles.cardDescContainer}>
            {service?.desc.map((desc, index) => (
              <View key={index} style={styles.cardDesc}>
                <Image source={require('./check.png')} style={styles.icon} />
                <Text style={styles.cardDescItem}>{desc}</Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.priceText}>{service?.startPrice} - {service?.endPrice}</Text>
            <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigataion.navigate('clinic', { id: service._id })} style={styles.button}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Bath Packages</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {renderServicesByType('Bath')}
        </ScrollView>

        <Text style={styles.sectionTitle}>Haircut Packages</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {renderServicesByType('Haircut')}
        </ScrollView>

        <Text style={styles.sectionTitle}>Bath & Haircut Packages</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {renderServicesByType('Bath&Haircut')}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  card: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    marginRight: 15,
    marginBottom: 15,
  },
  head: {
    padding: 12,
    backgroundColor: '#B32113',
    alignItems: 'center',
  },
  headText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  cardDescContainer: {
    textAlign: 'center',
    margin: 0,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardDesc: {

    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'start',
    width: width * 0.5,
    marginBottom: 8,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  cardDescItem: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#B32113',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
