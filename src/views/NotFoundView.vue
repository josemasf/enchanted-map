<template>
  <v-container class="d-flex flex-column align-center justify-center text-center py-12">
    <v-img
      src="https://images.pexels.com/photos/5309608/pexels-photo-5309608.jpeg"
      max-width="400"
      class="mb-8 rounded-xl"
    ></v-img>
    
    <h1 class="text-h2 mb-4">Page Not Found</h1>
    <p class="text-h6 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
    
    <div class="d-flex">
      <v-btn
        color="primary"
        size="large"
        to="/"
        class="mx-2"
      >
        Go Home
      </v-btn>
      <v-btn
        variant="outlined"
        color="secondary"
        size="large"
        to="/map"
        class="mx-2"
      >
        Explore Map
      </v-btn>
    </div>
  </v-container>
</template>