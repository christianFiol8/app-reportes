import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const NewReportScreen = ({ onBack, onAddReport }) => {
  const [location, setLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('Obteniendo ubicación...');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  // Pedir permisos al cargar la pantalla
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    // Pedir permiso de ubicación
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso de ubicación para usar esta función');
      return;
    }

    // Pedir permiso de cámara
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso de cámara para tomar fotos');
    }

    // Obtener ubicación inicial
    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // Obtener dirección a partir de las coordenadas
      let address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address.length > 0) {
        const firstAddress = address[0];
        const addressString = `${firstAddress.street || ''} ${firstAddress.streetNumber || ''}, ${firstAddress.city || ''}, ${firstAddress.region || ''}`.trim();
        setLocationAddress(addressString || 'Ubicación obtenida');
      }
    } catch (error) {
      console.log('Error obteniendo ubicación:', error);
      setLocationAddress('Error obteniendo ubicación');
    }
  };

  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error tomando foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Por favor describe el problema');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Por favor toma una foto del problema');
      return;
    }

    const newReport = {
      location: locationAddress,
      coordinates: location,
      imageUrl: image,
      problem: description,
    };

    onAddReport(newReport);
    Alert.alert('Éxito', 'Reporte enviado correctamente');
    onBack();
  };

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
          <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
            <Text style={styles.locationButtonText}>Actualizar ubicación</Text>
          </TouchableOpacity>
          <Text style={styles.locationText}>{locationAddress}</Text>
          {location && (
            <Text style={styles.coordinatesText}>
              Coordenadas: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          )}
        </View>

        <View style={styles.separator} />

        {/* Sección Imagen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen</Text>
          <TouchableOpacity style={styles.imageButton} onPress={takePicture}>
            {image ? (
              <Image source={{ uri: image }} style={styles.capturedImage} />
            ) : (
              <Text style={styles.imageButtonText}>Toca para agregar imagen</Text>
            )}
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
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    marginBottom: 5,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#999',
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
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  imageButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  capturedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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