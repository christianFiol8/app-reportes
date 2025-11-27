import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ReportCard from '../components/ReportCard';
import Header from '../components/Header'; 

const HomeScreen = ({ reports, onAddReport, onLogout }) => {
  return (
    <View style={styles.container}>
      <Header 
        title="Reportes" 
        onAddPress={onAddReport} 
        onLogout={onLogout} 
      />
      
      {reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>¡No hay reportes aún!</Text>
          <Text style={styles.emptySubText}>Sé el primero en reportar algo.</Text>
          <TouchableOpacity style={styles.reportButton} onPress={onAddReport}>
            <Text style={styles.reportButtonText}>Crear Nuevo Reporte</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReportCard report={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  reportButton: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;