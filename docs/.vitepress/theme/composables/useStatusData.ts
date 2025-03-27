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
  cacheTimeout = 300000, // 5 minutes
  pollInterval = 0
) {
  const cachedData = useStorage<ServiceStatus[] | null>(`${key}-data`, null);
  const lastFetchTime = useStorage<number>(`${key}-last-fetch`, 0);
  const staleData = ref<ServiceStatus[]>(Array.isArray(cachedData.value) 
    ? cachedData.value 
    : JSON.parse(JSON.stringify(initialData)));
  
  const data = ref<ServiceStatus[]>(staleData.value);
  const loading = ref(true);
  const error = ref<Error | null>(null);
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('/api/status', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch status data: ${response.statusText}`);
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
      // Re-throw to handle in the caller
      throw error;
    }
  }

  // Implements stale-while-revalidate pattern
  const fetchData = async (force = false): Promise<ServiceStatus[]> => {
    const now = Date.now();
    const shouldFetch = force || !cachedData.value || (now - lastFetchTime.value > cacheTimeout);
    
    // If we have stale data, use it immediately
    if (cachedData.value && !force) {
      data.value = JSON.parse(JSON.stringify(cachedData.value));
      // If we don't need fresh data, we can stop here
      if (!shouldFetch) {
        loading.value = false;
        return data.value;
      }
    } else if (!force) {
      // No cached data, use initial data
      data.value = JSON.parse(JSON.stringify(initialData));
    }
    
    // Set loading only if we don't have any data at all
    if (!data.value.length) {
      loading.value = true;
    }
    
    try {
      const currentData = Array.isArray(data.value) && data.value.length 
        ? data.value 
        : initialData;
      
      const updatedData = import.meta.env.PROD && !import.meta.env.DEV_MOCKS
        ? await fetchRealStatusData(currentData)
        : generateMockData(currentData);
      
      data.value = updatedData;
      cachedData.value = JSON.parse(JSON.stringify(updatedData));
      lastFetchTime.value = now;
      error.value = null;
      
      return updatedData;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      // Still return the current data even on error
      return data.value;
    } finally {
      loading.value = false;
    }
  };

  const operationalCount = computed(() => 
    data.value.filter(s => s.status === 'operational').length
  );
  
  const isAllOperational = computed(() =>
    operationalCount.value === data.value.length
  );
  
  const errorMessage = computed(() => 
    error.value ? error.value.message : null
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
    error: errorMessage,
    fetchData,
    operationalCount,
    isAllOperational,
    formatTimeSince
  };
}