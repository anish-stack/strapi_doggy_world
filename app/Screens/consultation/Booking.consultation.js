import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, FlatList, Animated, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpperLayout from '../../layouts/UpperLayout';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function BookingConsultation() {
    const routes = useRoute();
    const { type } = routes.params;
    const navigation = useNavigation();
    
    const Doctors = [
        {
            id: 1,
            name: 'Best Available Doctor',
            image: 'https://i.ibb.co/drbmVP4/images.jpg'
        },
        {
            id: 2,
            name: 'Dr. S.K.Pandey',
            degree: 'B.V.Sc. & A.H., M.V.Sc.',
            specialization: '(Dermatology, Nephrology)',
            image: 'https://doggyworld.apnipaathshaala.in/assets/images/team/dr-sk-pandey.webp'
        },
        {
            id: 3,
            name: 'Dr. Aradhana Pandey',
            degree: 'B.V.Sc. & A.H., M.V.Sc.',
            specialization: '(Surgery & Radiology)',
            image: 'https://doggyworld.apnipaathshaala.in/assets/images/team/dr-aradhana-pandey.webp'
        }
    ];

    const [selectedDoctor, setSelectedDoctor] = useState(Doctors[0]);
    const [availableDates, setAvailableDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        genreateDaysAndTime(selectedDoctor.id);
    }, [selectedDoctor]);

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setSelectedDate(null); 
        setSelectedTime(null); 

        Animated.spring(scaleAnim, {
            toValue: 1.1,
            useNativeDriver: true,
        }).start(() => {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        });
    };

    const genreateDaysAndTime = (doctorId) => {
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
        if (doctorId === 1) {
            slots = [
                { label: '10:00 - 10:30 AM', period: 'Morning' },
                { label: '10:30 - 11:00 AM', period: 'Morning' },
                { label: '11:00 - 11:30 AM', period: 'Morning' },
                { label: '11:30 - 12:00 AM', period: 'Morning' },

                { label: '12:00 - 12:30 PM', period: 'Afternoon' },
                { label: '12:30 - 1:00 PM', period: 'Afternoon' },
                { label: '1:00 - 1:30 PM', period: 'Afternoon' },
                { label: '1:30 - 2:00 PM', period: 'Afternoon' },
                { label: '2:00 - 3:00 PM', period: 'Afternoon' },
                { label: '3:00 - 4:00 PM', period: 'Afternoon' },
                { label: '4:00 - 5:30 PM', period: 'Afternoon' },

                { label: '5:00 PM - 5:30 PM', period: 'Evening' },
                { label: '5:30 PM - 6:00 PM', period: 'Evening' },
                { label: '6:00 PM - 6:30 PM', period: 'Evening' },
                { label: '6:30 PM - 7:00 PM', period: 'Evening' },
                { label: '7:00 PM - 7:30 PM', period: 'Evening' },
                { label: '7:30 PM - 8:00 PM', period: 'Evening' },
            ];
        } else if (doctorId === 2) {
            slots = [
                { label: '10:00 - 12:00 AM', period: 'Morning' },
                { label: '12:00 - 2:00 PM', period: 'Afternoon' },
                { label: '2:00 - 4:00 PM', period: 'Afternoon' },

                { label: '5:00 - 7:00 PM', period: 'Evening' },
            ];
        } else if (doctorId === 3) {
            slots = [
                { label: '10:00 - 12:00 AM', period: 'Morning' },
                { label: '12:00 - 2:00 PM', period: 'Afternoon' },
                { label: '2:00 - 4:00 PM', period: 'Afternoon' },
                { label: '5:30 - 6:30 PM', period: 'Evening' },
                { label: '6:30 - 8:00 PM', period: 'Evening' },
            ];
        }
        setTimeSlots(slots);
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
    };

    const handleSelectTime = (time) => {
        console.log(time)
        // isSlotDisabled(time)
        setSelectedTime(time);
    };

    const handleBook = (doctor, date, time, period) => {
        navigation.navigate('thankyou', { doctor, date, time, period });
    };


    

    return (
        <ScrollView style={styles.container}>
            <UpperLayout title={type} />
            <Text style={styles.headingText}>Choose Available Doctor</Text>
            <FlatList
                horizontal
                data={Doctors}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.doctorContainer}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={() => handleSelectDoctor(item)} style={styles.touchableDoctor}>
                        <Animated.View
                            style={[
                                styles.doctorItem,
                                selectedDoctor?.id === item.id && styles.selectedDoctor,
                                { transform: [{ scale: selectedDoctor?.id === item.id ? scaleAnim : 1 }] },
                            ]}
                        >
                            <Image source={{ uri: item.image }} style={styles.imageStyle} />
                            <Text style={styles.doctorName}>{item.name}</Text>
                            {item.specialization && (
                                <View>
                                    <Text style={styles.doctorDegree}>{item.degree}</Text>
                                    <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
                                </View>
                            )}
                        </Animated.View>
                    </TouchableOpacity>
                )}
            />

            <ScrollView style={styles.dateTimeContainer}>
                <Text style={styles.sectionTitle}>Select Date and Time</Text>

                <View style={styles.dateRow}>
                    {availableDates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSelectDate(date)}
                            style={[styles.dateItem, selectedDate?.date === date.date && styles.selectedDate]}
                        >
                            <Text style={styles.dateText}>
                                {date.day} {date.date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {timeSlots.length > 0 && (
                    <View style={styles.timeContainer}>
                        {['Morning', 'Afternoon', 'Evening'].map((period) => (
                            <View key={period}>
                                <Text style={styles.timeSection}>{period}</Text>
                                <View style={styles.timeRow}>
                                    {timeSlots
                                        .filter((slot) => slot.period === period)
                                        .map((slot, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleSelectTime(slot)}
                                                style={[
                                                    styles.timeSlot,
                                                    selectedTime?.label === slot.label && styles.selectedTime // Apply selectedTime style if selected
                                                ]}
                      
                                            >
                                                <Text style={styles.timeText}>{slot.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.bookButton}
                disabled={!selectedTime || !selectedDate}
                onPress={() => handleBook(selectedDoctor, selectedDate.date, selectedTime.label, selectedTime.period)}
            >
                <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'start',
    },
    doctorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        // height: 350,
        marginBottom: 30,
        paddingVertical: 10,
    },
    touchableDoctor: {
        height: 180,

        marginHorizontal: 10,
    },
    doctorItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
     
    },
    selectedDoctor: {
        borderWidth: 2,
        borderColor: '#B32113',
    },
    imageStyle: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    doctorName: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    doctorDegree: {
        color: '#6c757d',
    },
    doctorSpecialization: {
        color: '#6c757d',
    },
    dateTimeContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 30,

    },
    dateRow: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    dateItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        alignItems: 'center',
    },
    selectedDate: {
        borderColor: '#B32113',
        borderWidth: 2,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeContainer: {
      flexWrap:'wrap',
       
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        textTransform: 'uppercase',
    },

    timeSection: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    timeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timeSlot: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedTime: {
        borderColor: '#B32113',
        borderWidth: 2,
    },
    timeText: {
        fontSize: 15,
    },
    bookButton: {
        backgroundColor: '#B32113',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
