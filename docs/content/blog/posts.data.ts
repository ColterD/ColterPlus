import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

// Keep the type definition simple
export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData: ContentData[]) {
    return rawData
      .sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      })
      .map(post => {
        // Extract date information
        const date = new Date(post.frontmatter.date)
        
        return {
          ...post,
          date: {
            raw: post.frontmatter.date,
            formatted: date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          }
        }
      })
  }
})