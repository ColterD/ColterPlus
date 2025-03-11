// docs/tags/[tag].paths.js
import { data as posts } from '../blog/posts.data.js'

// Get all unique tags
export default {
  paths() {
    const tags = new Set()
    
    posts.forEach(post => {
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => {
          tags.add(tag.toLowerCase())
        })
      }
    })
    
    return Array.from(tags).map(tag => {
      return { params: { tag } }
    })
  }
}