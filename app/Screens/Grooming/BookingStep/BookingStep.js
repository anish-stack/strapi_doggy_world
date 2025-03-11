import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import UpperLayout from '../../../layouts/UpperLayout';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const generateDates = () => {
    const currentDate = new Date();
    const dates = [];
    for (let i = 0; i < 4; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + i);
        dates.push(newDate);
    }

    return dates;
};

const timeSlots = [
    { start: '10:00 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '12:00 PM' },
    { start: '12:00 PM', end: '01:00 PM' },
    { start: '01:00 PM', end: '02:00 PM' },
    { start: '02:00 PM', end: '03:00 PM' },
    { start: '03:00 PM', end: '04:00 PM' },
    { start: '04:00 PM', end: '05:00 PM' },
    { start: '05:00 PM', end: '06:00 PM' },
    { start: '06:00 PM', end: '07:00 PM' },
    { start: '07:00 PM', end: '08:00 PM' },
];

export default function BookingStep() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigataion = useNavigation()

    const dates = generateDates();

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset time selection when date is changed
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    const handleBooking = () => {
        alert(`Booked for ${selectedDate.toDateString()} at ${selectedTime.start} - ${selectedTime.end}`);
        navigataion.navigate('thankyou')
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
            <UpperLayout isBellShow={false} title={'Choose a Date and Time'} />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.instructionText}>Select the Date you want the grooming service for:</Text>

                {/* Displaying available dates */}
                <View style={styles.dateContainer}>
                    {dates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dateButton, selectedDate?.getDate() === date.getDate() ? styles.selectedDate : {}]}
                            onPress={() => handleDateSelection(date)}
                        >
                            <Text style={[styles.dateText, selectedDate?.getDate() === date.getDate() ? styles.selectedDateText : {}]}>{date.toDateString()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* If a date is selected, show the time slots */}
                {selectedDate && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeInstructionText}>Select a time slot:</Text>
                        <FlatList
                            key={selectedDate?.toDateString()} // Dynamically change key to trigger re-render
                            data={timeSlots}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.timeButton, selectedTime?.start === item.start ? styles.selectedTime : {}]}
                                    onPress={() => handleTimeSelection(item)}
                                >
                                    <Text style={[styles.timeText, selectedTime?.start === item.start ? styles.SelectedtimeText : {}]}>{item.start} - {item.end}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                        />
                    </View>
                )}


                {selectedDate && selectedTime && (
                    <TouchableOpacity 
 activeOpacity={0.9}style={styles.bookNowButton} onPress={handleBooking}>
                        <Text style={styles.bookNowText}>Book Now</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    instructionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    dateButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 25,
        margin: 5,
        borderRadius: 12,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    selectedDate: {
        backgroundColor: '#B32113',
        shadowOpacity: 0.2,
        color: '#fff'
    },
    selectedDateText: {
        color: '#fff'
    },
    dateText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },

    timeInstructionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    timeButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        margin: 10,
        borderRadius: 12,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    selectedTime: {
        backgroundColor: '#B32113',
        shadowOpacity: 0.2,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
    SelectedtimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
    },
    bookNowButton: {
        backgroundColor: '#B32113',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 12,
        marginTop: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    bookNowText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
