import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
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
          <Button
            mode="contained"
            onPress={handleIdentify}
            disabled={isLoading}
            style={styles.identifyButton}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              "Tanımla"
            )}
          </Button>
          
          <Button
            mode="text"
            onPress={handleChangePhoto}
            disabled={isLoading}
            style={styles.changeButton}
            labelStyle={styles.changeButtonLabel}
          >
            Foto Değiştir
          </Button>
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
  identifyButton: {
    backgroundColor: '#00c853',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  changeButton: {
    marginTop: 8,
  },
  changeButtonLabel: {
    color: '#AAAAAA',
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