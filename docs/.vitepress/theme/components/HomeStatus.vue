<script setup>
import { ref, onMounted } from 'vue';

const services = ref([
  { name: 'Media Server', icon: 'film', status: 'loading', uptime: '0%' },
  { name: 'Smart Home', icon: 'home', status: 'loading', uptime: '0%' },
  { name: 'Storage', icon: 'hard-drive', status: 'loading', uptime: '0%' },
  { name: 'Network', icon: 'wifi', status: 'loading', uptime: '0%' }
]);

const loading = ref(true);

// This would ideally fetch from your own API endpoint that checks your services
// For demo purposes, we're simulating with random statuses
function fetchStatus() {
  loading.value = true;
  
  setTimeout(() => {
    services.value = services.value.map(service => {
      // In a real implementation, this data would come from your API
      const randomStatus = Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'degraded' : 'down');
      const randomUptime = (90 + Math.random() * 9.9).toFixed(1) + '%';
      
      return {
        ...service,
        status: randomStatus,
        uptime: randomUptime
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
        <div class="status-details">
          <h3 class="service-name">{{ service.name }}</h3>
          <div class="status-indicator">
            <span class="status-dot" :style="{ backgroundColor: getStatusColor(service.status) }"></span>
            <span class="status-text">{{ loading ? 'Checking...' : (service.status === 'operational' ? 'Online' : service.status === 'degraded' ? 'Issues' : 'Offline') }}</span>
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
  margin-bottom: 1.5rem;
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
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-card.loading {
  opacity: 0.7;
}

.status-icon {
  margin-bottom: 0.75rem;
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