import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import Slider from '../../components/Slider/Slider';
import LocationTab from '../../layouts/locationTab';
import Categories from '../../components/Categories/Categories';
import Doctors from '../Doctors/Doctors';
// import * as Location from 'expo-location';
import axios from 'axios';
import Blogs from '../../components/Blogs/Blogs';
import Made from '../../components/love/Made';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [locData, setLocData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // const requestLocationPermission = async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return false;
    //     }
    //     return true;
    // };

    // const getLocation = async () => {
    //     const hasPermission = await requestLocationPermission();
    //     if (hasPermission) {
    //         try {
    //             const userLocation = await Location.getCurrentPositionAsync({});
    //             setLocation(userLocation); // Set location state
    //         } catch (error) {
    //             setErrorMsg('Error getting location: ' + error.message);
    //         }
    //     }
    // };

    // const fetchCurrentLocation = async (latitude, longitude) => {
    //     try {
    //         const { data } = await axios.post('https://api.srtutorsbureau.com/Fetch-Current-Location', {
    //             lat: latitude,
    //             lng: longitude
    //         });
    //         setLocData(data.data); // Store API response data
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // };

    // useEffect(() => {
    //     getLocation(); // Get the user's location
    // }, []); // Runs only once when component mounts

    // useEffect(() => {
    //     if (location) {
    //         // Ensure latitude and longitude are available
    //         fetchCurrentLocation(location.coords.latitude, location.coords.longitude);
    //     }
    // }, [location]); // Runs when location is updated

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <LocationTab data={locData} />
                    <Slider />
                    <Categories />
                    <Doctors />
                    <Blogs/>
                    <Made/>
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    scrollView: {
       padding: 0,
       marginBottom:20
    },
});
