import { View, Text, StyleSheet, Alert, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../layouts/Layout';
import Slider from '../../components/Slider/Slider';
import LocationTab from '../../layouts/locationTab';
import Categories from '../../components/Categories/Categories';
import Doctors from '../Doctors/Doctors';
import * as Location from 'expo-location';
import axios from 'axios';
import Blogs from '../../components/Blogs/Blogs';
import Made from '../../components/love/Made';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [locData, setLocData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

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
                setLocation(userLocation);
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
            Alert.alert('Location Error', errorMsg);
        }
    }, [errorMsg]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getLocation(); 
        setRefreshing(false);
    }, []);

    return (
        <Layout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
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
