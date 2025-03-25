// docs/.vitepress/config.mts
import { defineConfig } from 'vitepress';
import { execSync } from 'child_process';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { withPwa } from '@vite-pwa/vitepress';
import nprogress from 'vitepress-plugin-nprogress';

// Local imports
import unocssConfig from './unocss.config.js';
import { securityHeaders } from './head';

// Repository configuration
const REPO_OWNER = 'colterd';
const REPO_NAME = 'colterplus';
const REPO_BRANCH = 'main';
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

// Helper functions
const getGitRevision = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

// SEO Configuration
const seoConfig = {
  defaultTitle: 'Colter+ | My Digital Universe',
  description: 'My Digital Universe - Curated. Projects, blogs, and guides by Colter.',
  author: 'Colter',
  siteUrl: 'https://colterplus.com',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
  twitterCreator: '@colterplus'
};

// JSON-LD structured data
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${seoConfig.siteUrl}/#website`,
  'url': seoConfig.siteUrl,
  'name': 'Colter+',
  'description': seoConfig.description,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${seoConfig.siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${seoConfig.siteUrl}/#person`,
  'name': seoConfig.author,
  'url': seoConfig.siteUrl,
  'sameAs': [
    `https://github.com/${REPO_OWNER}`,
    seoConfig.twitterCreator
  ]
};

const baseConfig = defineConfig({
  // Site metadata
  lang: 'en-US',
  title: 'C+',
  description: seoConfig.description,
  titleTemplate: ':title • Colter+',
  appearance: 'force-dark',
  
  // Content configuration
  srcDir: './content',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
  
  // Head metadata with manually added structured data
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: seoConfig.author }],
    ['meta', { property: 'og:title', content: seoConfig.defaultTitle }],
    ['meta', { property: 'og:description', content: seoConfig.description }],
    ['meta', { property: 'og:image', content: seoConfig.ogImage }],
    ['meta', { property: 'og:url', content: seoConfig.siteUrl }],
    ['meta', { name: 'twitter:card', content: seoConfig.twitterCard }],
    ['meta', { name: 'twitter:creator', content: seoConfig.twitterCreator }],
    // JSON-LD structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify(websiteJsonLd)],
    ['script', { type: 'application/ld+json' }, JSON.stringify(personJsonLd)],
    ...securityHeaders
  ],
  
  // Markdown configuration
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },
  
  // Theme configuration
  themeConfig: {
    // Navigation
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'Projects', link: '/projects/' },
      {
        text: 'Guides',
        items: [
          { text: 'All Guides', link: '/guides/' },
          { text: 'Beginners', link: '/guides/?difficulty=beginner' },
          { text: 'Advanced', link: '/guides/?difficulty=advanced' }
        ]
      },
      { text: 'Status', link: '/status' },
      { text: 'Changelog', link: `${REPO_URL}/releases` },
    ],
    
    // Sidebar
    sidebar: {
      '/projects/': [{ text: 'Projects', link: '/projects/', items: [] }],
      '/blog/': [{ text: 'Blog', link: '/blog/', items: [] }],
      '/guides/': [{ text: 'Guides', link: '/guides/', items: [] }]
    },
    
    // Search
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, tags: 1 },
          },
        },
      },
    },
    
    // UI elements
    editLink: {
      pattern: `${REPO_URL}/edit/${REPO_BRANCH}/docs/:path`,
      text: '📝 Edit this page',
    },
    outline: 'deep',
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: REPO_URL },
      { icon: 'discord', link: 'https://discord.gg/colterplus' },
    ],
  },
  
  // Vite configuration
  vite: {
    // Plugins
    plugins: [
      UnoCSS(unocssConfig),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        dts: true,
      }),
      nprogress(),
    ],
    
    // SSR options
    ssr: {
      noExternal: ['nprogress']
    },
    
    // File resolution
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    
    // Build options
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      chunkSizeWarningLimit: 700
    }
  },
  
  // PWA configuration directly in the base config
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'logo.png'],
    manifest: {
      name: 'Colter+',
      short_name: 'C+',
      description: seoConfig.description,
      theme_color: '#3b82f6',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
  }
});

// Export with the correct usage of withPwa
export default withPwa(baseConfig);