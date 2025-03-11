<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../blog/posts.data.js'

const route = useRoute()
const { frontmatter } = useData()

const tag = computed(() => route.params.tag)

const filteredPosts = computed(() => {
  return posts.filter(post => 
    post.frontmatter.tags && 
    post.frontmatter.tags.map(t => t.toLowerCase()).includes(tag.value.toLowerCase())
  )
})
</script>

<template>
  <div class="tag-page">
    <h1>Posts tagged with "{{ tag }}"</h1>
    
    <div v-if="filteredPosts.length" class="blog-list">
      <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
        <h2>
          <a :href="post.url">{{ post.frontmatter.title }}</a>
        </h2>
        <div class="post-meta">
          {{ post.frontmatter.date }} • 
          <span v-for="(postTag, index) in post.frontmatter.tags" :key="postTag">
            <a :href="`/tags/${postTag}`" 
               :class="['tag', { 'current-tag': postTag.toLowerCase() === tag.toLowerCase() }]">
              {{ postTag }}
            </a>
            <span v-if="index < post.frontmatter.tags.length - 1">, </span>
          </span>
        </div>
        <p>{{ post.frontmatter.description }}</p>
        <a :href="post.url" class="read-more">Read More →</a>
      </div>
    </div>
    
    <div v-else class="no-posts">
      <p>No posts found with this tag.</p>
      <a href="/blog">Back to all posts</a>
    </div>
  </div>
</template>

<style scoped>
.tag-page {
  margin-top: 2rem;
}

.blog-list {
  margin-top: 2rem;
}

.blog-item {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.blog-item:last-child {
  border-bottom: none;
}

.post-meta {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}

.tag {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.current-tag {
  font-weight: bold;
}

.tag:hover {
  text-decoration: underline;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.no-posts {
  margin-top: 2rem;
  padding: 2rem;
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}
</style>