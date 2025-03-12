---
title: Projects
layout: doc
---

<script setup>
import { data as projects } from './projects.data.js'
</script>

# My Projects

<div v-if="projects && projects.length" class="projects-grid">
  <div v-for="project in projects" :key="project.url" class="project-card">
    <div class="project-image">
      <a :href="project.url">
        <!-- Added loading="lazy" attribute -->
        <img :src="`/projects/${project.dir}/assets/banner.png`" :alt="project.frontmatter.title" loading="lazy" onerror="this.src='/placeholder-project.png'">
      </a>
    </div>
    <div class="project-content">
      <div class="project-status" :class="project.frontmatter.status">
        {{ project.frontmatter.status }}
      </div>
      <h2>
        <a :href="project.url">{{ project.frontmatter.title }}</a>
      </h2>
      <p>{{ project.frontmatter.description }}</p>
      <div class="project-tags">
        <span v-for="tag in project.frontmatter.tags" :key="tag" class="project-tag">
          {{ tag }}
        </span>
      </div>
      <a :href="project.url" class="view-project" aria-label="View project details">View Project →</a>
    </div>
  </div>
</div>

<style>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 180px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.project-status.completed {
  background-color: rgba(0, 200, 83, 0.15);
  color: #00c853;
}

.project-status.in-progress {
  background-color: rgba(3, 169, 244, 0.15);
  color: #03a9f4;
}

.project-status.planned {
  background-color: rgba(233, 30, 99, 0.15);
  color: #e91e63;
}

.project-content h2 {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  line-height: 1.3;
}

.project-content h2 a {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.project-content p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.project-tag {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
}

.view-project {
  display: inline-block;
  background-color: var(--vp-c-brand);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-align: center;
  margin-top: auto;
}

.view-project:hover {
  background-color: var(--vp-c-brand-dark);
}

.empty-projects {
  margin-top: 2rem;
  padding: 3rem;
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.empty-projects pre {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
}
</style>