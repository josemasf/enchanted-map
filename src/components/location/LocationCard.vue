<template>
  <v-card
    class="location-card"
    elevation="2"
    @click="$emit('click', location)"
    :to="linkEnabled ? `/location/${location.id}` : undefined"
  >
    <v-img
      :src="location.imageUrl"
      height="200"
      cover
      class="location-card-image"
    >
      <div class="location-card-overlay d-flex flex-column justify-end pa-4">
        <div class="mb-2">
          <v-chip color="accent" small>{{ formatCategory(location.category) }}</v-chip>
        </div>
        <h3 class="text-h5 text-white mb-0">{{ location.name }}</h3>
      </div>
    </v-img>
    
    <v-card-text class="pb-0">
      <p class="text-truncate-2">{{ location.description }}</p>
    </v-card-text>
    
    <v-card-actions>
      <v-btn
        variant="text"
        color="primary"
        @click.stop="$emit('showOnMap', location)"
      >
        Show on Map
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        color="primary"
        @click.stop="$emit('readStory', location)"
      >
        Read Story
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { LocationCategory } from '@/types';
import type { Location } from '@/types';

defineProps<{
  location: Location;
  linkEnabled?: boolean;
}>();

defineEmits<{
  (e: 'click', location: Location): void;
  (e: 'showOnMap', location: Location): void;
  (e: 'readStory', location: Location): void;
}>();

// Format category string
function formatCategory(category: LocationCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
</script>

<style scoped>
.location-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.location-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.location-card-image {
  position: relative;
}

.location-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>