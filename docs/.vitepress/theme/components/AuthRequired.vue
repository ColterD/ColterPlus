<script setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

const props = defineProps({
  requiredRole: {
    type: String,
    default: 'user'
  }
});

const isAuthenticated = useStorage('is-authenticated', false);
const userRole = useStorage('user-role', null);
const password = ref('');
const error = ref(false);

const checkAuth = () => {
  // In a real app, use a secure auth mechanism
  // This is just for demo purposes
  if (password.value === 'demo-password') {
    isAuthenticated.value = true;
    userRole.value = 'admin';
    error.value = false;
  } else {
    error.value = true;
  }
};

const logout = () => {
  isAuthenticated.value = false;
  userRole.value = null;
};

const hasAccess = computed(() => {
  if (!isAuthenticated.value) return false;
  
  // Simple role check - expand as needed
  if (props.requiredRole === 'admin' && userRole.value !== 'admin') {
    return false;
  }
  
  return true;
});
</script>

<template>
  <div>
    <div v-if="!isAuthenticated" class="auth-form">
      <h2>Authentication Required</h2>
      <p>Please enter your password to access this page</p>
      
      <div class="form-group">
        <input 
          type="password" 
          v-model="password" 
          placeholder="Password"
          @keyup.enter="checkAuth" 
          class="password-input"
        />
        <button @click="checkAuth" class="auth-button">Login</button>
      </div>
      
      <p v-if="error" class="error-message">Invalid password</p>
    </div>
    
    <div v-else-if="!hasAccess" class="access-denied">
      <h2>Access Denied</h2>
      <p>You don't have the required permissions to view this page.</p>
      <button @click="logout" class="auth-button">Logout</button>
    </div>
    
    <div v-else>
      <!-- Content for authenticated users -->
      <div class="auth-header">
        <slot name="auth-header">
          <button @click="logout" class="logout-button">Logout</button>
        </slot>
      </div>
      
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth-form, .access-denied {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.form-group {
  display: flex;
  margin: 1.5rem 0;
}

.password-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.auth-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-weight: 500;
  cursor: pointer;
}

.error-message {
  color: var(--status-down);
  font-size: 0.9rem;
}

.auth-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}
</style>