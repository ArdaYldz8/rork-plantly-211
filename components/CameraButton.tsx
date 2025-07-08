import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { Camera } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CameraButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export default function CameraButton({ onPress, isLoading = false }: CameraButtonProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      
      return () => spinAnimation.stop();
    } else {
      spinValue.setValue(0);
    }
  }, [isLoading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={onPress}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <Animated.View 
            style={[
              styles.loadingIndicator,
              { transform: [{ rotate: spin }] }
            ]} 
          />
        ) : (
          <Camera size={40} color={Colors.dark.text} />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>Fotoğraf Çek / Seç</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    color: Colors.dark.text,
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  loadingIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.dark.text,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});