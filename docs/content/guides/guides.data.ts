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
        const dateComparison = new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        if (dateComparison !== 0) return dateComparison
      }
      
      // Fallback to title sort
      return (a.frontmatter.title || '').localeCompare(b.frontmatter.title || '')
    }).map(guide => {
      // Extract date information
      const date = new Date(guide.frontmatter.date || '')
      
      return {
        ...guide,
        date: {
          raw: guide.frontmatter.date,
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