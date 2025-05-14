import axios from 'axios';
import type { Location } from '@/types';

// Base URL for API calls
const API_URL = '/data';

/**
 * Fetches all locations from the local JSON file
 */
export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await axios.get(`${API_URL}/locations.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw new Error('Failed to fetch locations');
  }
}

/**
 * Fetches a single location by ID
 */
export async function fetchLocationById(id: string): Promise<Location> {
  try {
    // In a real application, this might be a separate endpoint
    // Here we're fetching all locations and finding the one we need
    const response = await axios.get(`${API_URL}/locations.json`);
    const location = response.data.find((loc: Location) => loc.id === id);
    
    if (!location) {
      throw new Error(`Location with ID ${id} not found`);
    }
    
    // For detailed view, fetch the location's story from a separate file
    const storyResponse = await axios.get(`${API_URL}/stories/${id}.json`);
    return {
      ...location,
      story: storyResponse.data.story
    };
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw new Error(`Failed to fetch location with ID ${id}`);
  }
}