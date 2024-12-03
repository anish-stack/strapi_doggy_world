import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DynmaicSlider from '../Services/Bakery/Dynamic_Screen/DynamicSlider';
import { TouchableOpacity } from 'react-native';
import AllProducts from './AllProducts';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window')
export default function PetShop() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [slider, setSlider] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://admindoggy.adsdigitalmedia.com/api/petshops?populate=*');
                const fetchSliderData = await axios.get('https://admindoggy.adsdigitalmedia.com/api/bakery-sliders?populate=*');

                const fetchedData = res.data.data;
                const fetchSlider = fetchSliderData.data.data;



                const filteredSliderData = fetchSlider.filter((item) =>
                    item.isPetShop?.Title === 'Pet Shop'
                );
                const filterFetchData = fetchedData.filter((item) =>
                    item.Title !== 'Pet Shop'
                );

                console.log(filterFetchData.length)
                setSlider(filteredSliderData);
                setData(filterFetchData);
            } catch (err) {
                console.error(err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;

    const images = slider.flatMap((item) => item.images).map((images) => images.url)
    const imagesSent = [{ id: 1, src: images }];

    return (
        <ScrollView>

            <View>

                <DynmaicSlider navigationShow={true} heightPass={200} mode={'cover'} autoPlay={true} Dealy={3000} isUri={true} imagesByProp={imagesSent} />

                <Text style={styles.heading}>Shop By <Text style={styles.headingTwo}>Categories</Text></Text>
                <View style={styles.pet_shop_container}>
                    {data && data.length > 0 ? (
                        data
                            .sort((a, b) => a.postion - b.postion)
                            .map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9} onPress={() => navigation.navigate('Dynamic_Shop', { id: item.documentId, title: item.Title })} style={styles.pet_shop} key={index}>
                                    <Image
                                        source={{ uri: item?.Image?.url }}
                                        style={styles.pet_shop_image}
                                    />
                                    <Text style={styles.pet_shop_title}>
                                        {item.Title}
                                    </Text>
                                </TouchableOpacity>
                            ))
                    ) : (
                        <Text>No items available</Text>
                    )}
                </View>


            </View>
            <Text style={styles.heading}>Bakery <Text style={styles.headingTwo}>Products</Text></Text>

            <AllProducts />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
    headingTwo: {
        fontSize: 22,
        color: '#B32113',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
    pet_shop_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    pet_shop: {
        width: width / 3.5,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(217, 52, 37,0.6)',
        padding: 5,
        borderRadius: 5,

    },
    pet_shop_title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#fff',
    },
    pet_shop_image: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
    },
})