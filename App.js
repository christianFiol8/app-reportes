import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, View, ActivityIndicator } from 'react-native';

import SplashScreen from './screens/SplashScreen'; 
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import NewReportScreen from './screens/NewReportScreen';

import { loginUser, registerUser, getReports, createReport } from './components/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setCurrentScreen('auth'), 2000);
  }, []);

  const refreshReports = async () => {
    const data = await getReports();
    setReports(data);
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      await refreshReports();
      setCurrentScreen('home');
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password, city) => {
    setLoading(true);
    try {
      // REGISTRO SIN AUTO-LOGIN → YA NO CREA ERROR
      const userData = await registerUser(name, email, password, city);
      setUser(userData); 
      await refreshReports();
      setCurrentScreen('home');
    } catch (error) {
      Alert.alert('Error', error.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (newReportData) => {
    try {
      await createReport({
        ...newReportData,
        userId: user.id 
      });
      await refreshReports();
      setCurrentScreen('home');
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el reporte');
    }
  };

  const renderScreen = () => {
    if (loading)
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#1e88e5" />
        </View>
      );

    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
      case 'home':
        return (
          <HomeScreen
            reports={reports}
            onAddReport={() => setCurrentScreen('newReport')}
            onLogout={() => {
              setUser(null);
              setCurrentScreen('auth');
            }}
          />
        );
      case 'newReport':
        return <NewReportScreen onBack={() => setCurrentScreen('home')} onAddReport={handleCreateReport} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {renderScreen()}
    </SafeAreaView>
  );
}
