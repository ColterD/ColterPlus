<!-- docs/.vitepress/theme/components/StatusIndicator.vue -->
<script setup>
import { computed } from 'vue';
import { useUIComponents } from '../composables/useUIComponents';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['operational', 'degraded', 'down', 'loading'].includes(value)
  },
  showText: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});

const { getStatusColor, getStatusText } = useUIComponents();

const dotSizeClass = computed(() => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  return sizes[props.size] || sizes.md;
});

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  return sizes[props.size] || sizes.sm;
});

const statusText = computed(() => getStatusText(props.status));
</script>

<template>
  <div class="status-indicator" :class="[props.status]">
    <span 
      class="status-dot" 
      :class="[dotSizeClass]" 
      :style="{ backgroundColor: getStatusColor(status) }"
    ></span>
    <span v-if="showText" class="status-text" :class="[textSizeClass]">
      {{ statusText }}
    </span>
  </div>
</template>

<style scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.3s;
}

.status-indicator:hover .status-dot {
  transform: scale(1.5);
}

.status-text {
  color: var(--vp-c-text-2);
}

.status-indicator.operational .status-text {
  color: var(--status-operational);
}

.status-indicator.degraded .status-text {
  color: var(--status-degraded);
}

.status-indicator.down .status-text {
  color: var(--status-down);
}
</style>