<template>
  <v-footer class="bg-primary text-white">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="d-flex flex-column">
          <div class="d-flex align-center mb-4">
            <v-img src="/favicon.svg" width="32" height="32" class="me-2" />
            <span class="text-h6 font-weight-bold">Córdoba Stories</span>
          </div>
          <p class="mb-4">
            Discover the hidden stories of Córdoba, Spain through our interactive map experience.
          </p>
          <div class="d-flex">
            <v-btn icon variant="text" color="white" class="me-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" class="me-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </div>
        </v-col>
        
        <v-col cols="12" md="4" class="d-flex flex-column">
          <h3 class="text-h6 mb-4">Quick Links</h3>
          <v-list bg-color="transparent" class="pa-0">
            <v-list-item to="/" class="pa-0 mb-2">
              <v-list-item-title class="text-white">Home</v-list-item-title>
            </v-list-item>
            <v-list-item to="/map" class="pa-0 mb-2">
              <v-list-item-title class="text-white">Explore Map</v-list-item-title>
            </v-list-item>
            <v-list-item to="/about" class="pa-0 mb-2">
              <v-list-item-title class="text-white">About</v-list-item-title>
            </v-list-item>
            <v-list-item to="/signin" class="pa-0">
              <v-list-item-title class="text-white">Sign In</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" md="4" class="d-flex flex-column">
          <h3 class="text-h6 mb-4">Contact</h3>
          <div class="d-flex align-center mb-3">
            <v-icon color="white" class="me-2">mdi-email</v-icon>
            <span>info@cordobastories.com</span>
          </div>
          <div class="d-flex align-center mb-3">
            <v-icon color="white" class="me-2">mdi-phone</v-icon>
            <span>+34 123 456 789</span>
          </div>
          <div class="d-flex align-center">
            <v-icon color="white" class="me-2">mdi-map-marker</v-icon>
            <span>Córdoba, Spain</span>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4 bg-white"></v-divider>
      
      <div class="text-center">
        &copy; {{ new Date().getFullYear() }} Córdoba Stories. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>