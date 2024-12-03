import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Card Component
export default function Card({ data }) {
    const navigation = useNavigation()

    const {
        title,
        small_desc,
        price,
        disc_price,
        off_dis_percentage,
        images,
        variant,
        varient_stauts
    } = data;

    // console.log(price)


    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('product_details', { id: data.documentId, title: data.title })}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: images?.url }} style={styles.image} />
                </View>
                <Text style={styles.tag}>{off_dis_percentage || variant?.[0].off_perce}% Off</Text>

                {/* Title and Description Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {/* <Text style={styles.smallDesc}>{small_desc.substring(0, 30) + '...'}</Text> */}


                    {/* Price Section */}
                    {varient_stauts === true ? (
                        <View style={styles.priceContainer}>
                            <Text style={styles.discountPrice}>₹{variant?.[0].price || 0}</Text>
                            <Text style={styles.price}>₹{variant?.[0].disc_price || 0}</Text>
                        </View>
                    ) : (
                        <View style={styles.priceContainer}>
                            <Text style={styles.discountPrice}>₹{disc_price || 0}</Text>
                            <Text style={styles.price}>₹{price || 0}</Text>
                        </View>
                    )}


                    {/* Add to Cart Button */}
                    <TouchableOpacity 
 activeOpacity={0.9}style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        </View >
    );
}

// Styles
const styles = StyleSheet.create({

    cardContainer: {
        position: 'relative',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 2,
        margin: 8,
        padding: 10,
        borderRadius: 10,

        width: '45%'
    },
    imageContainer: {
        width: 140,
        height: 100,
        overflow: 'hidden',

    },
    image: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,

    },
    title: {
        width: '90%',
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    smallDesc: {
        fontSize: 12,
        color: '#111',
        marginBottom: 10,
    },
    suitableFor: {
        fontSize: 12,
        color: '#A1301A', // A slightly lighter shade of #B32113
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    discountPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D44B41', // Lighter shade of #B32113
        marginRight: 5,
    },
    price: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#B32113', // Using the main shade for original price
    },
    addToCartButton: {
        backgroundColor: '#B32113', // Use the primary color for the button
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    tag: {
        position: 'absolute',
        top: 10,
        right: 10,

        borderRadius: 5,
        backgroundColor: '#D44B41',
        padding: 4,
        borderRadius: 5,
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 5,
        textTransform: 'uppercase'
    }
});
