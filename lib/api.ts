import Constants from 'expo-constants';
import { IdentifyResponse } from '../types';

/**
 * Identifies a plant from a base64 encoded image
 * @param base64 Base64 encoded JPEG image
 * @returns Promise with plant identification data
 */
export async function identifyPlant(base64: string): Promise<IdentifyResponse> {
  try {
    const apiUrl = Constants.expoConfig?.extra?.apiUrl || process.env.API_URL;
    
    if (!apiUrl) {
      throw new Error('API URL not configured');
    }

    const formData = new FormData();
    
    // Create a blob from base64 string
    const blob = await (await fetch(`data:image/jpeg;base64,${base64}`)).blob();
    
    // Append the image as a file
    formData.append('images', blob as any, 'plant.jpg');
    formData.append('organs', 'leaf');

    const response = await fetch(`${apiUrl}/identify`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data as IdentifyResponse;
  } catch (error) {
    console.error('Error identifying plant:', error);
    throw error;
  }
}