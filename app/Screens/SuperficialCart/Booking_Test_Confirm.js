import { View, Text, ScrollView, StyleSheet, PanResponder, TouchableOpacity, Linking, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment'

export default function Booking_Test_Confirm() {
    const route = useRoute()
    const [pan] = useState(new Animated.ValueXY());
    const [dataBooked, setDataBooked] = useState({})
    const [loading, setLoading] = useState(false)
    const { data } = route.params || {}
    const navigation = useNavigation()
    useEffect(() => {
        setLoading(true)
        if (data) {
            const parsedData = JSON.parse(data)
            setDataBooked(parsedData)
            setLoading(false)
        }
    }, [data])

    const handleOpenMap = () => {
        if (dataBooked?.clinic?.Map_Location) {
            Linking.openURL(dataBooked.clinic.Map_Location)
        }
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
        }),

        onPanResponderRelease: (e, gestureState) => {
            const { dx } = gestureState;

            // Detect swipe left or right
            if (dx < -100) {
                navigation.navigate('Home'); // Left swipe, navigate to Home
            } else if (dx > 100) {
                navigation.navigate('Home'); // Right swipe, navigate to Home
            }

            // Reset pan responder position
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true,
            }).start();
        },
    });
    const handleCall = () => {
        if (dataBooked?.clinic?.contact_details) {
            Linking.openURL(`tel:${dataBooked.clinic.contact_details}`)
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/* Success Header */}
            <View style={styles.container} {...panResponder.panHandlers}>

                <View style={styles.header}>
                    <View style={styles.successIcon}>
                        <FontAwesome name="check-circle" size={50} color="#FFFFFF" />
                    </View>
                    <Text style={styles.headerTitle}>Booking Confirmed!</Text>
                    <Text style={styles.headerSubtitle}>
                        {moment(dataBooked?.booking_date).format('DD MMM YYYY, hh:mm A')}
                    </Text>
                </View>

                {/* Clinic Details */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome name="hospital-o" size={20} color="#B32114" />
                        <Text style={styles.cardTitle}>Clinic Details</Text>
                    </View>
                    <Text style={styles.clinicName}>{dataBooked?.clinic?.clinic_name}</Text>
                    <Text style={styles.clinicAddress}>{dataBooked?.clinic?.Address}</Text>
                    <Text style={styles.clinicTime}>{dataBooked?.clinic?.time}</Text>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleOpenMap}>
                            <FontAwesome name="map-marker" size={18} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>View on Map</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
                            <FontAwesome name="phone" size={18} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>Call Clinic</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tests Details */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome name="flask" size={20} color="#B32114" />
                        <Text style={styles.cardTitle}>Booked Tests</Text>
                    </View>
                    {dataBooked?.test?.map((test, index) => (
                        <View key={index} style={styles.testItem}>
                            <View style={styles.testHeader}>
                                <Text style={styles.testName}>{test.test_name}</Text>
                                {test.isUltraSound && (
                                    <View style={styles.ultraBadge}>
                                        <Text style={styles.ultraText}>Imaging Test</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.discountPrice}>₹{test.discountPrice}</Text>
                                <Text style={styles.originalPrice}>₹{test.test_price}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Price Summary */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome name="money" size={20} color="#B32114" />
                        <Text style={styles.cardTitle}>Price Details</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <Text style={styles.priceValue}>₹{dataBooked?.totalPrice}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Total Discount</Text>
                        <Text style={styles.discountValue}>-₹{dataBooked?.totalDiscount}</Text>
                    </View>
                    {dataBooked?.offer && (
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Offer ({dataBooked.offer.Code})</Text>
                            <Text style={styles.discountValue}>-₹{dataBooked.offer.upto_off}</Text>
                        </View>
                    )}
                    <View style={[styles.priceRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Final Amount</Text>
                        <Text style={styles.totalValue}>₹{dataBooked?.payableAmount}</Text>
                    </View>
                </View>


                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomButton}>
                        <Text style={styles.buttonText}>Go To Home</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: '#F7E9E8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#B32114',
        fontSize: 16,
    },
    header: {
        backgroundColor: '#B32114',
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    successIcon: {
        backgroundColor: '#8F1A10',
        padding: 15,
        borderRadius: 50,
        marginBottom: 15,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    headerSubtitle: {
        color: '#F0D3D0',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        margin: 15,
        padding: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B32114',
        marginLeft: 10,
    },
    clinicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6B140C',
        marginBottom: 5,
    },
    clinicAddress: {
        fontSize: 14,
        color: '#8F1A10',
        marginBottom: 5,
        lineHeight: 20,
    },
    clinicTime: {
        fontSize: 14,
        color: '#B32114',
        marginBottom: 15,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B32114',
        padding: 10,
        borderRadius: 8,
        flex: 0.48,
        justifyContent: 'center',
    },
    actionButtonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    testItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0D3D0',
        paddingVertical: 10,
    },
    testHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    testName: {
        fontSize: 16,
        color: '#6B140C',
        fontWeight: '500',
        flex: 1,
    },
    ultraBadge: {
        backgroundColor: '#F0D3D0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ultraText: {
        color: '#B32114',
        fontSize: 12,
        fontWeight: '500',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8F1A10',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#CA645B',
        textDecorationLine: 'line-through',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    priceLabel: {
        fontSize: 14,
        color: '#7D170E',
    },
    priceValue: {
        fontSize: 14,
        color: '#6B140C',
        fontWeight: '500',
    },
    discountValue: {
        fontSize: 14,
        color: '#8F1A10',
        fontWeight: '500',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#F0D3D0',
        marginTop: 10,
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5A110A',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B32114',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginTop: 20,
        transform: [{ translateX: -75 }],
        backgroundColor: '#a11e12',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})