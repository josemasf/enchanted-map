<template>
  <div class="map-wrapper">
    
    <VMap 
      :center="mapCenter"
      :zoom="DEFAULT_MAP_OPTIONS.zoom"     
      useFly 
    >
    <VMapOsmTileLayer />
    <VMapZoomControl />
    <VMapAttributionControl />
      <VMapIconMarker
        v-for="location in locations"
        :key="location.id"
        :latlng="[location.latitude, location.longitude]"
        :options="createMarkerOptions(location)"
        :icon-url="`/${getMarkerIcon(location.category).replace(/^\//, '')}`"
        @click="handleMarkerClick(location)"
      />
    </VMap>
    
    <!-- Limited view overlay for non-authenticated users -->
    <div v-if="!isAuthenticated" class="map-overlay">
      <div class="map-overlay-content">
        <h2 class="text-h4 mb-4">Unlock Full Map Experience</h2>
        <p class="mb-4">Sign in to access all locations and their fascinating stories.</p>
        <div class="d-flex justify-center">
          <v-btn color="primary" to="/signin" class="me-2">Sign In</v-btn>
          <v-btn color="secondary" to="/signup" variant="outlined">Sign Up</v-btn>
        </div>
      </div>
    </div>
    
    <!-- Location info panel when a location is selected -->
    <v-navigation-drawer
      v-model="showLocationPanel"
      location="right"
      width="400"
      temporary
      class="location-panel"
    >
      <template v-if="selectedLocation">
        <v-img
          :src="selectedLocation.imageUrl"
          height="200"
          cover
          class="location-panel-image"
        >
          <div class="location-panel-image-overlay d-flex flex-column justify-end pa-4">
            <div class="mb-2">
              <v-chip color="accent" small>{{ formatCategory(selectedLocation.category) }}</v-chip>
            </div>
            <h2 class="text-h4 text-white">{{ selectedLocation.name }}</h2>
          </div>
        </v-img>
        
        <div class="pa-4">
          <p class="text-body-1 mb-4">{{ selectedLocation.description }}</p>
          
          <v-btn
            block
            color="primary"
            :to="`/location/${selectedLocation.id}`"
            class="mb-4"
          >
            Read Full Story
          </v-btn>
          
          <v-btn
            variant="text"
            block
            @click="closeLocationPanel"
            class="mb-2"
          >
            Close
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { VMap, VMapIconMarker,VMapOsmTileLayer,VMapZoomControl,VMapAttributionControl } from 'vue-map-ui';
import { useAuthStore } from '@/stores/auth';
import { useLocationStore } from '@/stores/locations';
import { DEFAULT_MAP_OPTIONS, createMarkerOptions, getMapCenterForLocation, getMarkerIcon } from '@/services/mapService';
import type { Location, MapViewMode } from '@/types';
import { LocationCategory } from '@/types';

// Props
defineProps<{
  mode?: MapViewMode;
  initialLocation?: string; // Location ID to focus on initially
}>();

// Emits
const emit = defineEmits<{
  (e: 'location-selected', location: Location): void
}>();

// Stores
const authStore = useAuthStore();
const locationStore = useLocationStore();

// Refs
const showLocationPanel = ref(false);
const selectedLocation = ref<Location | null>(null);
// const mapInstance = ref<any>(null);

const mapCenter = ref(DEFAULT_MAP_OPTIONS.center);

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated);
const locations = computed(() => locationStore.locations);

// Methods


function formatCategory(category: LocationCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function handleMarkerClick(location: Location) {
  selectedLocation.value = location;
  showLocationPanel.value = true;
  
  const { center } = getMapCenterForLocation(location);
  mapCenter.value = center;

  // Emit event for parent component
  emit('location-selected', location);
}

function closeLocationPanel() {
  showLocationPanel.value = false;
  selectedLocation.value = null;
}

const centerOnLocation = (location: Location) => {
  const { center } = getMapCenterForLocation(location);
  mapCenter.value = center;
}

defineExpose({
  centerOnLocation
});
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.map-overlay-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
}

.location-panel-image {
  position: relative;
}

.location-panel-image-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>