<!-- docs/.vitepress/theme/components/Features.vue -->
<script setup>
import FeatureCard from './FeatureCard.vue';

const features = [
  {
    title: 'Adblocking / Privacy',
    description: 'Learn how to block ads, trackers and other nasty things.',
    link: '/adblockvpnguide',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>`,
    iconColor: '#D05A6E'
  },
  {
    title: 'Artificial Intelligence',
    description: 'Explore the world of AI and machine learning.',
    link: '/ai',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
    iconColor: '#91989F'
  },
  {
    title: 'Streaming',
    description: 'Stream, download, torrent and binge all your favourites movies or shows!',
    link: '/videopiracyguide',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7 3 5"/><path d="M9 6V3"/><path d="m13 7 2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/><path d="M16 16h2"/></svg>`,
    iconColor: '#7aa2f7'
  }
];
</script>

<template>
  <section aria-labelledby="features-heading" class="features-container">
    <h2 id="features-heading" class="sr-only">Featured Topics</h2>
    <div class="features-grid">
      <FeatureCard
        v-for="(feature, index) in features"
        :key="index"
        :title="feature.title"
        :description="feature.description"
        :link="feature.link"
        :icon="feature.icon"
        :icon-color="feature.iconColor"
      />
    </div>
  </section>
</template>

<style scoped>
.features-container {
  padding: 20px 0 40px;
  margin: 0 auto;
  max-width: 1152px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>