import React from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
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
        <View style={styles.card}>
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
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${confidencePercentage}%` }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.confidenceText}>%{confidencePercentage}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.newPhotoButton}
          onPress={handleNewPhoto}
          activeOpacity={0.8}
        >
          <Text style={styles.newPhotoButtonText}>Yeni Fotoğraf</Text>
        </TouchableOpacity>
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
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
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
  progressBarContainer: {
    width: '100%',
    marginBottom: 8,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00c853',
    borderRadius: 4,
  },
  confidenceText: {
    color: '#00c853',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newPhotoButton: {
    borderWidth: 1,
    borderColor: '#00c853',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPhotoButtonText: {
    color: '#00c853',
    fontSize: 16,
    fontWeight: 'bold',
  },
});