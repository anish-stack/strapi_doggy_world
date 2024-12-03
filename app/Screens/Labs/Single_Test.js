import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import UpperLayout from '../../layouts/UpperLayout';
import Product_Slider from '../Pet_Shop/_Shop/Product_Slider';
import { useDispatch } from 'react-redux';
import { AddingStart, AddingSuccess, AddingFailure } from '../../redux/slice/labTestCart';

export default function Single_Test() {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const Route = useRoute();
    const { Test, typeOfTest, isUltraSound = false, ClinicId } = Route.params || {};
    
    const [data, setData] = useState({});
    const [slots, setSlots] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        fetchTestDetails();
    }, [Test]);
// console.log(typeOfTest)
    const fetchTestDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://192.168.1.3:1337/api/lab-tests?populate[clinics][populate]=*&populate=OtherImages&filters[documentId][$eq]=${Test}`);
            setData(data.data[0] || {});
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const generateSlots = () => {
        const currentDate = new Date();
        const newSlots = [];
        for (let i = 0; i < 8; i++) {
            const newSlotDate = new Date(currentDate);
            newSlotDate.setDate(newSlotDate.getDate() + i);
            newSlots.push({
                date: newSlotDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                }),
            });
        }
        setTimeSlots(newSlots);
    };

    useEffect(() => {
        generateSlots();
    }, [slots]);

    useEffect(() => {
        const clinicData = data?.clinics?.find((clinic) => clinic.documentId === ClinicId);
        setSlots(clinicData?.Slots || []);
    }, [data, ClinicId]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":").map((item) => parseInt(item, 10));
        const date = new Date();
        date.setHours(hours, minutes, 0);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString([], options);
    };

    const handleDateSelection = (date) => {

        setSelectedDate(prevDate => prevDate === date ? null : date);
    };

    const handleTimeSelection = (time) => {

        setSelectedTime(prevTime => prevTime === time ? null : time);
    };


    const isAddToCartVisible = selectedDate && selectedTime;

    const handleAddtoCart = (item) => {
        const { documentId, test_name, discountPrice, test_price, OtherImages } = item
        const CartItem = {
            documentId,
            test_name,
            discountPrice,
            test_price,
            typeOfTest,
            imageUrl: OtherImages?.[0]?.url || null,
            selectedDate,
            selectedTime,
            ClinicId
        }
        dispatch(AddingStart())
        console.log(CartItem)
        if(item){
            dispatch(AddingSuccess([CartItem]))
           
        }
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <UpperLayout isBellShow={false} title={data?.test_name} />
            <ScrollView style={styles.scrollContainer}>
                {data?.OtherImages?.length > 0 && (
                    <View style={styles.sliderContainer}>
                        <Product_Slider isNavigation={false} PassHeight={250} images={data.OtherImages} />
                    </View>
                )}
                <View style={styles.productDetails}>
                    <Text style={styles.title}>{data?.test_name}</Text>
                    <Text style={styles.text}>Test For {data?.PetType}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountPrice}>₹{data?.discountPrice}</Text>
                        <Text style={styles.testPrice}>₹{data?.test_price}</Text>
                    </View>
                    <Text style={styles.dateLabel}>📅 Choose Your Suitable Date </Text>
                    <ScrollView horizontal={true} style={styles.scrollDateContainer}>
                        {timeSlots.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dateSlot, selectedDate === item.date && styles.selectedDateSlot]}
                                onPress={() => handleDateSelection(item.date)}
                            >
                                <Text style={[styles.dateText, selectedDate === item.date && styles.selectedText]}>{item.date}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={styles.timeLabel}>⏲️ Choose Your Suitable Time </Text>
                    <ScrollView horizontal={true} style={styles.scrollTimeContainer}>
                        {slots.map((item, index) => (
                            <>
                                {isUltraSound && item.Slot_title === 'ultrasound slot' ? (

                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.timeSlot,
                                            selectedTime === `${item.Slot_start} - ${item.slot_end}` && styles.selectedTimeSlot,
                                        ]}
                                        onPress={() => handleTimeSelection(`${item.Slot_start} - ${item.slot_end}`)}
                                    >
                                        <Text
                                            style={[
                                                styles.timeText,
                                                selectedTime === `${item.Slot_start} - ${item.slot_end}` && styles.selectedText,
                                            ]}
                                        >
                                            I am {formatTime(item.Slot_start)} - {formatTime(item.slot_end)}
                                        </Text>
                                    </TouchableOpacity>
                                ) : item.Slot_title === 'ultrasound slot' ? null : (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.timeSlot,
                                            selectedTime === `${item.Slot_start} - ${item.slot_end}` && styles.selectedTimeSlot,
                                        ]}
                                        onPress={() => handleTimeSelection(`${item.Slot_start} - ${item.slot_end}`)}
                                    >
                                        <Text
                                            style={[
                                                styles.timeText,
                                                selectedTime === `${item.Slot_start} - ${item.slot_end}` && styles.selectedText,
                                            ]}
                                        >
                                     {formatTime(item.Slot_start)} - {formatTime(item.slot_end)}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </>

                        ))}
                    </ScrollView>




                    <Text style={styles.availability}>
                        {data?.TestAvailability ? 'Test Available at Center' : 'Test Not Available'}
                    </Text>
                    <Text style={styles.details}>{data?.Details}</Text>
                </View>

            </ScrollView>
            {isAddToCartVisible && (
                <View style={styles.addToCartButtonContainer}>
                    <TouchableOpacity onPress={() => handleAddtoCart(data)} style={styles.addToCartButton}>
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    sliderContainer: {
        marginBottom: 16,
    },
    productDetails: {
        padding: 8,
        backgroundColor: '#ffffff',
        marginHorizontal: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 7,
    },
    dateLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D32113',
        marginTop: 16,
    },
    timeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D32113',
        marginTop: 16,
    },
    selectedText: {
        color: '#fff'
    },
    dateSlot: {
        backgroundColor: '#fff',
        marginRight: 12,
        marginLeft: 4,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 8,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    selectedDateSlot: {
        backgroundColor: '#B32113',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c23429',
    },
    scrollTimeContainer: {
        marginBottom: 16,
    },
    timeSlot: {
        backgroundColor: '#fff',
        marginRight: 12,
        marginLeft: 4,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 8,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    selectedTimeSlot: {
        backgroundColor: '#B32113',
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c23429',
    },
    addToCartButtonContainer: {
        position: 'absolute',
        bottom: -15.5,

        width: '100%',

        marginTop: 16,
        marginBottom: 16,
    },
    addToCartButton: {
        backgroundColor: '#B32113',
        paddingVertical: 12,
        paddingHorizontal: 20,
    
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceContainer: {
        marginTop: 8,
        flexDirection: 'row',
        gap: 12,
    },
    discountPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B32113',
    },
    testPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        color: '#808080',
    },
    availability: {
        fontSize: 16,
        color: '#111111',

    },
    details: {
        fontSize: 14,
        color: '#111111',

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
