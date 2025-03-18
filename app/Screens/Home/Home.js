import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import Slider from '../../components/Slider/Slider';
import LocationTab from '../../layouts/locationTab';
import Categories from '../../components/Categories/Categories';
import Doctors from '../Doctors/Doctors';
import * as Location from 'expo-location'; // ✅ Un-commented import
import axios from 'axios';
import Blogs from '../../components/Blogs/Blogs';
import Made from '../../components/love/Made';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [locData, setLocData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
            try {
                const userLocation = await Location.getCurrentPositionAsync({});
                setLocation(userLocation); // ✅ Set location state
            } catch (error) {
                setErrorMsg('Error getting location: ' + error.message);
            }
        }
    };

    const fetchCurrentLocation = async (latitude, longitude) => {
        try {
            const { data } = await axios.post('https://api.srtutorsbureau.com/Fetch-Current-Location', {
                lat: latitude,
                lng: longitude
            });
            console.log("Fetched Data:", data.data.address);
            setLocData(data.data);
        } catch (error) {
            console.log(error?.response || error);
        }
    };

    useEffect(() => {
        getLocation(); 
    }, []);

    useEffect(() => {
        if (location?.coords?.latitude && location?.coords?.longitude) {
            fetchCurrentLocation(location.coords.latitude, location.coords.longitude);
        }
    }, [location]);

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Location Error', errorMsg); // ✅ Show alert on error
        }
    }, [errorMsg]);

    return (
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <View>
                    <LocationTab data={locData} />
                    <Slider />
                    <Categories />
                    <Doctors />
                    <Blogs />
                    <Made />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 0,
        marginBottom: 20,
    },
});
