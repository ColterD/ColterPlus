---
title: Blog
layout: doc
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

# Blog

<div class="blog-list">
  <div v-for="post in posts" :key="post.url" class="blog-item">
    <h2>
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </h2>
    <div class="post-meta">
      {{ post.date.formatted }} • 
      <span v-for="(tag, index) in post.frontmatter.tags" :key="tag">
        <a :href="`/tags/${tag}`" class="tag">{{ tag }}</a>
        <span v-if="index < post.frontmatter.tags.length - 1">, </span>
      </span>
    </div>
    <p>{{ post.frontmatter.description }}</p>
    <a :href="post.url" class="read-more">Read More →</a>
  </div>
</div>

<style>
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
</style>