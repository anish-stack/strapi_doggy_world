import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import servicesData from './custom.json';

const HEADER_HEIGHT = 120;

export default function CustomPackage() {
  const [selectedBath, setSelectedBath] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedAdditional, setSelectedAdditional] = useState([]);

  const handleBathSelection = (bathId) => {
    setSelectedBath(bathId);
  };

  const handleHaircutSelection = (haircutId) => {
    setSelectedHaircut(haircutId);
  };

  const handleAdditionalSelection = (serviceId) => {
    setSelectedAdditional(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const calculatePriceRange = () => {
    let minTotal = 0;
    let maxTotal = 0;

    if (selectedBath) {
      const bathService = servicesData[0].SubItems.find(item => item.SubId === selectedBath);
      const [min, max] = bathService.price.replace('₹', '').split('-').map(p => parseInt(p.replace(/\D/g, '')));
      minTotal += min;
      maxTotal += max || min;
    }

    if (selectedHaircut) {
      const haircutService = servicesData[1].SubItems.find(item => item.id === selectedHaircut);
      const [min, max] = haircutService.price.replace('₹', '').split('-').map(p => parseInt(p.replace(/\D/g, '')));
      minTotal += min;
      maxTotal += max || min;
    }

    selectedAdditional.forEach(id => {
      const additionalService = servicesData[2].SubItems.find(item => item.id === id);
      const [min, max] = additionalService.price.replace('₹', '').split('-').map(p => parseInt(p.replace(/\D/g, '')));
      minTotal += min;
      maxTotal += max || min;
    });

    return `₹${minTotal} - ₹${maxTotal}`;
  };

  const renderServiceCard = (item, isSelected, onSelect, included = false) => {
    const priceRange = item.price.includes('-')
      ? item.price
      : `${item.price}`;

    return (
      <View
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          included && styles.includedCard
        ]}
      >
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => !included && onSelect()}
          disabled={included}
        >
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, isSelected && styles.selectedText]}>
                {item.SubTitle}
              </Text>
              <Text style={[styles.price, isSelected && styles.selectedText]}>
                {priceRange}
                <Text style={styles.priceNote}> (varies by pet size)</Text>
              </Text>
            </View>
            <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
              {isSelected && <Ionicons name="checkmark" size={20} color="#fff" />}
            </View>
          </View>

          {item.including && (
            <View style={styles.includesContainer}>
              {item.including.map((inc, index) => (
                <View key={index} style={styles.includeItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#B32113" />
                  <Text style={styles.includeText}>{inc}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#B32113', '#8B1A0F']}
        style={styles.header}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000' }}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Customize Package</Text>
          <Text style={styles.headerSubtitle}>Select services for your furry friend</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Bath Service</Text>
          <Text style={styles.sectionSubtitle}>Start by selecting the perfect bath for your pet</Text>
          {servicesData[0].SubItems.map(item => renderServiceCard(
            item,
            selectedBath === item.SubId,
            () => handleBathSelection(item.SubId)
          ))}
        </View>

        {selectedBath && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Haircut</Text>
            <Text style={styles.sectionSubtitle}>Choose a style that suits your pet</Text>
            {servicesData[1].SubItems.map(item => renderServiceCard(
              item,
              selectedHaircut === item.id,
              () => handleHaircutSelection(item.id)
            ))}
          </View>
        )}

        {selectedBath && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            <Text style={styles.sectionSubtitle}>Enhance your pet's grooming experience</Text>
            {servicesData[2].SubItems.map(item => renderServiceCard(
              item,
              selectedAdditional.includes(item.id),
              () => handleAdditionalSelection(item.id),
              selectedBath && servicesData[0].SubItems.find(
                bath => bath.SubId === selectedBath
              )?.including?.includes(item.SubTitle)
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.priceBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Estimated Total</Text>
          <Text style={styles.priceValue}>{calculatePriceRange()}</Text>
          <Text style={styles.priceNote}>*Final price may vary based on pet size and condition</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedBath) && styles.continueButtonDisabled
          ]}
          disabled={!selectedBath}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_HEIGHT,
    opacity: 0.4,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  selectedCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#B32113',
    borderWidth: 2,
  },
  includedCard: {
    opacity: 0.7,
    backgroundColor: '#f8f9fa',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#B32113',
    fontWeight: '600',
  },
  priceNote: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
  },
  selectedText: {
    color: '#B32113',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B32113',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#B32113',
  },
  includesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  priceBar: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B32113',
  },
  continueButton: {
    backgroundColor: '#B32113',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  }
});