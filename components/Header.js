import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddButton from './AddButton';

const Header = ({ title, onAddPress, onLogout }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      
      <View style={styles.actionsContainer}>
        
        {onAddPress && (
          <View style={styles.actionWrapper}>
             <AddButton onPress={onAddPress} />
          </View>
        )}
        {onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5', 
    flex: 1, 
    marginRight: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionWrapper: {
    marginRight: 12, 
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  logoutText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Header;