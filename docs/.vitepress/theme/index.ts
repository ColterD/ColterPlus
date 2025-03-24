// docs/.vitepress/theme/index.ts
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import HomeStatus from './components/HomeStatus.vue';
import FeatureCard from './components/FeatureCard.vue';
import StatusPage from './components/StatusPage.vue';
import OptimizedImage from './components/OptimizedImage.vue';
import './styles/variables.css';
import './styles/components.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Register components globally
    app.component('HomeStatus', HomeStatus);
    app.component('FeatureCard', FeatureCard);
    app.component('StatusPage', StatusPage);
    app.component('OptimizedImage', OptimizedImage);
  }
} satisfies Theme;