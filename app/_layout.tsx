import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00c853',
    secondary: '#4CAF50',
    background: '#111111',
    surface: '#1E1E1E',
    surfaceVariant: '#333333',
  },
};

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hideAsync();
  }, []);

  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});