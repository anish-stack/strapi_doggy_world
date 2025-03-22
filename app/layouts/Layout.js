import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Tabs from './Tabs';
import Popup from '../components/PopUp/Popup';
import { useToken } from '../hooks/useToken';

export default function Layout({ children ,isHeaderShow=true }) {
    const navigation = useNavigation();
    const { isLoggedIn, getToken } = useToken();

    // Check token when route changes
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getToken();
        });

        return () => {
            unsubscribe(); // Cleanup on unmount
        };
    }, [navigation]);

    // Periodically check token every 30 seconds (optimized)
    useEffect(() => {
        const interval = setInterval(() => {
            getToken();
        }, 5000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (

            <View style={styles.container}>
                {isHeaderShow && (
                    <Header />
                )}
        
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.childContainer}
                >
                    {children}
                </ScrollView>
                <Tabs />
                {!isLoggedIn && <Popup navigation={navigation} />}
            </View>
            
       
           
  
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    childContainer: {
      
        alignItems: 'center',
    },
});
