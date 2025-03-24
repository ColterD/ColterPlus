// docs/projects/projects.data.ts
import { createSharedContentLoader, ProjectFrontmatter, DateMeta } from '../.vitepress/utils/contentLoader'
import { ContentData } from 'vitepress'

export interface Project extends ContentData {
  date: DateMeta
  dir: string
  hasUpdates: boolean
  latestUpdate?: {
    date: string
    title: string
    path: string
  }
  completionPercentage: number
}

// Default export for VitePress
export default createSharedContentLoader<ProjectFrontmatter>('projects/*/index.md', {
  transformer(data) {
    return data.map((page) => {
      // Extract project directory name from URL
      const urlParts = page.url.split('/')
      const projectDir = urlParts[urlParts.length - 2]
      
      // Determine project completion
      let completionPercentage = 100
      if (page.frontmatter.status === 'in-progress') {
        completionPercentage = 50 // Default for in-progress
      } else if (page.frontmatter.status === 'planned') {
        completionPercentage = 0
      }
      
      // In a real app, would check for updates files
      const hasUpdates = page.frontmatter.status === 'in-progress'
      
      // Mock latest update for in-progress projects
      const latestUpdate = hasUpdates ? {
        date: new Date().toISOString().split('T')[0],
        title: `${page.frontmatter.title} Update`,
        path: `/projects/${projectDir}/updates/latest`
      } : undefined
      
      return {
        ...page,
        dir: projectDir,
        hasUpdates,
        latestUpdate,
        completionPercentage
      }
    })
  }
})

// Named export for importing in components
export const data = createSharedContentLoader<ProjectFrontmatter>('projects/*/index.md', {
  transformer(data) {
    return data.map((page) => {
      // Extract project directory name from URL
      const urlParts = page.url.split('/')
      const projectDir = urlParts[urlParts.length - 2]
      
      // Determine project completion
      let completionPercentage = 100
      if (page.frontmatter.status === 'in-progress') {
        completionPercentage = 50 // Default for in-progress
      } else if (page.frontmatter.status === 'planned') {
        completionPercentage = 0
      }
      
      // In a real app, would check for updates files
      const hasUpdates = page.frontmatter.status === 'in-progress'
      
      // Mock latest update for in-progress projects
      const latestUpdate = hasUpdates ? {
        date: new Date().toISOString().split('T')[0],
        title: `${page.frontmatter.title} Update`,
        path: `/projects/${projectDir}/updates/latest`
      } : undefined
      
      return {
        ...page,
        dir: projectDir,
        hasUpdates,
        latestUpdate,
        completionPercentage
      }
    })
  }
})