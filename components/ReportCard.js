import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ReportCard = ({ report }) => {
  const imageSource = report.image_url || report.imageUrl || 'https://placehold.co/600x400/e0e0e0/ffffff?text=Sin+Foto';

  const displayDate = report.created_at 
    ? new Date(report.created_at).toLocaleDateString() 
    : (report.time || 'Reciente');

  return (
    <View style={styles.reportCard}>
      
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{report.userName || 'Usuario Anónimo'}</Text>
          <Text style={styles.location}>{report.location || 'Ubicación no disponible'}</Text>
        </View>
        <Text style={styles.time}>{displayDate}</Text>
      </View>
      
      <Image 
        source={{ uri: imageSource }} 
        style={styles.reportImage}
        resizeMode="cover"
        onError={(e) => console.log('Error cargando imagen:', e.nativeEvent.error)}
      />
      
      <Text style={styles.problemText} numberOfLines={3} ellipsizeMode='tail'>
        <Text style={styles.problemTitle}>{report.title || 'Reporte'}: </Text>
        {report.problem}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reportCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15, 
    marginVertical: 10, 
    borderRadius: 12,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e88e5', 
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  reportImage: {
    width: '100%',
    height: 200, 
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  problemTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  problemText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
});

export default ReportCard;