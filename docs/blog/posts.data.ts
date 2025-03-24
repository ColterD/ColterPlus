// docs/blog/posts.data.ts
import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

// Define interface for the post frontmatter
interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author: string
}

// Define a type for a single post
interface Post extends ContentData {
  frontmatter: PostFrontmatter
  excerpt: string | undefined
  date: {
    raw: string
    year: number
    month: number
  }
}

// The main output type needs to be the overall result
export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData) {
    // Sort by date
    const posts = rawData
      .sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      })
      .map((page) => {
        // Extract year and month from date
        const date = new Date(page.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        return {
          ...page,
          date: {
            raw: page.frontmatter.date,
            year,
            month
          }
        }
      })
    
    return posts
  }
})