import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vitepress';
import { execSync } from 'child_process';
import unocssConfig from './unocss.config';

const getGitRevision = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

const footerConfig = {
  message: 'Made with ❤ and <a href="https://vitepress.dev/" target="_blank">VitePress</a>',
  copyright: `
    GitHub Version: ${getGitRevision()}<br>
    © ${new Date().getFullYear()} ColterPlus
  `,
};

export default defineConfig({
  lang: 'en-US',
  title: 'C+',
  description: 'My Digital Universe - Curated',
  titleTemplate: ':title • Colter+',
  appearance: 'force-dark',
  srcDir: './content', // Updated to point to the new content directory
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
  markdown: {
    theme: 'github-dark',
  },
  themeConfig: {
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
      { text: 'Changelog', link: 'https://github.com/...' },
    ],
    sidebar: {
      '/projects/': [
        {
          text: 'Projects',
          link: '/projects/',
          items: []  // Will be populated as you create projects
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          link: '/blog/',
          items: []  // You can populate this if you want categories
        }
      ],
      '/guides/': [
        {
          text: 'Guides',
          link: '/guides/',
          items: []  // Populate with your guide categories
        }
      ]
    },
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
    editLink: {
      pattern: 'https://github.com/colterd/colterplus/edit/main/docs/:path',
      text: '📝 Edit this page',
    },
    outline: 'deep',
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/colterd/colterplus' },
      { icon: 'discord', link: 'https://discord.gg/colterplus' },
    ],
    footer: footerConfig,
  },
  vite: {
    plugins: [
      UnoCSS(unocssConfig),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        dts: true,
      }),
    ],
    ssr: {
      noExternal: ['nprogress']
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
            vueuse: ['@vueuse/core'],
          }
        }
      }
    }
  }
});