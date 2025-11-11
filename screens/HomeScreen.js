import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from '../components/Header';
import ReportCard from '../components/ReportCard';

const HomeScreen = ({ onAddReport, reports }) => {
  const initialReportData = [
    {
      id: 1,
      userName: 'Ana García',
      location: 'Centro de la ciudad',
      time: 'Hace 2 horas',
      problem: 'Problema con el alumbrado público en la calle principal',
      imageUrl: 'https://via.placeholder.com/350x150?text=Imagen+del+reporte',
      likes: false,
      comments: true,
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
      comments: true,
      shares: false
    }
  ];

  const displayReports = reports.length > 0 ? reports : initialReportData;

  return (
    <>
      <Header 
        title="Feed de Reportes" 
        onAddPress={onAddReport}
      />
      
      <ScrollView style={styles.scrollView}>
        {displayReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
        <View style={styles.spacer} />
      </ScrollView>
    </>
  );
};

const styles = {
  scrollView: {
    flex: 1,
  },
  spacer: {
    height: 20,
  },
};

export default HomeScreen;