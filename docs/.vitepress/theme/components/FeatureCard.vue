<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: '#'
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#1976D2'
  }
});
</script>

<template>
  <div class="feature-card">
    <div class="feature-card-content">
      <div class="feature-card-icon" :style="{ color: iconColor }">
        <span v-html="icon"></span>
      </div>

        <a :href="link">{{ title }}</a>

      <p class="feature-card-description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  display: flex;
  padding: 24px 20px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border 0.3s, box-shadow 0.3s;
  height: 100%;
  border: 1px solid transparent;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 20px rgba(var(--vp-c-brand-1-rgb), 0.1);
}

.feature-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.feature-card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-bottom: 12px; /* Reduced space */
}

.feature-card-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.feature-card-title {
  font-size: 1.25rem;
  line-height: 1.4;
  font-weight: 600;
  margin: 0 0 8px; /* Reduced space */
  text-align: center;
}

.feature-card-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.feature-card-title a:hover {
  color: var(--vp-c-brand-1);
}

.feature-card-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0;
  flex-grow: 1;
}
</style>