import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/logo/dogy-world-logo-b.jpg';
import SideBar from './SideBar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Header() {
    const [showSideBar, setShowSideBar] = useState(false)
    const { CartCount } = useSelector((state) => state.cart)
    console.log("count",CartCount)
    const navigation = useNavigation()
    const handleSideBarToggle = () => {
        setShowSideBar(!showSideBar);
    }


    return (
        <>

            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.9} onPress={handleSideBarToggle} style={styles.iconContainer}>
                   <Image source={logo} style={styles.logo} />
                </TouchableOpacity>

                

                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9} onPress={() => navigation.navigate('search')} style={styles.iconContainer}>
                        <Icon name="search" size={24} color="#B32113" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9} style={styles.iconContainer}>
                        <Icon name="bell-o" size={24} color="#B32113" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9} onPress={() => navigation.navigate('cart')} style={styles.iconContainer}>
                        <Icon name="shopping-bag" size={24} color="#B32113" />
                        <Text style={styles.cartCount}>{CartCount || 0}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {showSideBar && (
                <View>
                    <SideBar open={showSideBar} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 3,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
    iconsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    iconContainer: {
        fontWeight: 400,
        marginHorizontal: 10,
        padding: 5,
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

    Weight: {
        fontWeight: 400,
    }
});
