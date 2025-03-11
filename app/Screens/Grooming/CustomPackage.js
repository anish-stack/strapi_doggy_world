import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import UpperLayout from '../../layouts/UpperLayout'
import data from './custom.json'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function CustomPackage() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleCheckbox = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  return (
    <SafeAreaView style={{flex:1 , paddingBottom:40}}>
      <View style={styles.container}>
      <UpperLayout title={"Customized Package"} />
      <ScrollView style={styles.scrollContainer}>
        {data.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.SubItems.map((subItem) => (
              <View key={subItem.SubId || subItem.id} style={styles.subItemContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, selectedItems.includes(subItem.SubId || subItem.id) && styles.checkboxChecked]}
                  onPress={() => toggleCheckbox(subItem.SubId || subItem.id)}
                >
                  <Text style={styles.checkboxText}>
                    {selectedItems.includes(subItem.SubId || subItem.id) ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
                <View style={styles.subItemDetails}>
                  <Text style={styles.subItemTitle}>{subItem.SubTitle}</Text>
                  {subItem.price && <Text style={styles.subItemPrice}>{subItem.price}</Text>}
                  {subItem.including && (
                    <Text style={styles.includingText}>
                      Includes: {subItem.including.join(', ')}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingBottom:80,
    backgroundColor: '#fff',
  },

  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {

    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B32113',
  },
  subItemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderColor: '#ded7d7',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'start',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#B32113',
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {

    backgroundColor: '#b32113',
    borderColor: '#b32113',
  },
  checkboxText: {
    color: '#fff',

    fontSize: 14,
  },
  subItemDetails: {
    flex: 1,
  },
  subItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  subItemPrice: {
    fontSize: 16,
    color: '#4377a2',
  },
  includingText: {
    fontSize: 14,
    color: '#111',
    marginTop: 5,
  },
});
