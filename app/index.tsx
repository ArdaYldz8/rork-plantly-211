import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { identifyPlant } from '@/lib/api';
import CameraButton from '@/components/CameraButton';
import ErrorModal from '@/components/ErrorModal';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleImageSelection = async () => {
    try {
      // Request camera permissions if needed
      if (!cameraPermission?.granted) {
        const permission = await requestCameraPermission();
        if (!permission.granted) {
          setErrorMessage("Kamera izni gerekli. Lütfen ayarlardan izin verin.");
          setErrorVisible(true);
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        await processImage(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      setErrorMessage("Fotoğraf seçilirken hata oluştu.");
      setErrorVisible(true);
    }
  };

  const processImage = async (base64: string) => {
    setIsLoading(true);
    try {
      const result = await identifyPlant(base64);
      
      router.push({
        pathname: '/result',
        params: {
          commonName: result.species.common_name_tr,
          scientificName: result.species.scientific_name,
          confidence: result.confidence.toString(),
          imageBase64: base64,
        },
      });
    } catch (error) {
      console.error('Plant identification error:', error);
      setErrorMessage("Üzgünüz, işlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.");
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🌿</Text>
          <Text style={styles.title}>Bitki Tanıma</Text>
          <Text style={styles.subtitle}>
            Tanımlamak istediğiniz bitkinin fotoğrafını çekin veya galeriden seçin
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <CameraButton onPress={handleImageSelection} isLoading={isLoading} />
        </View>
      </View>

      <ErrorModal 
        visible={errorVisible} 
        onDismiss={() => setErrorVisible(false)}
        message={errorMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  buttonContainer: {
    marginTop: 40,
  },
});