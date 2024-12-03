import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PaymentInfos({ cartItems, offer }) {
    const { Code, minimum_amount, upto_off, active } = offer || {};

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Pricing.price * item.quantity, 0);
    };

    const calculateTotalDiscount = () => {
        return cartItems.reduce((total, item) => total + (item.Pricing.price - item.Pricing.disc_price) * item.quantity, 0);
    };

    const calculatePayablePrice = () => {
        return cartItems.reduce((total, item) => total + item.Pricing.disc_price * item.quantity, 0);
    };

    const calculateAfterAppliedCode = () => {
        const payable = calculatePayablePrice();
        if (active && payable >= minimum_amount) {
            return Math.max(0, payable - upto_off); 
        }
        return payable;
    };

    return (
        <View style={styles.container}>
            {/* Delivery Instructions Section */}
            <View style={styles.deliverySection}>
             
                <View style={styles.deliveryText}>
                    <Text style={styles.title}>Delivery Instructions</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add any special instructions for the delivery"
                        multiline={true}
                        numberOfLines={3}
                        placeholderTextColor="#aaa"
                    />
                </View>
            </View>

            {/* Cart Summary Section */}
            <View style={styles.cartSection}>
                <Text style={styles.cartTitle}>Price Breakup</Text>

                {/* Price Summary */}
                <View style={styles.priceSummary}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            <Icon name="receipt" size={14} color="#B32113" /> Total Amount
                        </Text>
                        <Text style={styles.totalAmount}>₹{calculateTotalPrice().toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            <Icon name="percentage" size={14} color="#B32113" /> Discount
                        </Text>
                        <Text style={styles.saving}>Saving ₹{calculateTotalDiscount().toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            <Icon name="gratipay" size={14} color="#B32113" /> To Pay
                        </Text>
                        <Text style={styles.totalAmount}>₹{calculatePayablePrice().toFixed(2)}</Text>
                    </View>

                    {active && calculatePayablePrice() >= minimum_amount && (
                        <View style={styles.totalContainer}>
                             
                            <Text style={styles.totalText}>
                                <Icon name="tag" size={14} color="#B32113" /> ({Code})
                            </Text>
                            <Text style={styles.discountedAmount}>₹{calculateAfterAppliedCode().toFixed(2)}</Text>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity 
 activeOpacity={0.9}style={styles.selectAddressButton}>
                <Text style={styles.selectAddressText}>Please Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#fff',
    },
    deliverySection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
    deliveryText: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        padding: 12,
        marginTop: 8,
        fontSize: 14,
        color: '#333',
        backgroundColor: '#f8f8f8',
    },
    cartSection: {
        marginTop: 20,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        marginBottom: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalText: {
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#d64444',
    },
    discountedAmount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff6f00',
    },
    saving: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6AA84F',
    },
    selectAddressButton: {
        backgroundColor: '#d64444',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
        alignItems: 'center',
    },
    selectAddressText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
