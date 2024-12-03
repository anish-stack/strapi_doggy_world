import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideBar from './SideBar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function UpperLayout({ title, isBellShow = true }) {
    const [showSideBar, setShowSideBar] = useState(false)
    const { CartCount } = useSelector((state) => state.cart)
    console.log("count",CartCount)
    const navigation = useNavigation()
    const handleSideBarToggle = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <SafeAreaView>

            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.9} onPress={() => navigation.goBack()} style={styles.iconContainers}>
                        <Icon name="arrow-left" style={styles.Weight} size={20} color="#000" />
                        <Text style={styles.titleText}>{title || "Enter Your Title"}</Text>
                    </TouchableOpacity>




                    <View style={styles.iconsContainer}>
                        <TouchableOpacity
                            activeOpacity={0.9} onPress={() => navigation.navigate('search')} style={styles.iconContainer}>
                            <Icon name="search" size={24} color="#AA0000" />
                        </TouchableOpacity>
                        {isBellShow && (

                            <TouchableOpacity
                                activeOpacity={0.9} style={styles.iconContainer}>
                                <Icon name="bell-o" size={24} color="#AA0000" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            activeOpacity={0.9} onPress={() => navigation.navigate('cart')} style={styles.iconContainer}>
                            <Icon name="shopping-bag" size={24} color="#AA0000" />
                            <Text style={styles.cartCount}>{CartCount || 0}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {showSideBar && (
                    <View>
                        <SideBar open={showSideBar} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 3,
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',

    },
    iconsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    iconContainer: {
        display: 'flex',
        fontWeight: 400,
        marginHorizontal: 10,
        padding: 5,
    },
    iconContainers: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 10,
        borderRadius: 8,
        // marginHorizontal: 15,

    },
    cartCount: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#FF4500',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        minWidth: 18,
        textAlign: 'center',
        lineHeight: 20,
    },

    titleText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
});
