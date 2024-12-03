import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import UpperLayout from '../../layouts/UpperLayout';
import { RemoveLabTest } from '../../redux/slice/labTestCart';
import axios from 'axios';
import SuperficialNoter from './SuperficialNoter';
import AdOns from '../../components/AdOns/AdOns';

export default function SuperficialCart() {
  const { labTests } = useSelector((state) => state.labCart) || [];
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [error, setError] = useState('');

  const fetchOffers = async () => {
    setError('');
    try {
      const { data } = await axios.get('https://admindoggy.adsdigitalmedia.com/api/offers?populate=*');
      if (data && data.data.length) {
        setOffers(data.data);
      } else {
        setError('No available offers found.');
      }
    } catch (err) {
      setError('Internal Server Error. Please try again later.');
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Calculate totals
  const totalPrice = labTests.reduce((total, item) => total + parseFloat(item.test_price), 0);
  const totalDiscount = labTests.reduce(
    (total, item) => total + (parseFloat(item.test_price) - parseFloat(item.discountPrice)),
    0
  );
  const payableAmount = totalPrice - totalDiscount - (selectedOffer?.upto_off || 0);
  console.log("payableAmount", payableAmount)
  // Handle item removal
  const handleRemove = (id) => {
    
          dispatch(RemoveLabTest({ testIdToRemove: id })); // Remove item using Redux action
       
  };

  const applyOffer = (offer) => {
    if (totalPrice >= offer.minimum_amount) {
      setSelectedOffer(offer);
      Alert.alert('Offer Applied', `Code ${offer.Code} applied successfully!`);
    } else {
      Alert.alert(
        'Cannot Apply Offer',
        `Minimum amount of ₹${offer.minimum_amount} is required to use this offer.`
      );
    }
  };

  // Empty Cart Message
  if (!labTests || labTests.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Your cart is empty! 🐶</Text>
      </View>
    );
  }

  return (


    <View style={styles.container}>
    <UpperLayout title="Lab Cart" />
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Cart Items */}
      <FlatList
        data={labTests}
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.testImage} />
            <View style={styles.testDetails}>
              <Text style={styles.testName}>{item.test_name}</Text>
              <Text style={styles.testDateTime}>
                {item.selectedDate} | {item.selectedTime}
              </Text>
              <Text style={styles.testPrice}>₹{item.discountPrice} (₹{item.test_price})</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.documentId)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
  
      {/* Available Offers */}

      <View style={styles.offersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((offer) => (
            <View key={offer.id} style={styles.offerCard}>
              <View style={styles.row}>
                <Text style={styles.offerCode}>{offer.Code}</Text>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => applyOffer(offer)}
                >
                  <Text style={styles.applyButtonText}>
                    {selectedOffer?.id === offer.id ? 'Applied' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.offerMinAmount}>
                Min Order: ₹{offer.minimum_amount} | Upto ₹{offer.upto_off} off
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
  
      {/* Price Breakdown */}
      <View style={styles.priceBreakdown}>
        <Text style={styles.priceBreakdownTitle}>Price Summary:</Text>
        <View style={styles.priceRowContainer}>
          <Text style={styles.priceLabel}>Total Price:</Text>
          <Text style={styles.priceValue}>₹{totalPrice}</Text>
        </View>
        <View style={styles.priceRowContainer}>
          <Text style={styles.priceLabel}>Total Discount:</Text>
          <Text style={styles.discountValue}>- ₹{totalDiscount}</Text>
        </View>
        {selectedOffer && (
          <View style={styles.priceRowContainer}>
            <Text style={styles.priceLabel}>
           ({selectedOffer.Code}):
            </Text>
            <Text style={styles.offerDiscount}> - ₹{selectedOffer.upto_off}</Text>
          </View>
        )}
        <View style={styles.priceRowContainer}>
          <Text style={styles.priceLabel}>Payable Amount:</Text>
          <Text style={styles.payableValue}>₹{payableAmount || 0}</Text>
        </View>
      </View>
  
      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Tests</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
  
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    paddingHorizontal:12
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c757d',
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  testImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  testDetails: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  testDateTime: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  testPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 42,
  },
  removeButtonText: {
    color: '#dc3545',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceBreakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  priceBreakdown: {
 
    borderStyle: 'dashed',
    borderColor: '#B32113',
    borderWidth: 1,

    padding: 15,
    backgroundColor: '#f4f4f4', // Soft background color for the price breakdown
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  priceRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light border to separate rows
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000', // Bright color for total price
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d64444', // Red for discount to indicate reduction
  },
  offerDiscount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000', // A nice teal color for offer discount
  },
  payableValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f44336', // Bold red color for payable amount
  },
  confirmButton: {

    marginTop: 20,

    paddingVertical: 12,
    backgroundColor: '#f44336',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  offersContainer: {

  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offerCard: {
    borderWidth: 1,
    borderWidth: 1,

    borderColor: '#B32113',
    borderStyle: 'dashed',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    minWidth: 250,
  },
  offerCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B32113',
  },
  offerDesc: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  offerMinAmount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },

  applyButtonText: {
    color: '#B32131',
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerMinAmount: {
    fontSize: 14,
    marginTop: 6,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
