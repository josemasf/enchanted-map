<template>
  <div class="mini-map-container">
    <VMap
      :zoom="14"
      :center="[latitude, longitude]"
      :options="mapOptions"
    >
    <VMapOsmTileLayer />
    <VMapZoomControl />
    <VMapAttributionControl />
      <VMapIconMarker
        :latlng="[latitude, longitude]"
        :options="markerOptions"
        :icon-url="`${baseUrl}markers/location-pin.svg`" 
      />
    </VMap>
  </div>
</template>

<script setup lang="ts">

import { VMap, VMapIconMarker,VMapOsmTileLayer,VMapZoomControl,VMapAttributionControl } from 'vue-map-ui';

const baseUrl = import.meta.env.BASE_URL;

defineProps<{
  latitude: number;
  longitude: number;
}>();

const mapOptions = {
  style: 'streets',  // o el estilo que prefieras
  interactive: true
};

const markerOptions = {
  element: {
    className: 'mini-map-marker',
    style: {
      width: '24px',
      height: '24px',
      backgroundImage: 'url(/markers/location-pin.svg)',
      backgroundSize: 'cover'
    }
  }
};
</script>

<style scoped>
.mini-map-container {
  width: 100%;
  height: 100%;
}

.mini-map-marker {
  cursor: pointer;
}
</style>