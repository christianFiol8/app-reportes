import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const AddButton = ({ onPress }) => {
  console.log('AddButton - onPress:', onPress);

  const handlePress = () => {
    console.log('Botón + presionado');
    if (onPress) {
      onPress();
    } else {
      console.log('ERROR: onPress no está definido');
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

const styles = {
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default AddButton;