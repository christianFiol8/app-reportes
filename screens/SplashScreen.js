import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>ReportesApp</Text>
      <ActivityIndicator size="large" color="#1e88e5" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1e88e5',
    marginBottom: 10,
  },
  spinner: {
    marginTop: 50,
  },
});

export default SplashScreen;