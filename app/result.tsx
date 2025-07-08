import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  
  const commonName = params.commonName as string;
  const scientificName = params.scientificName as string;
  const confidence = parseFloat(params.confidence as string);
  const imageBase64 = params.imageBase64 as string;
  
  const confidencePercentage = Math.round(confidence * 100);

  const handleNewPhoto = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {imageBase64 && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.resultCard}>
          <Text style={styles.commonName}>{commonName}</Text>
          <Text style={styles.scientificName}>{scientificName}</Text>
          
          <View style={styles.confidenceContainer}>
            <View style={styles.confidenceBarBackground}>
              <View style={[styles.confidenceBar, { width: `${confidencePercentage}%` }]} />
            </View>
            <Text style={styles.confidenceText}>%{confidencePercentage} güven</Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleNewPhoto}>
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Yeni Fotoğraf</Text>
          </TouchableOpacity>
        </View>
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
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  commonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#AAAAAA',
    marginBottom: 24,
  },
  confidenceContainer: {
    marginBottom: 24,
  },
  confidenceBarBackground: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  confidenceBar: {
    height: '100%',
    backgroundColor: '#00c853',
    borderRadius: 4,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00c853',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});