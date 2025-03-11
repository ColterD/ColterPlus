// docs/projects/projects.data.js
import { createContentLoader } from 'vitepress'
import path from 'path'

export default createContentLoader('projects/*/index.md', {
  transform(rawData) {
    return rawData
      .sort((a, b) => {
        // Sort by date (newest first)
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      })
      .map((page) => {
        // Extract project directory name from URL
        const urlParts = page.url.split('/')
        const projectDir = urlParts[urlParts.length - 2]
        
        return {
          ...page,
          dir: projectDir
        }
      })
  }
})