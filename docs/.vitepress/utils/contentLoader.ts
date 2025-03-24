// docs/.vitepress/utils/contentLoader.ts
import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

export interface FrontmatterBase {
  title: string
  description: string
  date: string
  tags: string[]
}

export interface BlogPostFrontmatter extends FrontmatterBase {
  author: string
}

export interface ProjectFrontmatter extends FrontmatterBase {
  status: 'in-progress' | 'completed' | 'planned'
  github?: string
  demo?: string
  timeline?: string
  features?: string[]
  techStack?: string[]
}

export interface GuideFrontmatter extends FrontmatterBase {
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  time_required?: string
  prerequisites?: string[]
}

export interface DateMeta {
  raw: string
  year: number
  month: number
  day: number
  formatted: string
}

export function createSharedContentLoader<T extends Record<string, any>>(
  globPattern: string,
  options: {
    excerpt?: boolean
    transformer?: (data: Array<ContentData & { date: DateMeta }>) => any[]
  } = {}
) {
  return createContentLoader(globPattern, {
    excerpt: options.excerpt || false,
    transform(rawData) {
      // Sort by date (newest first)
      const sortedData = rawData.sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      })

      // Add date object with formatted date
      const processedData = sortedData.map((page) => {
        const date = new Date(page.frontmatter.date)
        return {
          ...page,
          date: {
            raw: page.frontmatter.date,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            formatted: date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        }
      })

      // Apply custom transformer if provided
      return options.transformer ? options.transformer(processedData) : processedData
    }
  })
}