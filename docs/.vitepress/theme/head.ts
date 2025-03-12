// docs/.vitepress/theme/head.ts
import type { HeadConfig } from 'vitepress'

export function generateSEOMeta(title: string, description: string, path: string, image = '/social-image.png'): HeadConfig[] {
  const siteUrl = 'https://colter.plus' // Replace with your actual site URL
  const url = `${siteUrl}${path}`
  
  return [
    ['meta', { name: 'description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${siteUrl}${image}` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}${image}` }]
  ]
}