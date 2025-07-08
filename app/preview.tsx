import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { identifyPlant } from '@/lib/api';
import ErrorModal from '@/components/ErrorModal';

export default function PreviewScreen() {
  const params = useLocalSearchParams();
  const imageBase64 = params.imageBase64 as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorType, setErrorType] = useState<'NETWORK' | 'RATE_LIMIT' | 'GENERAL'>('GENERAL');

  const handleIdentify = async () => {
    setIsLoading(true);
    try {
      const result = await identifyPlant(imageBase64);
      
      router.push({
        pathname: '/result',
        params: {
          commonName: result.species.common_name_tr,
          scientificName: result.species.scientific_name,
          confidence: result.confidence.toString(),
          imageBase64: imageBase64,
        },
      });
    } catch (error: any) {
      console.error('Plant identification error:', error);
      
      // Determine error type based on error message or status
      if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        setErrorType('RATE_LIMIT');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setErrorType('NETWORK');
      } else {
        setErrorType('GENERAL');
      }
      
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhoto = async () => {
    router.back();
  };

  if (!imageBase64) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Fotoğraf bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, isLoading && styles.disabledButton]}
            onPress={handleIdentify}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Tanımla</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleChangePhoto}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Foto Değiştir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ErrorModal 
        visible={errorVisible} 
        onDismiss={() => setErrorVisible(false)}
        type={errorType}
      />
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
    aspectRatio: 4/5,
    borderRadius: 16,
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: '#00c853',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});