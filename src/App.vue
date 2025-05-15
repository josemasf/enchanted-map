<template>
  <v-app>
    <app-header />
    
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

const authStore = useAuthStore();
// const router = useRouter();

onMounted(async () => {
  await authStore.initClerk();
});
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-main {
  flex: 1;
  background-color: var(--color-background);
}
</style>