import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const AuthScreen = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleAuth = () => {
    if (isLogin) {
      if (!email || !password) return Alert.alert('Error', 'Faltan campos');
      onLogin(email, password);
    } else {
      if (!name || !email || !password || !city)
        return Alert.alert('Error', 'Todos los campos son obligatorios');
      onRegister(name, email, password, city);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.logoText}>ReportesApp</Text>
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</Text>
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <>
            <TextInput style={styles.input} placeholder="Nombre Completo" value={name} onChangeText={setName} placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Ciudad / Colonia" value={city} onChangeText={setCity} placeholderTextColor="#999" />
          </>
        )}
        <TextInput style={styles.input} placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#999" />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Acceder' : 'Registrarme'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchButton} onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchButtonText}>
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#1e88e5', marginBottom: 5 },
  title: { fontSize: 24, fontWeight: '600', color: '#333' },
  formContainer: { width: '100%', maxWidth: 350 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0' },
  button: { backgroundColor: '#1e88e5', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchButtonText: { color: '#1e88e5', fontSize: 16, fontWeight: '600' },
});

export default AuthScreen;
