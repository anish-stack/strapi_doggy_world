import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function Card({ data }) {
    const navigation = useNavigation();

    const {
        title,
        price,
        disc_price,
        off_dis_percentage,
        images,
        variant,
        varient_stauts
    } = data;

    const displayPrice = varient_stauts ? variant?.[0].price : price;
    const displayDiscPrice = varient_stauts ? variant?.[0].disc_price : disc_price;
    const displayDiscount = off_dis_percentage || variant?.[0].off_perce;

    return (
        <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('product_details', { id: data.documentId, title: data.title })}
            style={styles.cardContainer}
        >
            {/* Discount Badge */}
            {displayDiscount > 0 && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{displayDiscount}% OFF</Text>
                </View>
            )}

            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: images?.url }} style={styles.image} />
                <TouchableOpacity style={styles.wishlistButton}>
                    <Icon name="favorite-border" size={20} color="#FF5A5F" />
                </TouchableOpacity>
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>

                {/* Price Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountPrice}>₹{displayDiscPrice || 0}</Text>
                        <Text style={styles.originalPrice}>₹{displayPrice || 0}</Text>
                    </View>

                    {/* Rating Section */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>4.5 ⭐</Text>
                    </View>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.9}>
                    <Icon name="shopping-cart" size={18} color="#FFFFFF" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: cardWidth,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        margin: 8,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    imageContainer: {
        width: '100%',
        height: 100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 8,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    discountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#FF5A5F',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    contentContainer: {
        padding: 12,
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
        lineHeight: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    discountPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 12,
        color: '#999999',
        textDecorationLine: 'line-through',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 4,
    },
    ratingCount: {
        fontSize: 12,
        color: '#999999',
        marginLeft: 4,
    },
    addToCartButton: {
        backgroundColor: '#FF5A5F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    addToCartText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});