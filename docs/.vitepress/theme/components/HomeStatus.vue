<script setup>
import { ref, onMounted } from 'vue';
import { useStatusData } from '../composables/useStatusData';
import { useUIComponents } from '../composables/useUIComponents';

// Initial data structure
const initialServices = [
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
];

// Use our composables
const { 
  data: services, 
  loading, 
  operationalCount, 
  fetchData,
  formatTimeSince 
} = useStatusData('home-status', initialServices);

const { getIconSvg } = useUIComponents();

// Toast notifications
const showToast = ref(false);
const toastMessage = ref('');

function showStatusToast(message) {
  toastMessage.value = message;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
}

onMounted(() => {
  fetchData();
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
    
    <div class="status-separator"></div>
    
    <div class="status-toast" :class="{ 'show': showToast }" role="alert" aria-live="polite">
      <div class="status-toast-content">
        <span class="status-toast-icon">⚠️</span>
        <span class="status-toast-message">{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep the existing styles */
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
  transition: transform 0.3s;
}

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
  min-height: 1.2em;
  display: block;
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

.status-separator {
  border-top: 1px solid var(--vp-c-divider);
  margin: 2rem auto 0;
  max-width: 600px;
}

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

@keyframes statusPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

.status-dot.status-changed {
  animation: statusPulse 0.6s ease-in-out;
}
</style>