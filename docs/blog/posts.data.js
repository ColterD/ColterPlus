// docs/blog/posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData) {
    // Sort by date
    return rawData
      .sort((a, b) => {
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
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
  }
})