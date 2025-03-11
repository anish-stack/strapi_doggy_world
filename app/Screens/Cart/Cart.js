import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';
import Ts from 'react-native-vector-icons/FontAwesome';
import AdOns from '../../components/AdOns/AdOns';
import { RemoveCartItem, UpdateCartItem } from '../../redux/slice/cartSlice';
import PaymentInfos from './PaymentInfos';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')


export default function Cart() {

  const navigation = useNavigation()
  const [Quantity, setQuantity] = useState(1)

  const route = useRoute();
  const { offerClick } = route.params || {};
  
  const { CartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleIncrease = (pastQunatity = 1, ProductId) => {
  
    dispatch(UpdateCartItem({ ProductId, quantity: pastQunatity + 1 }));

  };
  const calculatePayablePrice = () => {
    return CartItems.reduce((total, item) => total + item.Pricing.disc_price * item.quantity, 0);
  };

  const handleDecrease = (pastQunatity, ProductId) => {


    dispatch(UpdateCartItem({ ProductId, quantity: pastQunatity - 1 }));
  };

  return (
    <ScrollView>
      <View style={styles.offer_scetions}>
        <TouchableOpacity
          activeOpacity={0.9} onPress={() => navigation.navigate('Available_Offer', { payAmount: calculatePayablePrice() })} style={styles.offer}>
          <View style={styles.offerContent}>
            <Image source={require('./discount.png')} style={styles.discountImage} />
            <Text style={styles.textOne}>
              You Have Unlocked 10 <Text style={styles.textTwo}>New Coupons</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.textThree}>
              <Icon name="chevron-right" size={18} color="#000" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.cart}>
        <View style={styles.display_products}>
          {CartItems && CartItems.length > 0 ? (
            CartItems.map((item, index) => (
              <View key={index} style={styles.product}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productContent}>
                  <Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrease(item.quantity, item.ProductId)}
                    >
                      <Icon name="minus" size={16} color="rgba(178,34,34)" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncrease(item.quantity, item.ProductId)}
                    >
                      <Icon name="plus" size={16} color="rgba(178,34,34)" />
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}><Ts size={18} name='rupee' /> {item.Pricing.disc_price * item.quantity}</Text>
                  <Text style={styles.originalPrice}><Ts size={15} name='rupee' /> {item.Pricing.price}</Text>
                </View>
                {/* <View style={styles.priceContainer}>
                  <Text style={styles.removeBtn} onPress={() => dispatch(RemoveCartItem({ productIdToRemove: item.ProductId }))}> <Icon name="minus" size={12} color="#000" /></Text>
                </View> */}
              </View>
            ))
          ) : (
            <View style={styles.imageContainer}>
            <Image 
              source={require('./rb_27558.png')} 
              style={styles.image} 
            />
            <Text  style={styles.textOne}>
             🚫 No items in your cart. Please add some items to proceed.
            </Text>
          </View>
          
          )}
        </View>
        <View style={styles.MissingContainer}>
          <TouchableOpacity
            activeOpacity={0.9} style={styles.row} >
            <Text style={styles.textOne}>
              Missing something ?
            </Text>
            <Text style={styles.addItemBtn}>
              <Icon name="plus" size={12} color="#fff" /> Add More Items
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AdOns />
      <PaymentInfos offer={offerClick} cartItems={CartItems} />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  offer_scetions: {
    padding: 8,
    backgroundColor: '#ffffff',


    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  offer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',

    padding: 8,


  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountImage: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  textOne: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  textTwo: {
    fontSize: 16,
    color: '#BA0021',
    fontWeight: '600',
  },
  textThree: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cart: {
    marginTop: 10,
    flex: 1,
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  display_products: {

    paddingHorizontal: 10,
    width: width
  },
  product: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 12,

  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 12,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 12,
    width: width / 4.7,

    overflow: 'hidden',
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  quantityControl: {
    marginHorizontal: 15,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(178,34,34,0.5)',

    backgroundColor: 'rgba(178,34,34,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    color: 'rgba(178,34,34,0.9)',
    padding: 2,
    borderRadius: 4,
    fontWeight: '600',
    marginHorizontal: 5,

  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  priceContainer: {


    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d64444',
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 10,

    margin: 10, 
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
  },

  MissingContainer: {
    borderTopWidth: 2,
    borderStyle: 'dashed',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 15,
    borderColor: '#222',
    backgroundColor: '#ffffff',
    justifyContent: 'center',

  },
  row: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  addItemBtn: {
    backgroundColor: '#000',
    padding: 7,
    borderRadius: 8,
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  removeBtn: {
    backgroundColor: 'rgba(178,34,34,0.3)',
    padding: 4,
    borderRadius: 8,
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    marginLeft: 12,
  }
})