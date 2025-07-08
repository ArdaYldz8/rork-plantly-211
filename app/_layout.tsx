import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#111111" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111111',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#111111',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Plantly",
            headerTitleAlign: 'center',
          }} 
        />
        <Stack.Screen 
          name="preview" 
          options={{ 
            title: "Önizleme",
            headerTitleAlign: 'center',
          }} 
        />
        <Stack.Screen 
          name="result" 
          options={{ 
            title: "Sonuç",
            headerTitleAlign: 'center',
          }} 
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});