// docs/guides/guides.data.ts
import { createSharedContentLoader, GuideFrontmatter, DateMeta } from '../.vitepress/utils/contentLoader'
import { ContentData } from 'vitepress'

export interface Guide extends ContentData {
  date: DateMeta
  difficultyLevel: number
  estimated_minutes: number
  related_guides: string[]
}

// Map difficulty to numeric level for sorting
const difficultyMap: Record<string, number> = {
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3
}

// Extract time in minutes from time_required string
function parseTimeRequired(timeString: string = '30 minutes'): number {
  const match = timeString.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 30 // Default to 30 minutes
}

// Default export for VitePress
export default createSharedContentLoader<GuideFrontmatter>('guides/*.md', {
  excerpt: true,
  transformer(data) {
    // Filter out index.md
    const filteredData = data.filter(page => !page.url.endsWith('/'))
    
    return filteredData.map(guide => {
      // Convert difficulty to numeric value for sorting
      const difficulty = (guide.frontmatter as GuideFrontmatter).difficulty || 'beginner'
      const difficultyLevel = difficultyMap[difficulty] || 1
      
      // Parse time required
      const timeRequired = (guide.frontmatter as GuideFrontmatter).time_required || ''
      const estimated_minutes = parseTimeRequired(timeRequired)
      
      // Generate related guides based on tags
      const guideTags = (guide.frontmatter as GuideFrontmatter).tags || []
      
      const related_guides = filteredData
        .filter(otherGuide => {
          if (otherGuide.url === guide.url) return false
          
          const otherTags = (otherGuide.frontmatter as GuideFrontmatter).tags || []
          return otherTags.some(tag => guideTags.includes(tag))
        })
        .slice(0, 3)
        .map(relatedGuide => relatedGuide.url)
      
      return {
        ...guide,
        difficultyLevel,
        estimated_minutes,
        related_guides
      }
    })
  }
})

// Named export for importing in components
export const data = createSharedContentLoader<GuideFrontmatter>('guides/*.md', {
  excerpt: true,
  transformer(data) {
    // Filter out index.md
    const filteredData = data.filter(page => !page.url.endsWith('/'))
    
    return filteredData.map(guide => {
      // Convert difficulty to numeric value for sorting
      const difficulty = (guide.frontmatter as GuideFrontmatter).difficulty || 'beginner'
      const difficultyLevel = difficultyMap[difficulty] || 1
      
      // Parse time required
      const timeRequired = (guide.frontmatter as GuideFrontmatter).time_required || ''
      const estimated_minutes = parseTimeRequired(timeRequired)
      
      // Generate related guides based on tags
      const guideTags = (guide.frontmatter as GuideFrontmatter).tags || []
      
      const related_guides = filteredData
        .filter(otherGuide => {
          if (otherGuide.url === guide.url) return false
          
          const otherTags = (otherGuide.frontmatter as GuideFrontmatter).tags || []
          return otherTags.some(tag => guideTags.includes(tag))
        })
        .slice(0, 3)
        .map(relatedGuide => relatedGuide.url)
      
      return {
        ...guide,
        difficultyLevel,
        estimated_minutes,
        related_guides
      }
    })
  }
})