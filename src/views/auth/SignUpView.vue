<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="auth-card">
          <v-card-title class="text-center text-h4 pt-6">Sign Up</v-card-title>
          
          <v-card-text class="px-6 py-4">
            <p class="text-center mb-6">Create an account to unlock all features and explore Córdoba's hidden stories.</p>
            
            <div id="sign-up-container"></div>
            
            <v-divider class="my-6"></v-divider>
            
            <p class="text-center">
              Already have an account?               
              <SignUpButton
                  class="mx-1 d-none d-sm-flex"
                /> 
              
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { SignUpButton } from '@clerk/vue'

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  // Wait for Clerk to initialize
  await authStore.waitForInitialization();
  
  // Mount Clerk's sign-up component
  if (authStore.clerk) {
    authStore.clerk.mountSignUp({
      elementId: 'sign-up-container',
      appearance: {
        elements: {
          formButtonPrimary: 'v-btn v-btn--elevated v-btn--block v-btn--color-primary',
          formFieldInput: 'v-field__input',
          socialButtonsBlockButton: 'v-btn v-btn--outlined v-btn--block mb-3',
        }
      },
      routing: 'path',
      path: '/signup',
      afterSignUpUrl: '/map',
      signInUrl: '/signin'
    });
  }
});

// Watch for authentication state to redirect after successful registration
watch(() => authStore.isAuthenticated, (isLoggedIn) => {
  if (isLoggedIn) {
    router.push('/map');
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