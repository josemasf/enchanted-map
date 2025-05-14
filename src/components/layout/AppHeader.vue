<template>
  <v-app-bar flat color="white" elevation="1">
    <template v-slot:prepend>
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img src="/favicon.svg" width="32" height="32" class="me-2" />
        <span class="app-title text-primary font-weight-bold">Córdoba Stories</span>
      </router-link>
    </template>

    <v-spacer></v-spacer>
    
    <!-- Navigation links for desktop -->
    <div class="d-none d-md-flex">
      <v-btn variant="text" to="/" class="mx-1">Home</v-btn>
      <v-btn variant="text" to="/map" class="mx-1">Explore Map</v-btn>
      <v-btn variant="text" to="/about" class="mx-1">About</v-btn>
    </div>

    <v-spacer></v-spacer>

    
    <!-- Auth buttons -->
    <template v-if="!authStore.isAuthenticated">
      <SignInButton
        class="mx-1 d-none d-sm-flex"
       />    
    </template>
    
    <template v-else>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon
          >
            <v-avatar color="primary" v-if="!authStore.user?.profileImageUrl">
              <span class="text-h6 font-weight-bold">{{ authStore.userInitials }}</span>
            </v-avatar>
            <v-avatar v-else>
              <v-img :src="authStore.user?.profileImageUrl" alt="Profile" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-account-circle"></v-icon>
            </template>
            <v-list-item-title>
              {{ authStore.userFullName || authStore.userEmail }}
            </v-list-item-title>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item link @click="logout">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon 
      class="d-md-none" 
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </v-app-bar>

  <!-- Mobile navigation drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
  >
    <v-list>
      <v-list-item title="Córdoba Stories" prepend-icon="mdi-map-marker">
        <template v-slot:append>
          <v-btn icon @click.stop="drawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>
      
      <v-list-item to="/" title="Home" prepend-icon="mdi-home"></v-list-item>
      <v-list-item to="/map" title="Explore Map" prepend-icon="mdi-map"></v-list-item>
      <v-list-item to="/about" title="About" prepend-icon="mdi-information"></v-list-item>
      
      <v-divider></v-divider>
      
      <template v-if="!authStore.isAuthenticated">
        <v-list-item to="/signin" title="Sign In" prepend-icon="mdi-login"></v-list-item>
        <v-list-item to="/signup" title="Sign Up" prepend-icon="mdi-account-plus"></v-list-item>
      </template>
      <template v-else>
        <v-list-item @click="logout" title="Sign Out" prepend-icon="mdi-logout"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import { SignInButton } from '@clerk/vue'


const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false);

async function logout() {
  try {
    await authStore.signOut();
    drawer.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

<style scoped>
.app-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
}
</style>