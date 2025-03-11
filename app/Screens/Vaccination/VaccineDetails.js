
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,

  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StatusBar,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';
import { useDispatch } from 'react-redux';
import { AddingStart, AddingSuccess } from '../../redux/slice/labTestCart';

export default function VaccineDetails() {
  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInCart, setIsInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const notificationOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  console.log("id", id)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!id) {
      setError('No vaccination ID provided.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.1.3:1337/api/vaccinations?filters[documentId][$eq]=${id}&populate=*`
      );
      setData(response.data.data[0] || null);
    } catch (err) {
      setError('Failed to fetch vaccination details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (data?.isPackage) {
      setShowModal(true);
    } else {
      const cartItem = {
        documentId: data.documentId,
        test_name: data.title,
        isUltraSound: false,
        serviceType: selectedOption,
        imageUrl: data.image?.url,
        discountPrice:
          data.discount_price,

        test_price: data.price,
      };


      setIsInCart(true);
      setShowModal(false);
      showNotification();
      dispatch(AddingStart());
      dispatch(AddingSuccess([cartItem]));
    }
  };

  const confirmAddToCart = () => {
    if (!selectedOption) return;

    const cartItem = {
      documentId: data.documentId,
      test_name: data.title,
      isUltraSound: false,
      serviceType: selectedOption,
      imageUrl: data.image?.url,
      discountPrice:
        selectedOption === "Clinic"
          ? data.discount_price
          : data.HomePriceOfPackageDiscount,
      test_price:
        selectedOption === "Clinic" ? data.price : data.HomePriceOfPackage,
    };


    setIsInCart(true);
    setShowModal(false);
    showNotification();
    dispatch(AddingStart());
    dispatch(AddingSuccess([cartItem]));
  };

  const showNotification = () => {
    Animated.sequence([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(notificationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
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

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 80],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={{ uri: data.image?.url || 'https://via.placeholder.com/150' }}
          style={[styles.headerImage, {
            opacity: headerTitleOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            })
          }]}
        />
        <Animated.Text style={[styles.headerTitle, { opacity: headerTitleOpacity }]}>
          {data.title}
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.forage}>For age: {data.forage}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{data.discount_price}</Text>
            <Text style={styles.strikePrice}>₹{data.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round((1 - data.discount_price / data.price) * 100)}% OFF
              </Text>
            </View>
          </View>

          <View style={styles.vaccineListContainer}>
            <Text style={styles.sectionTitle}>Vaccinations Included:</Text>
            {data.name && data.name.map((item, index) => (
              <View key={index} style={styles.vaccineItem}>
                <Ionicons name="checkmark-circle" size={24} color="#ff6b6b" style={styles.vaccineIcon} />
                <Text style={styles.vaccineName}>{item.vaccine_name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Information</Text>
            <Text style={styles.description}>{data.small_dsec}</Text>
          </View>
        </View>
      </Animated.ScrollView>

      <TouchableOpacity
        style={[styles.addToCartButton, isInCart && styles.addedToCartButton]}
        onPress={() => handleAddToCart(data)}
        disabled={isInCart}
      >
        <Text style={styles.addToCartText}>
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </Text>
        <Ionicons name={isInCart ? "checkmark-circle" : "cart-outline"} size={24} color="white" />
      </TouchableOpacity>
      {data?.isPackage && (
        <Modal transparent visible={showModal} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalContainers}>
                <Text style={styles.modalTitle}>Select Service Type</Text>
                <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === "Clinic" && styles.selectedOption,
                ]}
                onPress={() => setSelectedOption("Clinic")}
              >
                <Text style={styles.optionText}>Clinic - ₹{data.discount_price}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === "Home Vaccination" && styles.selectedOption,
                ]}
                onPress={() => setSelectedOption("Home Vaccination")}
              >
                <Text style={styles.optionText}>
                  Home Vaccination - ₹{data.HomePriceOfPackageDiscount}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmAddToCart}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
        <Text style={styles.notificationText}>Added to cart successfully!</Text>
      </Animated.View>
    </SafeAreaView>
  );
}
