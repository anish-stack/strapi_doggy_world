import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import axios from 'axios';
import Card from '../card/Card';

const { width } = Dimensions.get('window');

export default function Categories() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.3:1337/api/main-categories?populate=*');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const memoizedData = useMemo(() => {
        if (!data) return [];
        return data
            .filter((item) => item.position !== undefined)
            .sort((a, b) => a.position - b.position);
    }, [data]);
    
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#B3213" />
                <Text style={styles.loadingText}>Loading Categories...</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            {/* <ImageBackground 
                source={require('./paw-prints.png')} 
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImageStyle}
            > */}
                <View style={styles.cardsContainer}>
                    {memoizedData && memoizedData.length > 0 ? (
                        memoizedData.map((item, index) => (
                            <View style={styles.cardWrapper} key={index}>
                                <Card data={item} />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No Categories Available</Text>
                    )}
                </View>
            {/* </ImageBackground> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 'auto',
        backgroundColor: '#f9f9f9',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 14,
    },
    loadingText: {
        marginTop: 10,
        color: '#555',
        fontSize: 16,
    },
    backgroundImage: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    backgroundImageStyle: {
        opacity: 0.1,  // Make the background image semi-transparent
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        zIndex: 2,
    },
    cardWrapper: {
        width: width * 0.3,
        marginBottom: 15,
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 12,
    },
});