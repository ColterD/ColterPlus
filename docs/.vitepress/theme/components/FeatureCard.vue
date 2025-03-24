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
  <div class="feature-card" tabindex="0">
    <div class="feature-card-content">
      <div class="feature-card-icon" :style="{ color: iconColor }" aria-hidden="true">
        <span v-html="icon"></span>
      </div>

      <h3 class="feature-card-title">
        <a :href="link" :aria-label="`Go to ${title}`">{{ title }}</a>
      </h3>

      <p class="feature-card-description">{{ description }}</p>
      
      <a :href="link" class="feature-card-link" aria-hidden="true">
        Learn more
        <span class="feature-card-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  display: flex;
  padding: 24px 20px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  height: 100%;
  border: 1px solid transparent;
  border-left: 3px solid transparent;
  cursor: pointer;
  outline: none;
}

.feature-card:hover,
.feature-card:focus-visible {
  transform: translateY(-4px);
  border-left-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  width: var(--feature-icon-size, 64px);
  height: var(--feature-icon-size, 64px);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-bottom: 16px;
  transition: transform 0.3s;
}

.feature-card:hover .feature-card-icon {
  transform: scale(1.1);
}

.feature-card-icon :deep(svg) {
  width: 32px;
  height: 32px;
}

.feature-card-title {
  font-size: var(--feature-title-size, 1.25rem);
  line-height: 1.4;
  font-weight: 600;
  margin: 0 0 12px;
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
  font-size: var(--feature-text-size, 0.9rem);
  line-height: 1.6;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 0 auto;
  flex-grow: 1;
}

.feature-card-link {
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s, transform 0.3s;
}

.feature-card:hover .feature-card-link {
  opacity: 1;
  transform: translateY(0);
}

.feature-card-arrow {
  transition: transform 0.2s;
  margin-left: 4px;
}

.feature-card:hover .feature-card-arrow {
  transform: translateX(4px);
}
</style>