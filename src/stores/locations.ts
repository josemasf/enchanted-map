import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchLocations, fetchLocationById } from '@/services/locationService';
import type { Location } from '@/types';

export const useLocationStore = defineStore('locations', () => {
  // State
  const locations = ref<Location[]>([]);
  const selectedLocation = ref<Location | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getLocationById = computed(() => {
    return (id: string) => locations.value.find(location => location.id === id) || null;
  });

  // Actions
  async function loadLocations() {
    if (locations.value.length) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await fetchLocations();
      locations.value = data;
    } catch (err: any) {
      error.value = err.message || 'Failed to load locations';
      console.error('Error loading locations:', err);
    } finally {
      isLoading.value = false;
    }
  }
  
  async function loadLocationDetail(id: string) {
    isLoading.value = true;
    error.value = null;
    
    try {
      // First check if we already have the full location details
      const existingLocation = getLocationById.value(id);
      if (existingLocation && existingLocation.story) {
        selectedLocation.value = existingLocation;
        return;
      }
      
      // Otherwise fetch the full details
      const detailedLocation = await fetchLocationById(id);
      selectedLocation.value = detailedLocation;
      
      // Update the location in our locations array
      const index = locations.value.findIndex(loc => loc.id === id);
      if (index !== -1) {
        locations.value[index] = detailedLocation;
      } else {
        locations.value.push(detailedLocation);
      }
    } catch (err: any) {
      error.value = err.message || `Failed to load location with ID: ${id}`;
      console.error(`Error loading location ${id}:`, err);
    } finally {
      isLoading.value = false;
    }
  }

  function selectLocation(location: Location) {
    selectedLocation.value = location;
  }

  function clearSelectedLocation() {
    selectedLocation.value = null;
  }

  return {
    // State
    locations,
    selectedLocation,
    isLoading,
    error,
    
    // Getters
    getLocationById,
    
    // Actions
    loadLocations,
    loadLocationDetail,
    selectLocation,
    clearSelectedLocation
  };
});