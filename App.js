import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import Header from './components/Header';
import ReportCard from './components/ReportCard';
import AddButton from './components/AddButton';

export default function App() {
  const reportData = [
    {
      id: 1,
      userName: 'Ana García',
      location: 'Centro de la ciudad',
      time: 'Hace 2 horas',
      problem: 'Problema con el alumbrado público en la calle principal',
      imageUrl: 'https://via.placeholder.com/350x150?text=Imagen+del+reporte',
      likes: false,
      comments: false,
      shares: false
    },
    {
      id: 2,
      userName: 'Carlos Mendoza',
      location: 'Parque Central',
      time: 'Hace 4 horas',
      problem: 'Basura acumulada en los contenedores del parque',
      imageUrl: 'https://via.placeholder.com/350x150?text=Imagen+del+reporte',
      likes: false,
      comments: false,
      shares: false
    },
    {
      id: 3,
      userName: 'Erick Guerrero',
      location: 'Parque Central',
      time: 'Hace 8 horas',
      problem: 'Basura acumulada',
      imageUrl: 'https://via.placeholder.com/350x150?text=Imagen+del+reporte',
      likes: false,
      comments: false,
      shares: false
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Feed de Reportes" />
      <ScrollView style={styles.scrollView}>
        {reportData.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  spacer: {
    height: 20,
  },
};