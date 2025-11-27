import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddButton = ({ onPress }) => {
  const handlePress = () => {
    // console.log('Botón + presionado');
    if (onPress) {
      onPress();
    } else {
      // console.log('ERROR: onPress no está definido');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.addButton} 
      onPress={handlePress}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#1e88e5', // Color de acento
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 25, // Ajuste para centrado vertical en React Native
  },
});

export default AddButton;