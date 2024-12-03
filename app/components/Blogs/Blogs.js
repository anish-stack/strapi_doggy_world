import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

export default function Blogs() {
    const allData = [
        {
            id: 1,
            title: 'Dog Training With Doggy World ',
            content: 'Learn the best techniques to train your dog effectively.',
            date: '2022-01-01',
            image: 'https://img.freepik.com/free-vector/people-playing-with-their-pets_23-2148528228.jpg?uid=R106200803&ga=GA1.1.1810915285.1729497782&semt=ais_siglip'
        },
        {
            id: 2,
            title: 'Grooming at Home',
            content: 'Essential grooming tips to keep your pet looking great.',
            date: '2022-01-15',
            image: 'https://img.freepik.com/free-vector/flat-grooming-icon-with-women-drying-dog-with-long-fur_1284-63972.jpg?t=st=1730716082~exp=1730719682~hmac=b5ec9753a8979b8be0259d5ce131ebdd266e57b730c1c7d6ca8c20f4c113e89b&w=740'
        },
        {
            id: 3,
            title: 'Why Dogs Bark',
            content: 'Understand the reasons behind your dog’s barking habits.',
            date: '2022-01-20',
            image: 'https://img.freepik.com/free-vector/pavlov-s-dog-experiment-vector_1308-130202.jpg?t=st=1730716124~exp=1730719724~hmac=0ea2ee5f9a0cd69be0350b8e1c141c109076d9bf0150c281adbf99cd26494c35&w=1380'
        },
        {
            id: 4,
            title: 'Pet Nutrition Tips',
            content: 'Discover the best nutritional tips for a healthy pet.',
            date: '2022-02-01',
            image: 'https://img.freepik.com/free-vector/people-feeding-pet-dogs_23-2148528058.jpg?size=338&ext=jpg'
        },
        {
            id: 5,
            title: 'Exercise Routines for Pets',
            content: 'Effective ways to keep your pet active and healthy.',
            date: '2022-02-10',
            image: 'https://img.freepik.com/free-vector/dogs-exercising-dog-park_23-2148528144.jpg?size=338&ext=jpg'
        }
    ];
    const [data, setData] = useState(allData.slice(0, 2));
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const loadMoreData = () => {
        if (data.length < allData.length) {
            setLoading(true);
            setTimeout(() => {
                const nextPage = page + 1;
                const newData = allData.slice(0, nextPage * 2);
                setData(newData);
                setPage(nextPage);
                setLoading(false);
                setIsExpanded(newData.length === allData.length);
            }, 1000);
        }
    };
    const viewLessData = () => {
        setData(allData.slice(0, 2));
        setPage(1);
        setIsExpanded(false);
    };
    const renderBlogItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>#Blogs & Learn With Us</Text>
            <FlatList
                data={data}
                renderItem={renderBlogItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
            />
            {isExpanded ? (
                <TouchableOpacity 
 activeOpacity={0.9}onPress={viewLessData} style={styles.button}>
                    <Text style={styles.buttonText}>View Less</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
 activeOpacity={0.9}onPress={loadMoreData} style={styles.button}>
                    <Text style={styles.buttonText}>Load More</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 15,
        width: width * 0.8,         
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 10,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        height: 150,
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FF7862',
    },
    date: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        padding: 10,
        backgroundColor: '#FF7862',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
