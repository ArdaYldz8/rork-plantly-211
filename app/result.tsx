import React from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Card, Button, Text, ProgressBar } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  
  const commonName = params.commonName as string;
  const scientificName = params.scientificName as string;
  const confidence = parseFloat(params.confidence as string);
  const imageBase64 = params.imageBase64 as string;
  
  const confidencePercentage = Math.round(confidence * 100);

  const handleNewPhoto = () => {
    router.navigate('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.card} elevation={2}>
          <Card.Content style={styles.cardContent}>
            {imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.resultInfo}>
              <Text style={styles.commonName}>{commonName}</Text>
              <Text style={styles.scientificName}>{scientificName}</Text>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Güven Oranı</Text>
                <ProgressBar 
                  progress={confidence} 
                  color="#00c853"
                  style={styles.progressBar}
                />
                <Text style={styles.confidenceText}>%{confidencePercentage}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        <Button
          mode="outlined"
          onPress={handleNewPhoto}
          style={styles.newPhotoButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Yeni Fotoğraf
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1E1E1E',
    marginBottom: 24,
  },
  cardContent: {
    padding: 24,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 24,
  },
  resultInfo: {
    alignItems: 'center',
  },
  commonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#AAAAAA',
    marginBottom: 32,
    textAlign: 'center',
  },
  confidenceContainer: {
    width: '100%',
    alignItems: 'center',
  },
  confidenceLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
    marginBottom: 8,
  },
  confidenceText: {
    color: '#00c853',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newPhotoButton: {
    borderColor: '#00c853',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    color: '#00c853',
    fontWeight: 'bold',
  },
});