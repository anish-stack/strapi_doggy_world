import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Animated, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_END_POINT_URL } from '../../constant/constant';
import { useToken } from '../../hooks/useToken';
import { getUser } from '../../hooks/getUserHook';

const { width } = Dimensions.get('window');

const Toast = ({ message, type }) => (
    <Animated.View
        entering={Animated.FadeInUp}
        style={[styles.toast, type === 'error' ? styles.errorToast : styles.successToast]}
    >
        {/* {type === 'error' ? (
      <AlertCircle size={20} color="#fff" />
    ) : (
      <CheckCircle2 size={20} color="#fff" />
    )} */}
        <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
);

export default function BookingConsultation() {
    const router = useRoute();
    const { type, id } = router.params || {}
    const navigation = useNavigation();
    const { token, isLoggedIn } = useToken()
    const { user } = getUser()
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [bookingInProgress, setBookingInProgress] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_END_POINT_URL}/api/doctors?populate=*`);
            setDoctors(data.data);
            if (data.data.length > 0) {
                setSelectedDoctor(data.data[0]);
            }
        } catch (err) {
            setError('Failed to load doctors. Please try again.');
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDoctor) {
            generateDaysAndTime(selectedDoctor.id);
        }
    }, [selectedDoctor]);

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setSelectedTime(null);

        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1.1,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            })
        ]).start();
    };

    const generateDaysAndTime = (doctorId) => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                fullDate: date
            });
        }
        setAvailableDates(days);

        let slots = [];
        if (doctorId === 2) {
            slots = [
                { label: '10:00 - 10:30 AM', period: 'Morning' },
                { label: '10:30 - 11:00 AM', period: 'Morning' },
                { label: '11:00 - 11:30 AM', period: 'Morning' },
                { label: '11:30 - 12:00 PM', period: 'Morning' },
                { label: '2:00 - 2:30 PM', period: 'Afternoon' },
                { label: '2:30 - 3:00 PM', period: 'Afternoon' },
                { label: '3:00 - 3:30 PM', period: 'Afternoon' },
                { label: '5:00 - 5:30 PM', period: 'Evening' },
                { label: '5:30 - 6:00 PM', period: 'Evening' },
                { label: '6:00 - 6:30 PM', period: 'Evening' },
            ];
        } else if (doctorId === 4) {
            slots = [
                { label: '10:00 - 12:00 PM', period: 'Morning' },
                { label: '2:00 - 4:00 PM', period: 'Afternoon' },
                { label: '5:00 - 7:00 PM', period: 'Evening' },
            ];
        } else if (doctorId === 6) {
            slots = [
                { label: '11:00 - 1:00 PM', period: 'Morning' },
                { label: '2:30 - 4:30 PM', period: 'Afternoon' },
                { label: '5:30 - 7:30 PM', period: 'Evening' },
            ];
        }
        setTimeSlots(slots);
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleSelectTime = (time, period) => {
        setSelectedTime(time);
        setSelectedPeriod(period);
    };

    const handleBook = async () => {
        if (!isLoggedIn) {
            Alert.alert('Please Login for make any appointments')
            navigation.navigate('login')
            return
        }
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            setError('Please select all booking details');
            setTimeout(() => setError(null), 3000);
            return;
        }
        const data = {
            type: type,
            id: id,
            user: user,
            doctorId: selectedDoctor.documentId,
            period: selectedPeriod,
            date: selectedDate.fullDate,
            time: selectedTime.label
        }

        try {
            setBookingInProgress(true);
            const response = await axios.post(`${API_END_POINT_URL}/api/create-consultation-bboking`, data)
            const { status } = response.data
            if (status === 201) {
                setSuccess('Appointment booked successfully!');
                navigation.navigate('thankyou')

            }

            setTimeout(() => {
                setSelectedTime(null);
                setSuccess(null);
            }, 3000);
        } catch (err) {
            setError('Failed to book appointment. Please try again.');
            setTimeout(() => setError(null), 3000);
        } finally {
            setBookingInProgress(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff4d4d" />
                <Text style={styles.loadingText}>Loading available doctors...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {error && <Toast message={error} type="error" />}
                {success && <Toast message={success} type="success" />}

                <View style={styles.mainContent}>
                    <View style={styles.headerSection}>
                        <Text style={styles.headingText}>Book Consultation</Text>
                        <Text style={styles.subHeadingText}>Choose your preferred doctor and time</Text>
                    </View>

                    <View style={styles.doctorGrid}>
                        {doctors.map((doctor) => (
                            <TouchableOpacity
                                key={doctor.id}
                                onPress={() => handleSelectDoctor(doctor)}
                                style={styles.doctorCardWrapper}
                            >
                                <Animated.View style={[
                                    styles.doctorCard,
                                    selectedDoctor?.id === doctor.id && styles.selectedDoctorCard,
                                    { transform: [{ scale: selectedDoctor?.id === doctor.id ? scaleAnim : 1 }] }
                                ]}>
                                    <Image
                                        source={{ uri: doctor.image.url }}
                                        style={styles.doctorImage}
                                    />
                                    <View style={styles.doctorInfo}>
                                        <Text style={styles.doctorName}>{doctor.name}</Text>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.discountPrice}>₹{doctor.discount_price}</Text>
                                            <Text style={styles.originalPrice}>₹{doctor.price}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.dateTimeSection}>
                        <View style={styles.sectionHeader}>
                            {/* <Calendar size={20} color="#333" /> */}
                            <Text style={styles.sectionTitle}>Select Date</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
                            {availableDates.map((date, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSelectDate(date)}
                                    style={[
                                        styles.dateCard,
                                        selectedDate?.date === date.date && styles.selectedDateCard
                                    ]}
                                >
                                    <Text style={[
                                        styles.dateDay,
                                        selectedDate?.date === date.date && styles.selectedDateText
                                    ]}>
                                        {date.day}
                                    </Text>
                                    <Text style={[
                                        styles.dateNumber,
                                        selectedDate?.date === date.date && styles.selectedDateText
                                    ]}>
                                        {date.date}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {timeSlots.length > 0 && (
                            <View style={styles.timeSection}>
                                <View style={styles.sectionHeader}>
                                    {/* <Clock size={20} color="#333" /> */}
                                    <Text style={styles.sectionTitle}>Available Time Slots</Text>
                                </View>
                                {['Morning', 'Afternoon', 'Evening'].map((period) => {
                                    const periodSlots = timeSlots.filter(slot => slot.period === period);
                                    if (periodSlots.length === 0) return null;

                                    return (
                                        <View key={period} style={styles.periodSection}>
                                            <Text style={styles.periodTitle}>{period}</Text>
                                            <View style={styles.timeGrid}>
                                                {periodSlots.map((slot, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => handleSelectTime(slot, period)}
                                                        style={[
                                                            styles.timeSlot,
                                                            selectedTime?.label === slot.label && styles.selectedTimeSlot
                                                        ]}
                                                    >
                                                        <Text style={[
                                                            styles.timeText,
                                                            selectedTime?.label === slot.label && styles.selectedTimeText
                                                        ]}>
                                                            {slot.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[
                        styles.bookButton,
                        (!selectedTime || !selectedDate || bookingInProgress) && styles.bookButtonDisabled
                    ]}
                    disabled={!selectedTime || !selectedDate || bookingInProgress}
                    onPress={handleBook}
                >
                    {bookingInProgress ? (
                        <ActivityIndicator color="#fff" />
                    ) : isLoggedIn ? (
                        <Text style={styles.bookButtonText}>
                            Book Appointment • ₹{selectedDoctor?.discount_price}
                        </Text>
                    ) : (
                        <Text style={styles.bookButtonText}>
                            Login For Booking
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    errorToast: {
        backgroundColor: '#ff4d4d',
    },
    successToast: {
        backgroundColor: '#00c853',
    },
    toastText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    mainContent: {
        padding: 16,
    },
    headerSection: {
        marginBottom: 24,
    },
    headingText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    subHeadingText: {
        fontSize: 16,
        color: '#666',
    },
    doctorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    doctorCardWrapper: {
        width: (width - 48) / 3,
        marginBottom: 16,
    },
    doctorCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        alignItems: 'center',
    },
    selectedDoctorCard: {
        backgroundColor: '#fff0f0',
        borderColor: '#ff4d4d',
        borderWidth: 2,
    },
    doctorImage: {
        width: 54,
        height: 54,
        borderRadius: 32,
        marginBottom: 12,
    },
    doctorInfo: {
        alignItems: 'center',
    },
    doctorName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    discountPrice: {
        fontSize: 14,
        color: '#ff4d4d',
        fontWeight: '600',
    },
    originalPrice: {
        fontSize: 10,
        color: '#666',
        textDecorationLine: 'line-through',
    },
    dateTimeSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    dateContainer: {
        marginBottom: 24,
    },
    dateCard: {
        marginRight: 12,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 80,
    },
    selectedDateCard: {
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
    },
    dateDay: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    dateNumber: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    selectedDateText: {
        color: '#fff',
    },
    timeSection: {
        marginTop: 8,
    },
    periodSection: {
        marginBottom: 20,
    },
    periodTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
        backgroundColor: '#f8f9fa',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    timeSlot: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        minWidth: (width - 80) / 2,
    },
    selectedTimeSlot: {
        backgroundColor: '#ff4d4d',
    },
    timeText: {
        fontSize: 14,
        color: '#1a1a1a',
    },
    selectedTimeText: {
        color: '#fff',
        fontWeight: '500',
    },
    bottomBar: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bookButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    bookButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});