import React from 'react';
import { View, Text } from 'react-native';
import AddButton from './AddButton';

const Header = ({ title, onAddPress }) => {
  console.log('Header - onAddPress:', onAddPress);

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        <AddButton onPress={onAddPress} />
      </View>
    </View>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
};

export default Header;