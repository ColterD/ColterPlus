import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import OptimizeExclude from 'vite-plugin-optimize-exclude';
import { defineConfig } from 'vitepress';
import { execSync } from 'child_process';

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
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
  markdown: {
    theme: 'github-dark',
  },
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/blog' },
      {
        text: 'Guides',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      },
      { text: 'Changelog', link: 'https://github.com/...' },
    ],
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
    /* temp comment out so I can redo file structure later
     footer: footerConfig, */
  },
});
