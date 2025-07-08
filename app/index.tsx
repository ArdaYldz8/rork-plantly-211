import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { identifyPlant } from '@/lib/api';
import CameraButton from '@/components/CameraButton';
import ErrorModal from '@/components/ErrorModal';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleImageSelection = async () => {
    try {
      // Check camera permissions first
      if (!cameraPermission?.granted) {
        const permission = await requestCameraPermission();
        if (!permission.granted) {
          setErrorMessage("Kamera izni verilmedi. Lütfen ayarlardan izin verin.");
          setErrorVisible(true);
          return;
        }
      }

      // Show image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        await processImage(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      setErrorVisible(true);
    }
  };

  const processImage = async (base64: string) => {
    setIsLoading(true);
    try {
      const result = await identifyPlant(base64);
      
      // Navigate to result screen with the identification data
      router.push({
        pathname: '/result',
        params: {
          commonName: result.species.common_name_tr,
          scientificName: result.species.scientific_name,
          confidence: result.confidence,
          imageBase64: base64,
        },
      });
    } catch (error) {
      console.error('Error processing image:', error);
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bitki Tanıma</Text>
        <Text style={styles.subtitle}>
          Tanımlamak istediğiniz bitkinin fotoğrafını çekin veya galeriden seçin
        </Text>
        
        <View style={styles.buttonContainer}>
          <CameraButton onPress={handleImageSelection} isLoading={isLoading} />
        </View>
      </View>

      <ErrorModal 
        visible={errorVisible} 
        onDismiss={() => setErrorVisible(false)}
        message={errorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
});