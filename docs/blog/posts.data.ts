// docs/blog/posts.data.ts
import { createSharedContentLoader, BlogPostFrontmatter, DateMeta } from '../.vitepress/utils/contentLoader'
import { ContentData } from 'vitepress'

export interface Post extends ContentData {
  date: DateMeta
  readingTime: number
  category?: string
}

// Generate reading time estimate based on content length
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Default export for VitePress
export default createSharedContentLoader<BlogPostFrontmatter>('blog/*.md', {
  excerpt: true,
  transformer(data) {
    return data.map((post) => {
      // Calculate reading time
      const content = post.excerpt || ''
      const readingTime = calculateReadingTime(content)
      
      // Extract category from first tag if available
      const category = post.frontmatter.tags && post.frontmatter.tags.length > 0 
        ? post.frontmatter.tags[0] 
        : undefined
        
      return {
        ...post,
        readingTime,
        category
      }
    })
  }
})

// Named export for importing in components
export const data = createSharedContentLoader<BlogPostFrontmatter>('blog/*.md', {
  excerpt: true,
  transformer(data) {
    return data.map((post) => {
      // Calculate reading time
      const content = post.excerpt || ''
      const readingTime = calculateReadingTime(content)
      
      // Extract category from first tag if available
      const category = post.frontmatter.tags && post.frontmatter.tags.length > 0 
        ? post.frontmatter.tags[0] 
        : undefined
        
      return {
        ...post,
        readingTime,
        category
      }
    })
  }
})