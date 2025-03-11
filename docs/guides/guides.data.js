import { createContentLoader } from 'vitepress'

export default createContentLoader('guides/*.md', {
  excerpt: true,
  transform(rawData) {
    // Filter out index.md
    const guides = rawData.filter(page => !page.url.endsWith('/'))
    
    // Sort by date (newest first) and then by title
    return guides.sort((a, b) => {
      // If we have dates, sort by date first
      if (a.frontmatter.date && b.frontmatter.date) {
        const dateComparison = new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        if (dateComparison !== 0) return dateComparison
      }
      
      // Fallback to title sort
      return a.frontmatter.title.localeCompare(b.frontmatter.title)
    })
  }
})