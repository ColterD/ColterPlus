<!-- docs/.vitepress/theme/components/StatusPage.vue -->
<script setup>
import { ref, onMounted } from 'vue';

// Alert status - normally hidden, but can be shown when needed
const alertStatus = ref({
  active: false,
  type: 'maintenance', // can be 'maintenance', 'outage', 'notice'
  message: 'Planned maintenance on Media Server scheduled for March 15th, 2025 from 2:00 AM to 4:00 AM.'
});

// For demonstration, let's add a toggle function
function toggleAlert() {
  alertStatus.value.active = !alertStatus.value.active;
}

// Start with minimal data structure
const services = ref([
  { 
    name: 'Media Server', 
    description: 'Plex/Jellyfin Server', 
    status: 'operational', 
    uptime: '97.3%', 
    ping: 17, 
    lastIncident: '2 days ago',
    history: [99, 100, 98, 100, 100, 100, 99]
  },
  { 
    name: 'Home Assistant', 
    description: 'Smart Home Hub', 
    status: 'operational', 
    uptime: '91.7%', 
    ping: 6, 
    lastIncident: '5 days ago',
    history: [100, 100, 100, 97, 100, 100, 100]
  },
  { 
    name: 'Network Storage', 
    description: 'NAS Server', 
    status: 'operational', 
    uptime: '97.3%', 
    ping: 29, 
    lastIncident: '1 week ago',
    history: [100, 99, 100, 100, 100, 98, 100]
  },
  { 
    name: 'Pi-hole', 
    description: 'Ad Blocking DNS', 
    status: 'operational', 
    uptime: '92.4%', 
    ping: 25, 
    lastIncident: 'Never',
    history: [100, 100, 100, 100, 100, 100, 100]
  },
  { 
    name: 'VPN Server', 
    description: 'OpenVPN/WireGuard', 
    status: 'operational', 
    uptime: '95.5%', 
    ping: 17, 
    lastIncident: '3 days ago',
    history: [100, 100, 95, 100, 100, 100, 99]
  },
  { 
    name: 'Mail Server', 
    description: 'Email/SMTP Service', 
    status: 'operational', 
    uptime: '97.8%', 
    ping: 11, 
    lastIncident: '2 weeks ago',
    history: [100, 100, 100, 99, 98, 100, 100]
  }
]);

const lastUpdate = ref('March 12, 2025, 6:07:08 PM');
const loading = ref(false);

// Simplified functions
function getStatusText(status) {
  switch (status) {
    case 'operational': return 'Operational';
    case 'degraded': return 'Degraded';
    case 'down': return 'Down';
    default: return 'Unknown';
  }
}

function getAlertIcon(type) {
  switch (type) {
    case 'maintenance':
      return '🔧';
    case 'outage':
      return '⚠️';
    case 'notice':
      return 'ℹ️';
    default:
      return '✓';
  }
}

function fetchStatus() {
  // Simple refresh function
  lastUpdate.value = new Date().toLocaleString();
}

// Add this event listener to make tooltips follow cursor - MOVED FROM STYLE SECTION
onMounted(() => {
  if (typeof window !== 'undefined') {
    const historyDays = document.querySelectorAll('.history-day');
    
    historyDays.forEach(day => {
      day.addEventListener('mousemove', (e) => {
        const tooltip = day.querySelector('.day-tooltip');
        if (tooltip) {
          tooltip.style.left = `${e.pageX}px`;
          tooltip.style.top = `${e.pageY - 10}px`;
        }
      });
    });
  }
});
</script>

<template>
  <div class="page-container">
    <div class="status-page">
      <h1>Service Status</h1>
      <p>This page shows the current status of various services hosted at my home. These services are mainly for personal use.</p>

      <div class="status-refresh">
        <button @click="fetchStatus" class="refresh-button">
          <span class="refresh-icon">↻</span>
          Refresh Status
        </button>
        <span class="last-updated">Last updated: {{ lastUpdate }}</span>
      </div>

      <div class="status-overview-row">
        <div class="status-overview">
          <div class="metric-group">
            <div class="metric-value">{{ services.filter(s => s.status === 'operational').length }}/{{ services.length }}</div>
            <div class="metric-label">Systems Operational</div>
          </div>
          
          <div class="metric-group">
            <div class="metric-value">95%</div>
            <div class="metric-label">Average Uptime</div>
          </div>
        </div>
        
        <!-- New alert box that spans columns 2-3 -->
        <div class="status-alert" :class="{ 'active': alertStatus.active, [alertStatus.type]: true }">
          <div class="alert-content">
            <div v-if="alertStatus.active" class="alert-icon alert-warning">{{ getAlertIcon(alertStatus.type) }}</div>
            <div v-else class="alert-icon alert-ok">✓</div>
            <div class="alert-message">
              <span v-if="alertStatus.active">{{ alertStatus.message }}</span>
              <span v-else>All Systems Operational</span>
            </div>
          </div>
          
          <!-- Only for demo - remove in production -->
          <button @click="toggleAlert" class="toggle-alert-btn">Toggle Alert (Demo)</button>
        </div>
      </div>

      <div class="status-container">
        <div v-for="service in services" :key="service.name" class="status-card">
          <div class="status-header">
            <h3>{{ service.name }}</h3>
            <div 
              class="status-indicator" 
              :class="service.status"
              :title="getStatusText(service.status)"
            ></div>
          </div>
          <div class="status-details">
            <p class="service-description">{{ service.description }}</p>
            <p class="status-text">Status: <span :class="'status-' + service.status">{{ getStatusText(service.status) }}</span></p>
            
            <div class="metrics-grid">
              <div class="metric">
                <span class="metric-name">Uptime</span>
                <span class="metric-data">{{ service.uptime }}</span>
              </div>
              <div class="metric">
                <span class="metric-name">Ping</span>
                <span class="metric-data">{{ service.ping }}ms</span>
              </div>
              <div class="metric">
                <span class="metric-name">Last Incident</span>
                <span class="metric-data">{{ service.lastIncident }}</span>
              </div>
            </div>
            
            <!-- Fixed Last 7 days history section -->
            <div class="uptime-history">
              <div class="history-label">Last 7 days:</div>
              <div class="history-bars">
                <div 
                  v-for="(value, index) in service.history" 
                  :key="index" 
                  class="history-day"
                >
                  <div 
                    class="history-bar" 
                    :style="{ height: value + '%' }"
                    :class="{ 'perfect': value === 100 }"
                  ></div>
                  <div class="day-tooltip">
                    <div>Day {{ index + 1 }}</div>
                    <div><strong>{{ value }}%</strong> uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full-width status legend with fixed styling -->
      <div class="status-legend">
        <h3>Status Legend</h3>
        <div class="legend-content">
          <div class="legend-item">
            <span class="legend-dot operational"></span>
            <span>Operational - Service is running normally</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot degraded"></span>
            <span>Degraded - Service is experiencing issues</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot down"></span>
            <span>Down - Service is unavailable</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.status-page {
  width: 100%;
  max-width: 1200px;
  padding: 1rem 2rem;
}

.status-refresh {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
}

.refresh-button:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.refresh-icon {
  display: inline-block;
  transition: transform 0.5s ease;
}

.refresh-button:hover .refresh-icon {
  transform: rotate(180deg);
}

.last-updated {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* New layout for overview and alert */
.status-overview-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .status-overview-row {
    grid-template-columns: 1fr 2fr; /* Adjusted to make alert span more space */
  }
}

.status-overview {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.metric-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  line-height: 1.2;
}

.metric-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* New alert box styling */
.status-alert {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
  border-left: 4px solid #10B981; /* Default color for "all ok" state */
  height: 100%; /* Match the height of the overview */
}

.status-alert.active {
  border-left: 4px solid #EF4444;
}

.status-alert.maintenance {
  border-left: 4px solid #F59E0B;
}

.status-alert.outage {
  border-left: 4px solid #EF4444;
}

.status-alert.notice {
  border-left: 4px solid #3B82F6;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.alert-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-ok {
  color: #10B981;
}

.alert-warning {
  color: #F59E0B;
}

.alert-message {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  flex: 1;
}

/* Demo button - remove in production */
.toggle-alert-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--vp-c-bg-mute);
  border: none;
  border-radius: 4px;
  opacity: 0.7;
  cursor: pointer;
}

.toggle-alert-btn:hover {
  opacity: 1;
}

.status-container {
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Updated media queries for responsive layout */
@media (min-width: 768px) {
  .status-container {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
}

@media (min-width: 1024px) {
  .status-container {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}

.status-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: visible; /* Allow tooltips to be visible outside */
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
}

.status-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  cursor: help;
}

.status-indicator.operational {
  background-color: #10B981;
}

.status-indicator.degraded {
  background-color: #F59E0B;
}

.status-indicator.down {
  background-color: #EF4444;
}

.status-details {
  padding: 1.5rem;
}

.service-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.status-text {
  margin-bottom: 1.2rem;
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

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-mute);
  border-radius: 6px;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-data {
  font-weight: 600;
  font-size: 0.95rem;
}

/* ===== COMPLETELY REDESIGNED HISTORY SECTION ===== */
.uptime-history {
  margin-top: 1.5rem;
}

.history-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.history-bars {
  display: flex;
  align-items: flex-end;
  height: 40px;
  gap: 4px;
  position: relative;
}

.history-day {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.history-bar {
  width: 100%;
  background-color: #10B981;
  border-radius: 2px 2px 0 0;
  min-height: 4px;
  transition: opacity 0.3s;
}

.history-bar.perfect {
  background-color: #059669;
}

.history-day:hover .history-bar {
  opacity: 0.8;
}

/* Fixed tooltip system that won't cause layout shifts */
.day-tooltip {
  position: fixed; /* Using fixed positioning to avoid layout issues */
  bottom: auto;
  left: auto;
  transform: translate(-50%, -100%);
  margin-top: -10px;
  background-color: #1e293b;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  width: max-content;
  max-width: 150px;
  display: none;
  text-align: center;
  z-index: 1000;
  pointer-events: none;
  border: 1px solid #374151;
}

.day-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #1e293b;
}

.history-day:hover .day-tooltip {
  display: block;
}

/* Show tooltips at cursor position */
.history-day:hover {
  cursor: pointer;
}

/* ===== IMPROVED LEGEND STYLING ===== */
.status-legend {
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  width: 100%;
}

.status-legend h3 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
}

.legend-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  min-width: 250px;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.legend-dot.operational {
  background-color: #10B981;
}

.legend-dot.degraded {
  background-color: #F59E0B;
}

.legend-dot.down {
  background-color: #EF4444;
}
</style>