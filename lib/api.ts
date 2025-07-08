import Constants from 'expo-constants';

export interface IdentifyResponse {
  species: {
    common_name_tr: string;
    scientific_name: string;
  };
  confidence: number;
}

/**
 * Identifies a plant from a base64 encoded image
 * @param base64 Base64 encoded JPEG image
 * @returns Promise with plant identification data
 */
export async function identifyPlant(base64: string): Promise<IdentifyResponse> {
  try {
    const apiUrl = process.env.API_URL || Constants.expoConfig?.extra?.apiUrl;
    
    if (!apiUrl) {
      throw new Error('API URL not configured');
    }

    const formData = new FormData();
    
    // Create a blob from base64 string
    const response = await fetch(`data:image/jpeg;base64,${base64}`);
    const blob = await response.blob();
    
    // Append the image as a file
    formData.append('images', blob as any, 'plant.jpg');
    formData.append('organs', 'leaf');

    const apiResponse = await fetch(`${apiUrl}/identify`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return data as IdentifyResponse;
  } catch (error) {
    console.error('Error identifying plant:', error);
    throw error;
  }
}