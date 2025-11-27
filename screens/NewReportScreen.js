import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // <--- Importamos Location

const NewReportScreen = ({ onBack, onAddReport }) => {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [location, setLocation] = useState(''); // Lo dejamos vacío al inicio
  const [isSending, setIsSending] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false); // Nuevo estado para carga de GPS

  // --- LÓGICA DE FOTOS (IGUAL QUE ANTES) ---
  const pickImage = async () => {
    Alert.alert(
      "Subir Foto",
      "¿De dónde quieres obtener la imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Galería",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
              base64: true,
            });
            handleImageResult(result);
          }
        },
        {
          text: "Cámara",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
              base64: true,
            });
            handleImageResult(result);
          }
        }
      ]
    );
  };

  const handleImageResult = (result) => {
    if (!result.canceled) {
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImageUrl(imageUri);
    }
  };

  // --- LÓGICA DE UBICACIÓN REAL (NUEVO) ---
  const handleGetLocation = async () => {
    setLoadingLocation(true);
    setLocation('Solicitando permiso...');

    try {
      // 1. Pedir permiso
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación para agregarla al reporte.');
        setLoadingLocation(false);
        setLocation('Permiso denegado');
        return;
      }

      setLocation('Obteniendo coordenadas...');

      // 2. Obtener Latitud y Longitud
      let userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      // 3. Convertir coordenadas a Dirección (Geocoding)
      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        // Construimos una dirección legible
        // Ejemplo: "Calle Reforma 123, Centro"
        const formattedAddress = `${addr.street || ''} ${addr.streetNumber || ''}, ${addr.city || ''}, ${addr.region || ''}`;
        
        // Limpiamos comas extra si faltan datos
        const cleanAddress = formattedAddress.replace(/, ,/g, ',').trim(); 
        setLocation(cleanAddress || `Lat: ${latitude}, Lon: ${longitude}`);
      } else {
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      }

    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación. Verifica tu GPS.');
      setLocation('');
    } finally {
      setLoadingLocation(false);
    }
  };

  // --- ENVIAR REPORTE ---
  const handleSubmit = () => {
    if (!title.trim() || !problem.trim()) {
      Alert.alert('Faltan datos', 'Por favor, completa el título y la descripción.');
      return;
    }
    
    // Validación opcional: Obligar a tener ubicación
    if (!location || location === 'Permiso denegado') {
        Alert.alert('Falta ubicación', 'Por favor obten tu ubicación actual.');
        return;
    }

    setIsSending(true);

    const newReport = {
      title: title.trim(),
      problem: problem.trim(),
      imageUrl: imageUrl,
      location: location,
    };

    setTimeout(() => {
      onAddReport(newReport);
      setIsSending(false);
      setTitle('');
      setProblem('');
      setImageUrl(null);
      setLocation('');
    }, 1500);
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Resumen del Problema</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Basura acumulada"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
          maxLength={50}
        />

        <Text style={styles.label}>Detalles</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describe el incidente..."
          value={problem}
          onChangeText={setProblem}
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Fotografía</Text>
        <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            ) : (
                <View style={styles.placeholderContent}>
                    <Text style={styles.cameraIcon}>📷</Text>
                    <Text style={styles.imageText}>Tocar para tomar foto</Text>
                </View>
            )}
        </TouchableOpacity>

        <Text style={styles.label}>Ubicación</Text>
        <TextInput
          style={[styles.input, styles.locationInput]}
          value={location}
          placeholder="Toca el botón verde 👇"
          placeholderTextColor="#999"
          editable={false}
        />
        
        <TouchableOpacity 
            style={styles.locationButton} 
            onPress={handleGetLocation}
            disabled={loadingLocation}
        >
          {loadingLocation ? (
              <ActivityIndicator color="#fff" size="small" />
          ) : (
              <Text style={styles.locationButtonText}>📍 Obtener Ubicación Real</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.submitButton, isSending && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar Reporte</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', paddingVertical: 15, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: '#e0e0e0', elevation: 2, marginTop: 25,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  backButton: { padding: 5, width: 30 },
  backButtonText: { fontSize: 24, color: '#1e88e5', fontWeight: 'bold' },
  container: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 15, marginBottom: 8 },
  input: {
    backgroundColor: '#fff', padding: 15, borderRadius: 10, fontSize: 16,
    borderWidth: 1, borderColor: '#e0e0e0', color: '#333',
  },
  multilineInput: { height: 100, textAlignVertical: 'top' },
  locationInput: { backgroundColor: '#e0f7fa', borderColor: '#b2ebf2', color: '#006064', fontWeight: 'bold', marginBottom: 10 },
  imagePlaceholder: {
    height: 150, backgroundColor: '#e0e0e0', borderRadius: 10, justifyContent: 'center',
    alignItems: 'center', borderWidth: 2, borderColor: '#9e9e9e', borderStyle: 'dashed',
    marginBottom: 10, overflow: 'hidden'
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderContent: { alignItems: 'center' },
  cameraIcon: { fontSize: 30, marginBottom: 5 },
  imageText: { color: '#666', fontSize: 16, fontWeight: '500' },
  locationButton: {
    backgroundColor: '#4caf50', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20, marginTop: 5,
  },
  locationButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  submitButton: {
    backgroundColor: '#1e88e5', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20,
    shadowColor: '#1e88e5', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
  },
  submitButtonDisabled: { backgroundColor: '#90caf9' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default NewReportScreen;