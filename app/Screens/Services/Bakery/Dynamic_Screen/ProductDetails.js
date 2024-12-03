import { View, Text, ActivityIndicator, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpperLayout from '../../../../layouts/UpperLayout';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddingStart, AddingSuccess, AddingFailure, AddItemInCart } from '../../../../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function ProductDetails() {
  const route = useRoute();
  const { id, title } = route.params;
  const dispatch = useDispatch()
  const { CartItems, CartCount } = useSelector((state) => state.cart)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedvariants, setSelectedVariants] = useState({
    price: 0,
    disc_price: 0,
    off_dis_percentage: 0
  })

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://192.168.1.3:1337/api/products/${id}?populate=*`);
      setProduct(res.data.data);
    } catch (error) {
      setError('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };
  console.log("i am cart", CartCount)

  useEffect(() => {
    if (product?.variant?.length > 0) {
      setSelectedVariants({
        price: product.variant[0].price,
        disc_price: product.variant[0].disc_price,
        off_dis_percentage: product.variant[0].off_perce,
      });
    }
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [id]);


  const handleSelect = (price, discount_price, off_dis_percentage) => {
    setSelectedVariants({
      price,
      disc_price: discount_price,
      off_dis_percentage,
    })
  }
  
  const handleAddToCart = async (item) => {
    const price = {};
    const isVarientTrue = item.varient_stauts;

    if (isVarientTrue) {
      price.price = selectedvariants.price;
      price.disc_price = selectedvariants.disc_price;
      price.off_dis_percentage = selectedvariants.off_dis_percentage;
    } else {
      price.price = item.price;
      price.disc_price = item.disc_price;
      price.off_dis_percentage = item.off_dis_percentage;
    }
    // console.log(price);

    try {
      dispatch(AddingStart());
      const newItem = {
        ProductId: item.documentId,
        title: item.title,
        quantity: 1,
        Pricing: price,
        image: item.images?.url,
        isVarientTrue: isVarientTrue,

      };


      dispatch(AddingSuccess({
        Cart: [newItem],
      }));

    } catch (error) {
      dispatch(AddingFailure(error.message));  
    }
  };




  if (loading) {
    return (
      <View style={styles.centered}>
        <UpperLayout title={title} />
        <ActivityIndicator size="large" color="#003873" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <UpperLayout title={title} />
        <Text>{error}</Text>
      </View>
    );
  }

  return (

    <>
      <UpperLayout title={title.substring(0, 15) + '...'} />
      <ScrollView style={styles.bg}>



        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product?.images?.url }} />
        </View>


        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.smallDesc}>{product?.small_desc}</Text>
          <Text style={styles.suitableFor}>Suitable for: {product?.suitable_for}</Text>


          <TouchableOpacity
            activeOpacity={0.9} style={styles.categoryLink}>
            <Text style={styles.categoryText}>
              See All {product?.catgory?.titile} Products <Icon size={19} color={'#9C1EE9'} name="angle-right" />
            </Text>
          </TouchableOpacity>

          <Text style={styles.gram}>200 g</Text>

          <View style={styles.priceAndButton}>
            <View style={styles.priceInfo}>

              {product?.varient_stauts === true && (
                <>
                  <View style={styles.priceSection}>
                    <Text style={styles.bigPrice}>₹{selectedvariants?.disc_price}</Text>
                    <Text style={styles.SmallPrice}>₹{selectedvariants?.price}</Text>
                    <Text style={styles.off}>{selectedvariants?.off_dis_percentage}% off</Text>

                  </View>


                </>

              )}


              {product?.varient_stauts === false && (

                <View style={styles.priceSection}>
                  <Text style={styles.bigPrice}>₹{product?.disc_price}</Text>
                  <Text style={styles.SmallPrice}>₹{product?.price}</Text>
                  <Text style={styles.off}>{product?.off_dis_percentage}% off</Text>

                </View>
              )}
            </View>
            <View style={styles.addButton}>
              <TouchableOpacity
                activeOpacity={0.9} onPress={() => handleAddToCart(product)} style={styles.btn}>
                <Text style={styles.addCartText}>Add </Text>
              </TouchableOpacity>
            </View>
          </View>
          {product?.varient_stauts === true && (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.variantSection}>
                {product?.variant?.map((item, index) => {
                  const isSelected = selectedvariants?.price === item.price;

                  return (
                    <TouchableOpacity
                      onPress={() => handleSelect(item.price, item.disc_price, item.off_perce)}
                      key={index}
                      style={[
                        styles.variantButton,
                        isSelected && styles.selectedVariant,
                      ]}
                    >
                      <Text style={[styles.variantText, isSelected && styles.selectedVariantText]}>
                        {item.size} - {item.flavour} - {item.price ? `₹${item.price}` : 'Price Unavailable'}
                      </Text>
                      <Text style={[styles.variantDiscount, isSelected && styles.selectedVariantDiscount]}>
                        {item.disc_price ? `Discounted Price: ₹${item.disc_price}` : 'No Discount'}
                      </Text>
                      {isSelected && <Text style={styles.selectedTag}>Selected</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          )}

          <View style={styles.bt}></View>
          <View style={styles.container}>


          </View>
          <View style={styles.bt}></View>
          {product.content && product.content.length > 0 && (
            product.content.map((item, index) => {
              // Handle headings
              if (item.type === 'heading') {
                const headingText = item.children.find(child => child.type === 'text')?.text || '';
                return (
                  <Text key={index} style={[styles.heading, item.level === 6 && styles.headingLevel6]}>
                    {headingText}
                  </Text>
                );
              }

              // Handle unordered lists
              if (item.type === 'list' && item.format === 'unordered') {
                return (
                  <View key={index} style={styles.listContainer}>
                    {item.children.map((listItem, idx) => {
                      const listItemText = listItem?.children?.find(child => child.type === 'text')?.text || '';
                      return (
                        <Text key={idx} style={styles.listItem}>
                          • {listItemText}
                        </Text>
                      );
                    })}
                  </View>
                );
              }

              // Handle ordered lists
              if (item.type === 'list' && item.format === 'ordered') {
                return (
                  <View key={index} style={styles.listContainer}>
                    {item.children.map((listItem, idx) => {
                      const listItemText = listItem?.children?.find(child => child.type === 'text')?.text || '';
                      return (
                        <Text key={idx} style={styles.listItem}>
                          {idx + 1}. {listItemText}
                        </Text>
                      );
                    })}
                  </View>
                );
              }

              // Handle paragraphs
              if (item.type === 'paragraph') {
                return (
                  <Text key={index} style={styles.paragraph}>
                    {item.children.map((child, idx) => {
                      if (child.type === 'text') {
                        return (
                          <Text
                            key={idx}
                            style={[
                              child.bold && styles.bold,
                              child.italic && styles.italic,
                              child.underline && styles.underline,
                              child.strikethrough && styles.strikethrough,
                            ]}
                          >
                            {child.text}
                          </Text>
                        );
                      }

                      if (child.type === 'link') {
                        const linkText = child.children.find(linkChild => linkChild.type === 'text')?.text || '';
                        return (
                          <Text
                            key={idx}
                            style={[styles.link, child.underline && styles.underline]}
                            onPress={() => Linking.openURL(child.url)}
                          >
                            {linkText}
                          </Text>
                        );
                      }

                      return null;  // Return null if no recognized type
                    })}
                  </Text>
                );
              }

              // Handle code blocks
              if (item.type === 'code') {
                const codeText = item.children.find(child => child.type === 'text')?.text || '';
                return (
                  <Text key={index} style={styles.codeBlock}>
                    {codeText}
                  </Text>
                );
              }

              return null;  // Return null if item type is not recognized
            })
          )}


        </View>
      </ScrollView>
    </>


  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bg: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  imageContainer: {
    paddingHorizontal: 8,
    marginTop: 20,
    width: width * 0.95,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  smallDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  suitableFor: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  categoryLink: {
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#B21133',
    fontWeight: 'bold',
  },
  variantSection: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 0,
  },
  variantButton: {
    margin: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(179, 33, 19, 0.1)',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  variantText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  variantDiscount: {
    fontSize: 12,
    color: '#ff4d4d',
    marginTop: 5,
    textAlign: 'center',
  },
  selectedVariant: {
    borderColor: '#0d6efd',
    backgroundColor: '#e7f1ff',
  },
  selectedVariantText: {
    color: '#003873',
  },
  selectedVariantDiscount: {
    color: '#003873',
  },
  selectedTag: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ff4d4d',
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  priceSection: {
    display: 'flex',
    marginBottom: 0,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceAndButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  gram: {
    fontSize: 10,
    color: '#111',
    fontWeight: 'bold',
  },
  bigPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  SmallPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  btn: {
    backgroundColor: '#DA291C',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  off: {
    backgroundColor: '#DA291C',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,

    color: '#fff',
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,

  },
  heading: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  headingLevel6: {
    fontSize: 18,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
    paddingLeft: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  link: {
    color: '#0d6efd',
    textDecorationLine: 'underline',
  },
  codeBlock: {
    fontFamily: 'monospace',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
    color: '#d6336c',
    marginVertical: 5,
  },
  bt: {
    backgroundColor: '#F5F6F7',
    marginTop: 20,
    height: 10,

    width: '100%',

  }
});
