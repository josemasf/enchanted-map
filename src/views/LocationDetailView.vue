<template>
  <div>
    <template v-if="locationStore.isLoading">
      <div class="d-flex justify-center align-center" style="min-height: 400px;">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>
    </template>
    
    <template v-else-if="location">
      <!-- Hero Banner -->
      <div class="location-hero">
        <v-img
          :src="getLocationImage(location.imageUrl , location.image)"
          height="400"
          cover
          class="location-hero-image"
        >
          <div class="location-hero-overlay d-flex flex-column justify-end pa-6">
            <div class="mb-2">
              <v-chip color="accent" small>{{ formatCategory(location.category) }}</v-chip>
            </div>
            <h1 class="text-h2 text-white mb-0">{{ location.name }}</h1>
          </div>
        </v-img>
      </div>
      
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="8">
            <!-- Description and Story -->
            <v-card class="mb-6">
              <v-card-text>
                <p class="text-h6 mb-4">{{ location.description }}</p>
                
                <div v-if="location.story" class="location-story">
                  <v-divider class="my-4"></v-divider>
                  <h2 class="text-h4 mb-4">The Story</h2>
                  
                  <div class="story-content">
                    {{ location.story }}
                  </div>
                </div>
                
                <div v-else class="text-center py-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  <p class="mt-2">Loading story...</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <!-- Map Preview -->
            <v-card class="mb-6">
              <v-card-title>Location</v-card-title>
              <v-card-text class="pa-0">
                <div class="map-preview">
                  <mini-map-component :latitude="location.latitude" :longitude="location.longitude" />
                </div>
                
                <div class="pa-4">
                  <v-btn
                    block
                    color="primary"
                    :to="`/map?location=${location.id}`"
                    class="mb-2"
                  >
                    View on Full Map
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
            
            <!-- Related Locations -->
            <v-card v-if="relatedLocations.length > 0">
              <v-card-title>Related Locations</v-card-title>
              <v-card-text class="pa-0">
                <v-list>
                  <v-list-item
                    v-for="relatedLocation in relatedLocations"
                    :key="relatedLocation.id"
                    :title="relatedLocation.name"
                    :subtitle="formatCategory(relatedLocation.category)"
                    :to="`/location/${relatedLocation.id}`"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="40">
                        <v-img :src="relatedLocation.imageUrl" cover></v-img>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    
    <template v-else>
      <v-container class="text-center py-12">
        <h2 class="text-h4 mb-4">Location Not Found</h2>
        <p class="mb-6">The location you are looking for doesn't exist or has been removed.</p>
        <v-btn color="primary" to="/map">
          Back to Map
        </v-btn>
      </v-container>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocationStore } from '@/stores/locations';
import MiniMapComponent from '@/components/map/MiniMapComponent.vue';
import { LocationCategory } from '@/types';
import { getLocationImage } from '@/services/locationService';

const route = useRoute();
const router = useRouter();
const locationStore = useLocationStore();

// Computed properties
const locationId = computed(() => route.params.id as string);

const location = computed(() => {
  if (!locationId.value) return null;
  return locationStore.getLocationById(locationId.value) || null;
});

const relatedLocations = computed(() => {
  if (!location.value) return [];
  
  // Get locations of the same category
  return locationStore.locations
    .filter(loc => 
      loc.id !== location.value!.id && 
      loc.category === location.value!.category
    )
    .slice(0, 3);
});

// Methods
function formatCategory(category: LocationCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Lifecycle hooks
onMounted(async () => {
  if (!locationId.value) {
    router.push('/map');
    return;
  }
  
  if (locationStore.locations.length === 0) {
    await locationStore.loadLocations();
  }
  
  await locationStore.loadLocationDetail(locationId.value);
});

// Watch for route changes to load new location
watch(locationId, async (newId) => {
  if (newId) {
    await locationStore.loadLocationDetail(newId);
  }
});
</script>

<style scoped>
.location-hero {
  position: relative;
}

.location-hero-image {
  position: relative;
}

.location-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
}

.map-preview {
  height: 250px;
  width: 100%;
}

.location-story {
  font-family: var(--font-body);
}

.story-content {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>