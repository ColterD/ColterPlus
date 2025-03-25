// docs/.vitepress/theme/composables/useStatusData.ts
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { formatTimeSince } from '../../utils/dateUtils';

export interface ServiceStatus {
  name: string;
  icon: string;
  status: 'operational' | 'degraded' | 'down' | 'loading';
  uptime: string;
  ping: number | null;
  pingText?: string;
  lastOutage: Date | null;
}

export function useStatusData(
  key: string, 
  initialData: ServiceStatus[] = [], 
  cacheTimeout = 300000, 
  pollInterval = 0
) {
  const cachedData = useStorage<ServiceStatus[] | null>(`${key}-data`, null);
  const lastFetchTime = useStorage<number>(`${key}-last-fetch`, 0);
  const data = ref<ServiceStatus[]>(Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData)));
  const loading = ref(true);
  let fetchIntervalId: number | null = null;

  function generateMockData(services: ServiceStatus[]): ServiceStatus[] {
    return services.map(service => {
      const randomStatus = Math.random() > 0.1 
        ? 'operational' 
        : (Math.random() > 0.5 ? 'degraded' : 'down');
      
      const randomPing = Math.floor(5 + Math.random() * 25);
      
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 30) + 1;
      const lastOutage = new Date(now);
      lastOutage.setDate(lastOutage.getDate() - daysAgo);
      
      return {
        ...service,
        status: randomStatus as ServiceStatus['status'],
        ping: randomPing,
        pingText: `${randomPing}ms`,
        lastOutage: lastOutage
      };
    });
  }

  async function fetchRealStatusData(services: ServiceStatus[]): Promise<ServiceStatus[]> {
    try {
      const response = await fetch('/api/status');
      
      if (!response.ok) {
        console.error('Failed to fetch status data:', response.statusText);
        return services;
      }
      
      const apiData = await response.json();
      
      return services.map(service => {
        const apiService = apiData.find((s: any) => s.name === service.name);
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
      return services;
    }
  }

  const fetchData = async (force = false): Promise<ServiceStatus[]> => {
    const now = Date.now();
    const shouldFetch = force || !cachedData.value || (now - lastFetchTime.value > cacheTimeout);
    
    if (!shouldFetch) {
      data.value = Array.isArray(cachedData.value) ? cachedData.value : JSON.parse(JSON.stringify(initialData));
      loading.value = false;
      return Promise.resolve(data.value);
    }
    
    loading.value = true;
    
    try {
      const currentData = Array.isArray(data.value) ? data.value : initialData;
      
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

  const operationalCount = computed(() => 
    data.value.filter(s => s.status === 'operational').length
  );
  
  onMounted(() => {
    fetchData();
    
    if (pollInterval > 0 && typeof window !== 'undefined') {
      fetchIntervalId = window.setInterval(() => {
        fetchData();
      }, pollInterval);
    }
  });
  
  onUnmounted(() => {
    if (fetchIntervalId !== null && typeof window !== 'undefined') {
      window.clearInterval(fetchIntervalId);
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