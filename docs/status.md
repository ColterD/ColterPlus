---
title: Service Status
description: Check the status of our services
---

<script setup>
import { ref, onMounted } from 'vue';

const services = ref([
  { name: 'Media Server', description: 'Plex/Jellyfin Server', status: 'loading', uptime: '0%', lastChecked: null },
  { name: 'Home Assistant', description: 'Smart Home Hub', status: 'loading', uptime: '0%', lastChecked: null },
  { name: 'Network Storage', description: 'NAS Server', status: 'loading', uptime: '0%', lastChecked: null },
  { name: 'Pi-hole', description: 'Ad Blocking DNS', status: 'loading', uptime: '0%', lastChecked: null },
  { name: 'VPN Server', description: 'OpenVPN/WireGuard', status: 'loading', uptime: '0%', lastChecked: null },
]);

const lastUpdate = ref('');
const loading = ref(true);

// This would ideally fetch from your own API endpoint that checks your services
// For demo purposes, we're simulating with random statuses
function fetchStatus() {
  loading.value = true;
  
  // Simulate API call with timeout
  setTimeout(() => {
    services.value = services.value.map(service => {
      // In a real implementation, this data would come from your API
      const randomStatus = Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'degraded' : 'down');
      const randomUptime = (90 + Math.random() * 9.9).toFixed(1) + '%';
      
      return {
        ...service,
        status: randomStatus,
        uptime: randomUptime,
        lastChecked: new Date()
      };
    });
    
    lastUpdate.value = new Date().toLocaleString();
    loading.value = false;
  }, 1500);
}

function getStatusColor(status) {
  switch (status) {
    case 'loading': return 'bg-gray-300';
    case 'operational': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'down': return 'bg-red-500';
    default: return 'bg-gray-300';
  }
}

function getStatusText(status) {
  switch (status) {
    case 'loading': return 'Checking...';
    case 'operational': return 'Operational';
    case 'degraded': return 'Degraded';
    case 'down': return 'Down';
    default: return 'Unknown';
  }
}

onMounted(() => {
  fetchStatus();
});
</script>

# Service Status

This page shows the current status of various services hosted at my home. These services are mainly for personal use.

<div class="status-refresh">
  <button @click="fetchStatus" :disabled="loading" class="refresh-button">
    {{ loading ? 'Refreshing...' : 'Refresh Status' }}
  </button>
  <span v-if="lastUpdate" class="last-updated">Last updated: {{ lastUpdate }}</span>
</div>

<div class="status-container">
  <div v-for="service in services" :key="service.name" class="status-card">
    <div class="status-header">
      <h3>{{ service.name }}</h3>
      <div :class="['status-indicator', getStatusColor(service.status)]"></div>
    </div>
    <div class="status-details">
      <p class="service-description">{{ service.description }}</p>
      <p class="status-text">Status: <span :class="'status-' + service.status">{{ getStatusText(service.status) }}</span></p>
      <p class="uptime">Uptime: {{ service.uptime }}</p>
    </div>
  </div>
</div>

<div class="status-legend">
  <h3>Status Legend</h3>
  <div class="legend-item">
    <div class="status-indicator bg-green-500"></div>
    <span>Operational - Service is running normally</span>
  </div>
  <div class="legend-item">
    <div class="status-indicator bg-yellow-500"></div>
    <span>Degraded - Service is experiencing issues</span>
  </div>
  <div class="legend-item">
    <div class="status-indicator bg-red-500"></div>
    <span>Down - Service is unavailable</span>
  </div>
</div>

<style>
.status-refresh {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.refresh-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.refresh-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.refresh-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.last-updated {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.status-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.status-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
}

.status-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.bg-green-500 {
  background-color: #10B981;
}

.bg-yellow-500 {
  background-color: #F59E0B;
}

.bg-red-500 {
  background-color: #EF4444;
}

.bg-gray-300 {
  background-color: #D1D5DB;
}

.status-details {
  padding: 1rem 1.5rem;
}

.service-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.status-text {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.status-operational {
  color: #10B981;
}

.status-degraded {
  color: #F59E0B;
}

.status-down {
  color: #EF4444;
}

.uptime {
  font-size: 0.9rem;
}

.status-legend {
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.status-legend h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.legend-item .status-indicator {
  margin-right: 0.75rem;
}
</style>