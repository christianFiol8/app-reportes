import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import NewReportScreen from './screens/NewReportScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [reports, setReports] = useState([]);

  const addReport = (newReport) => {
    const reportWithId = {
      ...newReport,
      id: Date.now().toString(),
      userName: 'Usuario Actual', 
      time: 'Hace unos momentos',
      likes: false,
      comments: false,
      shares: false
    };
    setReports(prevReports => [reportWithId, ...prevReports]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'newReport':
        return (
          <NewReportScreen 
            onBack={() => setCurrentScreen('home')}
            onAddReport={addReport}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen 
            onAddReport={() => setCurrentScreen('newReport')}
            reports={reports}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}