import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Clerk from '@clerk/clerk-js';

// Define Clerk types
interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddresses: Array<{ emailAddress: string }>;
  profileImageUrl: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const clerk = ref<any>(null);
  const user = ref<User | null>(null);
  const isLoading = ref(true);
  const isInitialized = ref(false);
  const initializationPromise = ref<Promise<void> | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userFullName = computed(() => {
    if (!user.value) return '';
    return `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim();
  });
  const userEmail = computed(() => {
    if (!user.value || !user.value.emailAddresses.length) return '';
    return user.value.emailAddresses[0].emailAddress;
  });
  const userInitials = computed(() => {
    if (!user.value) return '';
    const firstName = user.value.firstName || '';
    const lastName = user.value.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  });

  // Actions
  async function initClerk() {
    if (initializationPromise.value) {
      return initializationPromise.value;
    }

    initializationPromise.value = new Promise<void>(async (resolve) => {
      try {
        isLoading.value = true;
        const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        
        if (!publishableKey) {
          throw new Error('Clerk publishable key is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment.');
        }
        
        clerk.value = new Clerk(publishableKey);
        
        await clerk.value.load({
          appearance: {
            elements: {
              rootBox: 'mx-auto',
              card: 'rounded-lg shadow-md',
              formButtonPrimary: 'bg-primary text-white rounded-lg',
              formFieldInput: 'rounded border p-2',
              socialButtonsBlockButton: 'border rounded-lg p-2 mb-2'
            }
          }
        });
        
        if (clerk.value.user) {
          user.value = clerk.value.user;
        }
        
        // Set up auth state change listener
        clerk.value.addListener((newState: any) => {
          user.value = newState.user || null;
        });
        
        isInitialized.value = true;
        resolve();
      } catch (error) {
        console.error('Failed to initialize Clerk:', error);
        isInitialized.value = true;
        resolve();
      } finally {
        isLoading.value = false;
      }
    });
    
    return initializationPromise.value;
  }

  async function waitForInitialization() {
    if (isInitialized.value) return;
    if (initializationPromise.value) {
      return initializationPromise.value;
    }
    return initClerk();
  }

  async function signOut() {
    if (!clerk.value) return;
    
    try {
      await clerk.value.signOut();
      user.value = null;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  return {
    // State
    clerk,
    user,
    isLoading,
    isInitialized,
    
    // Getters
    isAuthenticated,
    userFullName,
    userEmail,
    userInitials,
    
    // Actions
    initClerk,
    waitForInitialization,
    signOut
  };
});