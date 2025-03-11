---
title: Projects
layout: doc
---

<script setup>
import { data as projects } from './projects.data.js'
</script>

# My Projects

<div v-if="projects && projects.length">
  <!-- Projects listing code -->
  <div v-for="project in projects" :key="project.url">
    <!-- Project card -->
  </div>
</div>
<div v-else>
  <p>No projects found. Create your first project with the content generator.</p>
</div>