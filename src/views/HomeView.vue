<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <v-container class="h-100 d-flex align-center">
        <v-row align="center">
          <v-col cols="12" md="6" class="hero-content">
            <h1 class="text-h2 font-weight-bold mb-4">Discover Córdoba's Hidden Stories</h1>
            <p class="text-body-1 mb-6">
              Explore the historic streets of Córdoba, Spain through our interactive map. Uncover the stories behind its most iconic and hidden locations.
            </p>
            <div class="d-flex flex-wrap">
              <v-btn 
                color="primary" 
                size="large" 
                class="me-3 mb-3"
                to="/map"
              >
                Explore Map
              </v-btn>
              <v-btn 
                variant="outlined" 
                color="secondary" 
                size="large"
                class="mb-3"
                to="/about"
              >
                Learn More
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-none d-md-flex justify-center">
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Centro_Hist%C3%B3rico%2C_16.9_--_2023_--_C%C3%B3rdoba%2C_Espa%C3%B1a.jpg"
              max-width="500"
              class="rounded-xl elevation-10"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Featured Locations Section -->
    <section class="featured-locations py-12">
      <v-container>
        <h2 class="text-h3 text-center mb-8">Featured Locations</h2>
        
        <v-row v-if="!locationStore.isLoading && locationStore.locations.length > 0">
          <v-col
            v-for="location in featuredLocations"
            :key="location.id"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <location-card
              :location="location"
              :link-enabled="authStore.isAuthenticated"
              @read-story="navigateToLocation"
              @show-on-map="navigateToMapWithLocation"
            />
          </v-col>
        </v-row>
        
        <v-row v-else-if="locationStore.isLoading">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-col>
        </v-row>
        
        <v-row v-else>
          <v-col cols="12" class="text-center">
            <p>No locations available.</p>
          </v-col>
        </v-row>
        
        <div class="text-center mt-8">
          <v-btn 
            color="secondary" 
            variant="outlined" 
            size="large" 
            to="/map"
          >
            View All Locations
          </v-btn>
        </div>
      </v-container>
    </section>
    
    <!-- How It Works Section -->
    <section class="how-it-works py-12 bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h3 text-center mb-8">How It Works</h2>
        
        <v-row>
          <v-col cols="12" md="4" class="mb-4">
            <template v-if="!authStore.isAuthenticated">
              <v-card height="100%" class="d-flex flex-column">
                <div class="pa-4 text-center">
                  <v-icon color="primary" size="64">mdi-account</v-icon>
                </div>
                <v-card-title class="text-center">Create an Account</v-card-title>
                <v-card-text class="text-center flex-grow-1">
                  Sign up to unlock full access to all the locations and stories of Córdoba.
                </v-card-text>
                <v-card-actions class="justify-center pa-4">
                  <v-btn 
                    color="primary" 
                    variant="text" 
                    to="/signup"
                  >
                    Sign Up Now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
            
            <template v-else>
              <v-card height="100%" class="d-flex flex-column">
                <div class="pa-4 text-center">
                  <v-avatar size="x-large">
                    <v-img :src="authStore.user?.profileImageUrl" alt="Profile" height="70" width="70" />
                  </v-avatar>
                </div>
                <v-card-title class="text-center">You are logged</v-card-title>
                <v-card-text class="text-center flex-grow-1">
                  You are logged in as {{ authStore.userFullName || authStore.userEmail }}.
                  <p class="mt-2">Explore the map and read stories about your favorite locations.</p>
                  <p class="mt-2">Click the button below to log out.</p>
                </v-card-text>
                <v-card-actions class="justify-center pa-4">
                  <v-btn 
                    color="primary" 
                    variant="text" 
                    @click="logout"
                  >
                    Log Out
                  </v-btn>
                </v-card-actions>
              </v-card>
             
            </template>
            
          </v-col>
          
          <v-col cols="12" md="4" class="mb-4">
            <v-card height="100%" class="d-flex flex-column">
              <div class="pa-4 text-center">
                <v-icon color="primary" size="64">mdi-map</v-icon>
              </div>
              <v-card-title class="text-center">Explore the Map</v-card-title>
              <v-card-text class="text-center flex-grow-1">
                Navigate through our interactive map to discover points of interest throughout Córdoba.
              </v-card-text>
              <v-card-actions class="justify-center pa-4">
                <v-btn 
                  color="primary" 
                  variant="text" 
                  to="/map"
                >
                  View Map
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4" class="mb-4">
            <v-card height="100%" class="d-flex flex-column">
              <div class="pa-4 text-center">
                <v-icon color="primary" size="64">mdi-book-open-variant</v-icon>
              </div>
              <v-card-title class="text-center">Read Stories</v-card-title>
              <v-card-text class="text-center flex-grow-1">
                Dive into the rich history and fascinating stories behind each location.
              </v-card-text>
              <v-card-actions class="justify-center pa-4">
                <v-btn 
                  color="primary" 
                  variant="text" 
                  :disabled="!authStore.isAuthenticated"
                  to="/map"
                >
                  Discover Stories
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- CTA Section -->
    <section class="cta py-12 bg-primary text-white">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 mb-4">Ready to Explore Córdoba?</h2>
            <p class="text-body-1 mb-6">
              Sign up now to unlock all locations and start your journey through the rich history and culture of this ancient city.
            </p>
            <v-btn 
              color="white" 
              variant="elevated" 
              size="large"
              to="/signup"
              class="me-3"
            >
              Sign Up
            </v-btn>
            <v-btn 
              color="white" 
              variant="outlined" 
              size="large"
              to="/map"
            >
              Explore Map
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLocationStore } from '@/stores/locations';
import LocationCard from '@/components/location/LocationCard.vue';
import type { Location } from '@/types';

const router = useRouter();
const authStore = useAuthStore();
const locationStore = useLocationStore();

// Computed Properties
const featuredLocations = computed(() => {
  return locationStore.locations.slice(0, 6);
});

// Methods
function navigateToLocation(location: Location) {
  if (authStore.isAuthenticated) {
    router.push(`/location/${location.id}`);
  } else {
    router.push('/signin');
  }
}

function navigateToMapWithLocation(location: Location) {
  if (authStore.isAuthenticated) {
    router.push({ 
      path: '/map', 
      query: { location: location.id } 
    });
  } else {
    router.push('/map');
  }
}

async function logout() {
  try {
    await authStore.signOut();        
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

// Lifecycle Hooks
onMounted(async () => {
  if (locationStore.locations.length === 0) {
    await locationStore.loadLocations();
  }
});
</script>

<style scoped>
.hero {
  min-height: 30vh;
  background-color: var(--color-background);
  position: relative;
}

.hero-content {
  z-index: 2;
}

.cta {
  background-color: var(--color-primary);
}
</style>