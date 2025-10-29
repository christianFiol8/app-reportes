import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ActionButton = ({ likes, comments, shares }) => {
  const Button = ({ label, isActive }) => (
    <TouchableOpacity style={styles.actionButton}>
      <Text style={[styles.buttonIcon, isActive && styles.activeButton]}>
        {isActive ? '[x]' : '[ ]'}
      </Text>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.actionButtonsContainer}>
      <Button label="Me gusta" isActive={likes} />
      <Button label="Comentar" isActive={comments} />
      <Button label="Compartir" isActive={shares} />
    </View>
  );
};

const styles = {
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonIcon: {
    fontSize: 16,
    marginRight: 5,
    color: '#666',
  },
  activeButton: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 14,
    color: '#666',
  },
};

export default ActionButton;