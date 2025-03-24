import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStorage } from '@vueuse/core';

export function useStatusData(key, initialData = [], cacheTimeout = 300000) {
  const cachedData = useStorage(`${key}-data`, null);
  const lastFetchTime = useStorage(`${key}-last-fetch`, 0);
  // Ensure we always have an array
  const data = ref(Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData)));
  const loading = ref(true);

  // For demo purposes - will be replaced with actual API call in production
  const fetchData = (force = false) => {
    const now = Date.now();
    const shouldFetch = force || !cachedData.value || (now - lastFetchTime.value > cacheTimeout);
    
    if (!shouldFetch) {
      data.value = Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData));
      loading.value = false;
      return;
    }
    
    loading.value = true;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ensure data.value is an array before mapping
        const currentData = Array.isArray(data.value) ? data.value : initialData;
        
        const updatedData = currentData.map(service => {
          const randomStatus = Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'degraded' : 'down');
          const randomPing = Math.floor(5 + Math.random() * 25);
          
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
            pingText: `${randomPing}ms`,
            lastOutage: lastOutage
          };
        });
        
        data.value = updatedData;
        cachedData.value = JSON.parse(JSON.stringify(updatedData));
        lastFetchTime.value = now;
        loading.value = false;
        resolve(updatedData);
      }, 1000);
    });
  };

  // Computed properties
  const operationalCount = computed(() => 
    data.value.filter(s => s.status === 'operational').length
  );
  
  const formatTimeSince = (date) => {
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
  };

  // No auto-updates to prevent infinite repeating boxes
  onMounted(() => {
    fetchData();
  });

  return {
    data,
    loading,
    fetchData,
    operationalCount,
    formatTimeSince
  };
}