// docs/.vitepress/theme/composables/useStatusData.js
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStorage } from '@vueuse/core';

/**
 * Hook for managing service status data
 * @param {string} key - Storage key for caching
 * @param {Array} initialData - Initial service data
 * @param {number} cacheTimeout - Cache timeout in ms
 * @param {number} pollInterval - Optional interval for automatic polling (0 = disabled)
 * @returns {Object} Status data and utilities
 */
export function useStatusData(key, initialData = [], cacheTimeout = 300000, pollInterval = 0) {
  const cachedData = useStorage(`${key}-data`, null);
  const lastFetchTime = useStorage(`${key}-last-fetch`, 0);
  // Ensure we always have an array
  const data = ref(Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData)));
  const loading = ref(true);
  let fetchIntervalId = null;

  /**
   * Generate mock data for development
   * @param {Array} services - Services to generate data for
   * @returns {Array} Generated service data
   */
  function generateMockData(services) {
    return services.map(service => {
      const randomStatus = Math.random() > 0.1 
        ? 'operational' 
        : (Math.random() > 0.5 ? 'degraded' : 'down');
      
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
  }

  /**
   * Fetch real status data from API endpoint
   * @param {Array} services - Current services
   * @returns {Promise<Array>} Updated service data
   */
  async function fetchRealStatusData(services) {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/status');
      
      if (!response.ok) {
        console.error('Failed to fetch status data:', response.statusText);
        return services; // Return current services on error
      }
      
      const apiData = await response.json();
      
      // Map API data to our service format
      return services.map(service => {
        const apiService = apiData.find(s => s.name === service.name);
        
        if (!apiService) return service;
        
        return {
          ...service,
          status: apiService.status || service.status,
          ping: apiService.latency || service.ping,
          pingText: apiService.latency ? `${apiService.latency}ms` : service.pingText,
          lastOutage: apiService.lastOutage ? new Date(apiService.lastOutage) : service.lastOutage
        };
      });
    } catch (error) {
      console.error('Error fetching status data:', error);
      return services; // Return current services on error
    }
  }

  /**
   * Fetch status data with caching
   * @param {boolean} force - Force refresh data
   * @returns {Promise} Promise resolving to updated data
   */
  const fetchData = async (force = false) => {
    const now = Date.now();
    const shouldFetch = force || !cachedData.value || (now - lastFetchTime.value > cacheTimeout);
    
    if (!shouldFetch) {
      data.value = Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData));
      loading.value = false;
      return Promise.resolve(data.value);
    }
    
    loading.value = true;
    
    try {
      // Ensure data.value is an array before processing
      const currentData = Array.isArray(data.value) ? data.value : initialData;
      
      // Use real data in production, mock data in development
      const updatedData = import.meta.env.PROD && !import.meta.env.DEV_MOCKS
        ? await fetchRealStatusData(currentData)
        : generateMockData(currentData);
      
      data.value = updatedData;
      cachedData.value = JSON.parse(JSON.stringify(updatedData));
      lastFetchTime.value = now;
      
      return updatedData;
    } catch (error) {
      console.error('Error updating status data:', error);
      return data.value;
    } finally {
      loading.value = false;
    }
  };

  // Computed properties
  const operationalCount = computed(() => 
    data.value.filter(s => s.status === 'operational').length
  );
  
  /**
   * Format time since a date in a human-readable format
   * @param {Date|null} date - Date to format from
   * @returns {string} Formatted time string
   */
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

  onMounted(() => {
    fetchData();
    
    // Set up polling if interval is specified
    if (pollInterval > 0) {
      fetchIntervalId = setInterval(() => {
        fetchData();
      }, pollInterval);
    }
  });
  
  onUnmounted(() => {
    if (fetchIntervalId) {
      clearInterval(fetchIntervalId);
      fetchIntervalId = null;
    }
  });

  return {
    data,
    loading,
    fetchData,
    operationalCount,
    formatTimeSince
  };
}