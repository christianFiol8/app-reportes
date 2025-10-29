import React from 'react';
import { View, Text, Image } from 'react-native';
import ActionButton from './ActionButton';

const ReportCard = ({ report }) => {
  return (
    <View style={styles.reportCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{report.userName}</Text>
        <Text style={styles.location}>{report.location}</Text>
      </View>
      
      <Text style={styles.time}>{report.time}</Text>
      
      <Image 
        source={{ uri: report.imageUrl }} 
        style={styles.reportImage}
        resizeMode="cover"
      />
      
      <Text style={styles.problemText}>{report.problem}</Text>
      
      <ActionButton 
        likes={report.likes}
        comments={report.comments}
        shares={report.shares}
      />
      
      <View style={styles.separator} />
    </View>
  );
};

const styles = {
  reportCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  reportImage: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  problemText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 15,
    marginHorizontal: -15,
  },
};

export default ReportCard;