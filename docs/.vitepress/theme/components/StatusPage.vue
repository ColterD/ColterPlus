<script setup>
import { ref, onMounted } from 'vue';
import { useStatusData } from '../composables/useStatusData';
import { useUIComponents } from '../composables/useUIComponents';

// Initial data structure
const initialServices = [
  { name: 'Media Server', icon: 'film', status: 'loading', uptime: '99.9%', ping: null, lastOutage: null },
  { name: 'Smart Home', icon: 'home', status: 'loading', uptime: '99.5%', ping: null, lastOutage: null },
  { name: 'Storage', icon: 'hard-drive', status: 'loading', uptime: '99.7%', ping: null, lastOutage: null },
  { name: 'Network', icon: 'wifi', status: 'loading', uptime: '99.8%', ping: null, lastOutage: null }
];

// Use our composables
const { 
  data: services, 
  loading, 
  fetchData,
  formatTimeSince,
  startAutoUpdate,
  stopAutoUpdate 
} = useStatusData('services-status', initialServices);

const { getIconSvg, getStatusText, getStatusColor } = useUIComponents();

onMounted(() => {
  startAutoUpdate(30000); // Update every 30 seconds
});
</script>

<template>
  <div class="status-page">
    <h1>Service Status</h1>
    
    <div class="status-summary">
      <div v-if="loading" class="loading-indicator">
        Loading service status...
      </div>
      <div v-else class="status-header">
        <p>All systems are being monitored. Refresh interval: 30 seconds.</p>
        <button @click="fetchData(true)" class="refresh-button">
          Refresh Now
        </button>
      </div>
    </div>
    
    <div class="services-grid">
      <div v-for="service in services" 
           :key="service.name" 
           class="service-card"
           :class="service.status">
        <div class="service-header">
          <div class="service-icon" v-html="getIconSvg(service.icon)"></div>
          <h2>{{ service.name }}</h2>
        </div>
        
        <div class="service-status">
          <span class="status-dot" :style="{ backgroundColor: getStatusColor(service.status) }"></span>
          <span class="status-label">{{ getStatusText(service.status) }}</span>
        </div>
        
        <div class="service-details">
          <div class="detail-item">
            <div class="detail-label">Latency</div>
            <div class="detail-value">{{ service.ping || '—' }} ms</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Uptime</div>
            <div class="detail-value">{{ service.uptime }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Last Outage</div>
            <div class="detail-value">{{ service.lastOutage ? formatTimeSince(service.lastOutage) + ' ago' : 'None' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.status-summary {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.refresh-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid transparent;
}

.service-card.operational {
  border-left-color: var(--status-operational);
}

.service-card.degraded {
  border-left-color: var(--status-degraded);
}

.service-card.down {
  border-left-color: var(--status-down);
}

.service-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.service-icon {
  margin-right: 0.75rem;
  color: var(--vp-c-text-2);
}

.service-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.service-status {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.service-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
}

.loading-indicator {
  text-align: center;
  padding: 1rem;
  color: var(--vp-c-text-2);
}
</style>