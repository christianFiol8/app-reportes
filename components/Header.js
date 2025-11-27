import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddButton from './AddButton';

const Header = ({ title, onAddPress, onLogout }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      
      <View style={styles.actionsContainer}>
        
        {/* 1. Botón de Añadir (+) */}
        {onAddPress && (
          <View style={styles.actionWrapper}>
             <AddButton onPress={onAddPress} />
          </View>
        )}

        {/* 2. Botón de Salir */}
        {onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row', // Elementos en fila horizontal
    justifyContent: 'space-between', // Título a un lado, botones al otro
    alignItems: 'center', // Centrados verticalmente
    paddingTop: 45, // Más espacio superior para la barra de estado en celulares modernos
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    // Sombra suave para dar profundidad
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5', // Usamos el azul de la marca para el título
    flex: 1, // Toma el espacio disponible para que no empuje los botones
    marginRight: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionWrapper: {
    marginRight: 12, // Espacio entre el botón + y el de Salir
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f5f5f5', // Fondo gris claro sutil
    borderRadius: 20, // Bordes estilo "píldora"
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  logoutText: {
    color: '#555', // Texto gris oscuro
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Header;