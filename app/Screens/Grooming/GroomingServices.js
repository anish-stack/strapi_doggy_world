import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GroomingServices() {
    const [expandedServiceId, setExpandedServiceId] = useState(null);
    const [viewMore, setViewMore] = useState(false);
    const navigation = useNavigation()
    const services = [
        {
            id: '1',
            type: 'Bath',
            desc: "Give your furry friend the ultimate pampering with a refreshing bath at Doggy World Care! Our gentle, pet-friendly products and expert care ensure a clean, shiny coat, leaving your dog feeling fresh, comfortable, and loved. Treat your pet to a bath that’s as relaxing as it is revitalizing!",
            image: 'https://img.freepik.com/free-photo/washing-pet-dog-home_23-2149627259.jpg?t=st=1731304851~exp=1731308451~hmac=5f1e3abbe5db18d97568f2f5cf6adbe7cdeaf6d47e71286ccbd674c0708d807b&w=1380',
            startPrice: '₹ 500',
            endPrice: '₹ 1,600',
            anyOffer: true,
            offer: "If You Pay Online The compimentry checkup is free",
            PriceVary: false,
        },
        {
            id: '2',
            type: 'Hair Cutting',
            desc: "Keep your pup looking sharp with a professional haircut at Doggy World Care! Our skilled groomers provide gentle, precise trims tailored to your dog’s breed and style, ensuring they leave with a fresh, clean look and a wagging tail. Give your furry friend the confidence boost they deserve with a stylish new cut!",
            image: 'https://img.freepik.com/free-photo/person-cutting-dog-s-fur-via-clipper_176532-10705.jpg?t=st=1731305078~exp=1731308678~hmac=99e16f19f7396b45e94ecda95384e2874dda6cde2dc2b8d5f762d49609eb3d87&w=1380',
            startPrice: '₹ 650',
            endPrice: '₹ 1000',
            anyOffer: false,
            offer: "",
            PriceVary: true,
        },
        {
            id: '3',
            type: 'Bath And Haircut',
            desc: "Treat your dog to the full grooming experience with our Bath and Haircut package at Doggy World Care! Our professional team provides a thorough, gentle bath to leave their coat shiny and clean, followed by a customized haircut to keep them looking their best. Perfect for a fresh, polished look and a happy, pampered pup!",
            image: 'https://img.freepik.com/free-photo/close-up-pet-lifestyle_23-2149180491.jpg?t=st=1731305216~exp=1731308816~hmac=c8633b2e17b41fa5ecf1a4b8f9def9c958c20b308a0f4b732d27bd6af9b75040&w=1380',
            startPrice: '₹ 1,150',
            endPrice: '₹ 2,600',
            anyOffer: true,
            offer: "If You Pay Online The compimentry checkup is free",
            PriceVary: true,
        },
        {
            id: '4',
            type: 'Dry Bath',
            desc: "Keep your pet fresh and clean between grooming sessions with our convenient Dry Bath at Doggy World Care! Our waterless bath service gently cleanses and refreshes your pet’s coat without the hassle of a full bath. Ideal for a quick touch-up, leaving your furry friend looking and smelling great in no time!",
            image: 'https://img.freepik.com/free-photo/washing-pet-dog-home_23-2149627223.jpg?t=st=1731305316~exp=1731308916~hmac=8b4777f4eb8cbd46f86d228378c46a011f2fe78803f66f65f2522e843a0c875a&w=1380',
            startPrice: '₹ 350',
            endPrice: '',
            anyOffer: true,
            offer: "If You Pay Online The compimentry checkup is free",
            PriceVary: false,
        }
    ]


    const handleReadMore = (id) => {
        setExpandedServiceId(expandedServiceId === id ? null : id);
    };

    const handleViewMore = () => {
        setViewMore(!viewMore);
    };

    const renderService = ({ item, index }) => {
        if (!viewMore && index >= 3) return null;

        const isExpanded = expandedServiceId === item.id;
        return (
            <View style={styles.card} key={item.id}>
                <View style={styles.infoContainer}>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={styles.desc} numberOfLines={isExpanded ? 0 : 2}>{item.desc}</Text>
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={() => handleReadMore(item.id)}>
                        <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.price}>Start From {item.startPrice} - {item.endPrice}</Text>
                    {item.PriceVary && (
                        <Text style={styles.note}>(The price will vary by breed to breed)</Text>
                    )}
                    {item.anyOffer && (
                        <Text style={styles.offer}>Offer - {item.offer}</Text>
                    )}
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('clinic', { id: item._id })}  style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <FlatList
                data={services}
                renderItem={renderService}
                keyExtractor={(item) => item.id}
            />
            {services.length > 3 && (
                <View>
                    <View style={styles.containers}>
                        <Text style={styles.text}>
                            <Icon name="angle-double-down" style={styles.icon} size={30} color="#222" />
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('Gromming_More_service',{item:services})} style={styles.buttonContainer}>
                            <Text style={styles.viewMoreText}>View More Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('Create_Custom_Service')} style={styles.buttonContainer} >
                            <Text style={styles.customText}>Create Custom Package</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16

    },
    infoContainer: {
        flex: 1,
        paddingRight: 8,
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B32113',
        marginBottom: 4,
    },
    desc: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    readMore: {
        color: '#B32113',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
    },
    note: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    bookButton: {
        backgroundColor: '#B32113',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    viewMoreButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    viewMoreText: {
        color: '#fff',
        fontSize: 16,
    },
    offer: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'start',
        marginVertical: 10,

    },
    containers: {

        alignItems: 'center',
    },
    text: {
        textAlign: 'center',

    },

    viewMoreText: {
        fontSize: 10,
        textAlign: 'center',
        marginVertical: 12,
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 25,
        color: '#ffffff',
        textTransform: 'uppercase',

    },
    customText: {
        fontSize: 10,
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 12,
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 25,

        textTransform: 'uppercase',

    },
    box: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    buttonContainer: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#B32113',
        gap: 0,


        margin: 2
    }


});

