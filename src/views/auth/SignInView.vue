<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="auth-card">
          <v-card-title class="text-center text-h4 pt-6">Sign In</v-card-title>
          
          <v-card-text class="px-6 py-4">
            <p class="text-center mb-6">Sign in to access all stories and explore the interactive map of Córdoba.</p>
            
            <div id="sign-in-container"></div>
            
            <v-divider class="my-6"></v-divider>
            
            <p class="text-center">
              Don't have an account? 
              
                <SignInButton                
                  class="mx-1 bg-primary text-white px-4 py-2 rounded-lg "
                />    
              
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { SignInButton } from '@clerk/vue'

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const redirectPath = ref<string | null>(null);

onMounted(async () => {
  // Get redirect path from query if available
  if (route.query.redirect) {
    redirectPath.value = route.query.redirect as string;
  }
  
  // Wait for Clerk to initialize
  await authStore.waitForInitialization();
  
  // Mount Clerk's sign-in component
  if (authStore.clerk) {
    authStore.clerk.mountSignIn({
      elementId: 'sign-in-container',
      appearance: {
        elements: {
          formButtonPrimary: 'v-btn v-btn--elevated v-btn--block v-btn--color-primary',
          formFieldInput: 'v-field__input',
          socialButtonsBlockButton: 'v-btn v-btn--outlined v-btn--block mb-3',
        }
      },
      routing: 'path',
      path: '/signin',
      afterSignInUrl: redirectPath.value || '/map',
      signUpUrl: '/signup'
    });
  }
});

// Watch for authentication state to redirect after successful login
watch(() => authStore.isAuthenticated, (isLoggedIn) => {
  if (isLoggedIn) {
    router.push(redirectPath.value || '/map');
  }
});
</script>

<style scoped>
.auth-card {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

:deep(.cl-card) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.cl-footerAction) {
  display: none !important;
}
</style>