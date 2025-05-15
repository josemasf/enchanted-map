<template>
  <div class="map-view">
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <!-- Sidebar with location list (only shown on desktop) -->
        <v-col cols="12" md="3" lg="3" class="d-none d-md-block">
          <div class="location-sidebar">
            <div class="location-sidebar-header pa-4">
              <h2 class="text-h5 mb-4">Locations</h2>
              
              <v-text-field
                v-model="searchQuery"
                label="Search locations"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-magnify"
                hide-details
                class="mb-2"
              ></v-text-field>
              
              <v-select
                v-model="categoryFilter"
                label="Category"
                :items="categoryOptions"
                variant="outlined"
                density="compact"
                hide-details
              ></v-select>
            </div>
            
            <v-divider></v-divider>
            
            <div class="location-list">
              <div v-if="locationStore.isLoading" class="d-flex justify-center pa-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              
              <template v-else-if="filteredLocations.length > 0">
                <v-list>
                  <v-list-item
                    v-for="location in filteredLocations"
                    :key="location.id"
                    :title="location.name"
                    :subtitle="formatCategory(location.category)"
                    @click="selectLocation(location)"
                    :active="selectedLocationId === location.id"
                    class="location-list-item"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="40">
                        <v-img :src="location.imageUrl" cover></v-img>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
              </template>
              
              <div v-else class="pa-4 text-center">
                <p>No locations found.</p>
              </div>
            </div>
          </div>
        </v-col>
        
        <!-- Map container -->
        <v-col cols="12" md="9" lg="9" class="fill-height">
          
          <map-component 
            :mode="authStore.isAuthenticated ? MapViewMode.FULL : MapViewMode.LIMITED"
            :initial-location="initialLocationId ?? undefined"
          />
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Mobile location drawer -->
    <v-bottom-sheet v-model="showLocationDrawer" class="d-md-none">
      <v-card>
        <v-card-title class="d-flex align-center">
          <span>Locations</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="showLocationDrawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-text-field
            v-model="searchQuery"
            label="Search locations"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="mb-2"
          ></v-text-field>
          
          <v-select
            v-model="categoryFilter"
            label="Category"
            :items="categoryOptions"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-4"
          ></v-select>
          
          <v-list v-if="filteredLocations.length > 0">
            <v-list-item
              v-for="location in filteredLocations"
              :key="location.id"
              :title="location.name"
              :subtitle="formatCategory(location.category)"
              @click="selectLocationMobile(location)"
            >
              <template v-slot:prepend>
                <v-avatar size="40">
                  <v-img :src="location.imageUrl" cover></v-img>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
          
          <div v-else class="text-center py-4">
            <p>No locations found.</p>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    
    <!-- Mobile location button -->
    <v-btn
      color="primary"
      icon
      size="large"
      class="location-fab d-md-none"
      @click="showLocationDrawer = true"
    >
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLocationStore } from '@/stores/locations';
import MapComponent from '@/components/map/MapComponent.vue';
import { LocationCategory, MapViewMode } from '@/types';
import type { Location } from '@/types';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const locationStore = useLocationStore();

// State
const searchQuery = ref('');
const categoryFilter = ref('');
const selectedLocationId = ref<string | null>(null);
const showLocationDrawer = ref(false);
const initialLocationId = ref<string | null>(null);

// Computed
const categoryOptions = computed(() => {
  return [
    { value: '', title: 'All Categories' },
    { value: LocationCategory.HISTORICAL, title: 'Historical' },
    { value: LocationCategory.CULTURAL, title: 'Cultural' },
    { value: LocationCategory.NATURAL, title: 'Natural' },
    { value: LocationCategory.RELIGIOUS, title: 'Religious' },
    { value: LocationCategory.CULINARY, title: 'Culinary' },
    { value: LocationCategory.LEGENDS, title: 'Legends' },    
  ];
});

const filteredLocations = computed(() => {
  let filtered = [...locationStore.locations];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(location => 
      location.name.toLowerCase().includes(query) || 
      location.description.toLowerCase().includes(query)
    );
  }
  
  if (categoryFilter.value) {
    filtered = filtered.filter(location => 
      location.category === categoryFilter.value
    );
  }
  
  return filtered;
});

// Methods
function formatCategory(category: LocationCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function selectLocation(location: Location) {
  selectedLocationId.value = location.id;
  router.replace({ query: { location: location.id } });
}

function selectLocationMobile(location: Location) {
  selectedLocationId.value = location.id;
  showLocationDrawer.value = false;
  router.replace({ query: { location: location.id } });
}

// Lifecycle
onMounted(async () => {
  // Load locations if not already loaded
  if (locationStore.locations.length === 0) {
    await locationStore.loadLocations();
  }
  
  // Check if we have a location in the query params
  if (route.query.location) {
    const locationId = route.query.location as string;
    selectedLocationId.value = locationId;
    initialLocationId.value = locationId;
  }
});
</script>

<style scoped>
.map-view {
  height: calc(100vh - 64px); /* Subtract header height */
  position: relative;
}

.location-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.location-list {
  flex: 1;
  overflow-y: auto;
}

.location-list-item {
  transition: background-color 0.2s ease;
}

.location-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.location-fab {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 5;
}

.fill-height {
  height: 100%;
}
</style>