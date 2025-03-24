<!-- docs/.vitepress/theme/components/HomeStatus.vue -->
<script setup>
import { ref, onMounted, onUnmounted, watch, toRaw } from 'vue';
import { useStorage, useIntervalFn } from '@vueuse/core';

// Use storage to cache data and last fetch time
const cachedServices = useStorage('home-status-services', null);
const lastFetchTime = useStorage('home-status-last-fetch', 0);
const CACHE_TIMEOUT = 300000; // 5 minutes

const services = ref([
  { 
    name: 'Media Server', 
    icon: 'film', 
    status: 'loading', 
    uptime: '0%', 
    ping: null, 
    lastOutage: null 
  },
  { 
    name: 'Smart Home', 
    icon: 'home', 
    status: 'loading', 
    uptime: '0%', 
    ping: null, 
    lastOutage: null 
  },
  { 
    name: 'Storage', 
    icon: 'hard-drive', 
    status: 'loading', 
    uptime: '0%', 
    ping: null, 
    lastOutage: null 
  },
  { 
    name: 'Network', 
    icon: 'wifi', 
    status: 'loading', 
    uptime: '0%', 
    ping: null, 
    lastOutage: null 
  }
]);

const loading = ref(true);
const showToast = ref(false);
const toastMessage = ref('');
const error = ref(null);

// Status change tracking
const statusChangeDetector = (oldServices, newServices) => {
  newServices.forEach((service, index) => {
    const oldService = oldServices[index];
    if (oldService.status === 'operational' && service.status !== 'operational') {
      showStatusToast(`${service.name} status changed to ${service.status}`);
    }
  });
};

// Enhanced function to format time since last outage
function formatTimeSince(date) {
  if (!date) return 'N/A';
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  // Days
  const days = Math.floor(seconds / 86400);
  
  // Hours
  const hoursSeconds = seconds % 86400;
  const hours = Math.floor(hoursSeconds / 3600);
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  
  if (hours > 0) {
    const minutesSeconds = hoursSeconds % 3600;
    const minutes = Math.floor(minutesSeconds / 60);
    return `${hours}h ${minutes}m`;
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m`;
  }
  
  return `${Math.floor(seconds)}s`;
}

async function fetchStatus(force = false) {
  const now = Date.now();
  const shouldFetch = force || !cachedServices.value || (now - lastFetchTime.value > CACHE_TIMEOUT);
  
  if (!shouldFetch) {
    // Use cached data
    if (cachedServices.value) {
      // Store old services for status change detection
      const oldServices = toRaw(services.value);
      // Update services with cached data
      services.value = cachedServices.value;
      loading.value = false;
      
      // Check for status changes
      statusChangeDetector(oldServices, services.value);
    }
    return;
  }
  
  loading.value = true;
  error.value = null;
  
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store old services for status change detection
    const oldServices = toRaw(services.value);
    
    // Update services with new data
    const updatedServices = services.value.map(service => {
      // Mock data generation
      const randomStatus = Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'degraded' : 'down');
      const randomPing = Math.floor(5 + Math.random() * 25);
      
      // Random date for last outage
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 30) + 1;
      const hoursAgo = Math.floor(Math.random() * 24);
      const lastOutage = new Date(now);
      lastOutage.setDate(lastOutage.getDate() - daysAgo);
      lastOutage.setHours(lastOutage.getHours() - hoursAgo);
      
      return {
        ...service,
        status: randomStatus,
        ping: randomPing,
        lastOutage: lastOutage
      };
    });
    
    services.value = updatedServices;
    cachedServices.value = updatedServices;
    lastFetchTime.value = now;
    
    // Check for status changes
    statusChangeDetector(oldServices, updatedServices);
  } catch (err) {
    error.value = 'Failed to fetch service status. Please try again later.';
    console.error('Error fetching status:', err);
  } finally {
    loading.value = false;
  }
}

function showStatusToast(message) {
  toastMessage.value = message;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
}

function getIconSvg(icon) {
  // Existing implementation...
}

// Automatically refresh status at intervals
const { pause, resume } = useIntervalFn(() => {
  fetchStatus(true);
}, CACHE_TIMEOUT);

onMounted(() => {
  fetchStatus();
  resume();
});

onUnmounted(() => {
  pause();
});
</script>

<template>
  <div class="home-status-dashboard">
    <h2 class="status-heading" id="service-status" aria-label="Service Status Dashboard">Service Status</h2>
    
    <div class="status-grid">
      <div v-for="service in services" 
           :key="service.name" 
           class="status-card"
           :class="{ 'loading': loading }"
           :aria-label="`${service.name} status: ${loading ? 'Checking' : service.status}`">
        <div class="status-icon" v-html="getIconSvg(service.icon)" role="img" :aria-label="`${service.name} icon`"></div>
        <h3 class="service-name">{{ service.name }}</h3>
        <div class="status-indicator">
          <!-- Fixed status dot that will always show with the correct color -->
          <span 
            class="status-dot" 
            :class="{
              'operational': service.status === 'operational',
              'degraded': service.status === 'degraded',
              'down': service.status === 'down',
              'loading': service.status === 'loading'
            }"
          ></span>
          <span class="status-text">{{ loading ? 'Checking...' : (service.status === 'operational' ? 'Online' : service.status === 'degraded' ? 'Issues' : 'Offline') }}</span>
        </div>
        <div class="stats-row">
          <div class="stat">
            <span class="stat-label">PING</span>
            <span class="stat-value">{{ !loading ? `${service.ping}ms` : '—' }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">UPTIME</span>
            <span class="stat-value">{{ !loading ? formatTimeSince(service.lastOutage) : '—' }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <a href="/status" class="status-link" aria-label="View detailed service status page">View detailed status</a>
    
    <!-- New separator line -->
    <div class="status-separator"></div>
    
    <!-- Toast notification for critical status changes (hidden by default) -->
    <div class="status-toast" :class="{ 'show': showToast }" role="alert" aria-live="polite">
      <div class="status-toast-content">
        <span class="status-toast-icon">⚠️</span>
        <span class="status-toast-message">{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-status-dashboard {
  max-width: 800px;
  margin: 2rem auto 3rem;
  text-align: center;
  position: relative; /* For toast positioning */
}

.status-heading {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .status-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.status-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, border 0.2s, box-shadow 0.2s;
  border: 1px solid transparent;
  min-height: 175px; /* Fixed height to prevent layout shifting */
}

.status-card:hover {
  border-color: var(--vp-c-divider);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.status-card.loading {
  opacity: 0.9;
}

.status-icon {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
  transition: transform 0.3s;
}

.status-card:hover .status-icon {
  transform: scale(1.1);
}

.service-name {
  font-size: 1rem;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.3s; /* Animation for status changes */
}

/* Define colors directly in CSS classes instead of inline styles */
.status-dot.operational {
  background-color: #10b981; /* green */
}

.status-dot.degraded {
  background-color: #f59e0b; /* amber */
}

.status-dot.down {
  background-color: #ef4444; /* red */
}

.status-dot.loading {
  background-color: #6b7280; /* gray */
}

.status-card:hover .status-dot {
  transform: scale(1.5);
}

.status-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stats-row {
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  justify-content: space-around;
  gap: 0.5rem;
  min-height: 40px; /* Fixed height to prevent layout shifting */
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  min-height: 1.2em; /* Ensure consistent height */
  display: block; /* Ensure block display for consistent spacing */
}

.status-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s, transform 0.2s;
}

.status-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
  transform: translateY(-1px);
}

/* Add the separator line */
.status-separator {
  border-top: 1px solid var(--vp-c-divider);
  margin: 2rem auto 0;
  max-width: 600px;
}

/* Toast notification for status changes */
.status-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  z-index: 100;
  transform: translateY(150%);
  transition: transform 0.3s ease-out;
  max-width: 300px;
}

.status-toast.show {
  transform: translateY(0);
}

.status-toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-toast-icon {
  font-size: 1.2rem;
}

.status-toast-message {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

/* Status change animations */
@keyframes statusPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

.status-dot.status-changed {
  animation: statusPulse 0.6s ease-in-out;
}
</style>