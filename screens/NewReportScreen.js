import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const NewReportScreen = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Sección Ubicación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>Actualizar ubicación</Text>
          </TouchableOpacity>
          <Text style={styles.locationText}>Stockton St 1-99, San Francisco, CA</Text>
        </View>

        <View style={styles.separator} />

        {/* Sección Imagen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen</Text>
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Toca para agregar imagen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* Sección Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe el problema que quieres reportar..."
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  imageButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default NewReportScreen;