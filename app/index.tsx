import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Card, IconButton, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Leaf } from 'lucide-react-native';
import ErrorModal from '@/components/ErrorModal';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorType, setErrorType] = useState<'NETWORK' | 'PERMISSION' | 'GENERAL'>('GENERAL');

  const handleImageSelection = async () => {
    try {
      setIsLoading(true);

      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setErrorType('PERMISSION');
        setErrorVisible(true);
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        router.push({
          pathname: '/preview',
          params: {
            imageBase64: result.assets[0].base64,
          },
        });
      }
    } catch (error) {
      console.error('Image selection error:', error);
      setErrorType('GENERAL');
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
            Tanımlamak istediğiniz bitkinin fotoğrafını galeriden seçin
          </Text>
        </View>
        
        <Card style={styles.card} elevation={2}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              icon={() => <Leaf size={48} color="#00c853" />}
              size={80}
              onPress={handleImageSelection}
              disabled={isLoading}
              style={styles.iconButton}
            />
            <Text style={styles.buttonLabel}>Fotoğraf Seç</Text>
          </Card.Content>
        </Card>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#00c853" />
          </View>
        )}
      </View>

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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
  card: {
    width: '80%',
    backgroundColor: '#1E1E1E',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  iconButton: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});