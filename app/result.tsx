import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';

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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          <View style={[styles.confidenceBar, { width: `${confidencePercentage}%` }]} />
          <Text style={styles.confidenceText}>%{confidencePercentage} güven</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleNewPhoto}>
          <ArrowLeft size={20} color={Colors.dark.text} />
          <Text style={styles.buttonText}>Yeni Fotoğraf</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
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
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.dark.subtext,
    marginBottom: 24,
  },
  confidenceContainer: {
    height: 40,
    backgroundColor: Colors.dark.border,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  confidenceBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
  },
  confidenceText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.dark.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});