<!-- docs/.vitepress/theme/components/HomeStatus.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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

// Enhanced function to format time since last outage with hours
function formatTimeSince(date) {
  if (!date) return 'N/A';
  
  const seconds = Math.floor((new Date() - date) / 1000);
  
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

function fetchStatus() {
  loading.value = true;
  
  setTimeout(() => {
    services.value = services.value.map(service => {
      // In a real implementation, this data would come from your API
      const randomStatus = Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'degraded' : 'down');
      const randomPing = Math.floor(5 + Math.random() * 25); // Random ping between 5-30ms
      
      // Random date between 1-30 days ago for last outage
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
    
    loading.value = false;
  }, 1000);
}

function getIconSvg(icon) {
  switch (icon) {
    case 'film':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect><line x1="7" x2="7" y1="2" y2="22"></line><line x1="17" x2="17" y1="2" y2="22"></line><line x1="2" x2="22" y1="12" y2="12"></line><line x1="2" x2="7" y1="7" y2="7"></line><line x1="2" x2="7" y1="17" y2="17"></line><line x1="17" x2="22" y1="17" y2="17"></line><line x1="17" x2="22" y1="7" y2="7"></line></svg>';
    case 'home':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
    case 'hard-drive':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" x2="6.01" y1="16" y2="16"></line><line x1="10" x2="10.01" y1="16" y2="16"></line></svg>';
    case 'wifi':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" x2="12.01" y1="20" y2="20"></line></svg>';
    default:
      return '';
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'loading': return '#6b7280';
    case 'operational': return '#10b981';
    case 'degraded': return '#f59e0b';
    case 'down': return '#ef4444';
    default: return '#6b7280';
  }
}

onMounted(() => {
  fetchStatus();
  // Set up periodic refresh
  const intervalId = setInterval(fetchStatus, 60000); // Refresh every minute
  
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<template>
  <div class="home-status-dashboard">
    <h2 class="status-heading">Service Status</h2>
    
    <div class="status-grid">
      <div v-for="service in services" 
           :key="service.name" 
           class="status-card"
           :class="{ 'loading': loading }">
        <div class="status-icon" v-html="getIconSvg(service.icon)"></div>
        <h3 class="service-name">{{ service.name }}</h3>
        <div class="status-indicator">
          <span class="status-dot" :style="{ backgroundColor: getStatusColor(service.status) }"></span>
          <span class="status-text">{{ loading ? 'Checking...' : (service.status === 'operational' ? 'Online' : service.status === 'degraded' ? 'Issues' : 'Offline') }}</span>
        </div>
        <div class="stats-row" v-if="!loading">
          <div class="stat">
            <span class="stat-label">PING</span>
            <span class="stat-value">{{ service.ping }}ms</span>
          </div>
          <div class="stat">
            <span class="stat-label">UPTIME</span>
            <span class="stat-value">{{ formatTimeSince(service.lastOutage) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <a href="/status" class="status-link">View detailed status</a>
  </div>
</template>

<style scoped>
.home-status-dashboard {
  max-width: 800px;
  margin: 2rem auto 3rem;
  text-align: center;
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
  transition: border 0.2s;
  border: 1px solid transparent;
}

.status-card:hover {
  border-color: var(--vp-c-divider);
}

.status-card.loading {
  opacity: 0.7;
}

.status-icon {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
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
}

.status-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.status-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}
</style>