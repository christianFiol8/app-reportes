import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import NewReportScreen from './screens/NewReportScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'newReport':
        return <NewReportScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return <HomeScreen onAddReport={() => setCurrentScreen('newReport')} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}