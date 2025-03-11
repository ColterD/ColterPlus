---
title: Guides
layout: doc
---

<script setup>
import { data as guides } from './guides.data.js'
import { ref, computed } from 'vue'

const searchQuery = ref('')
const difficultyFilter = ref('all')

// Filter guides based on search query and difficulty
const filteredGuides = computed(() => {
  if (!guides || guides.length === 0) return [];
  
  let result = guides;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(guide => 
      guide.frontmatter.title?.toLowerCase().includes(query) || 
      guide.frontmatter.description?.toLowerCase().includes(query) ||
      (guide.frontmatter.tags && guide.frontmatter.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }
  
  // Apply difficulty filter
  if (difficultyFilter.value !== 'all') {
    result = result.filter(guide => 
      guide.frontmatter.difficulty && guide.frontmatter.difficulty.toLowerCase() === difficultyFilter.value
    );
  }
  
  return result;
});

// Group guides by tags
const guidesByTag = computed(() => {
  if (!filteredGuides.value || filteredGuides.value.length === 0) {
    return [];
  }
  
  const tagMap = {};
  
  filteredGuides.value.forEach(guide => {
    if (guide.frontmatter.tags) {
      guide.frontmatter.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(guide);
      });
    }
  });
  
  return Object.entries(tagMap).sort((a, b) => a[0].localeCompare(b[0]));
});

// Get all unique difficulty levels
const difficultyLevels = computed(() => {
  if (!guides) return ['all'];
  
  const levels = new Set();
  guides.forEach(guide => {
    if (guide.frontmatter.difficulty) {
      levels.add(guide.frontmatter.difficulty.toLowerCase());
    }
  });
  return ['all', ...Array.from(levels)];
});
</script>

# Guides

<div class="guides-controls">
  <div class="search-box">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search guides..." 
      class="search-input"
    />
  </div>
  
  <div class="filter-controls">
    <span class="filter-label">Difficulty:</span>
    <div class="filter-options">
      <button 
        v-for="level in difficultyLevels" 
        :key="level"
        @click="difficultyFilter = level"
        :class="['filter-button', difficultyFilter === level ? 'active' : '']"
      >
        {{ level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1) }}
      </button>
    </div>
  </div>
</div>

<div v-if="filteredGuides.length > 0">
  <div v-if="guidesByTag.length > 0" class="guides-by-tag">
    <div v-for="[tag, tagGuides] in guidesByTag" :key="tag" class="tag-section">
      <h2 class="tag-title">{{ tag }}</h2>
      <div class="guides-grid">
        <div v-for="guide in tagGuides" :key="guide.url" class="guide-card">
          <div class="guide-difficulty" :class="guide.frontmatter.difficulty">
            {{ guide.frontmatter.difficulty }}
          </div>
          <h3>
            <a :href="guide.url">{{ guide.frontmatter.title }}</a>
          </h3>
          <p class="guide-description">{{ guide.frontmatter.description }}</p>
          <div class="guide-meta">
            <span class="guide-time" v-if="guide.frontmatter.time_required">
              {{ guide.frontmatter.time_required }}
            </span>
            <span class="guide-date">{{ guide.frontmatter.date }}</span>
          </div>
          <a :href="guide.url" class="guide-link">Read Guide →</a>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-else class="no-guides">
  <p>No guides found yet. Create your first guide with the content generator!</p>
  <code>npm run create</code>
</div>

<style>
.guides-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .guides-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-box {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  font-weight: 500;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.guides-by-tag {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tag-title {
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.guide-card {
  position: relative;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.guide-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.guide-difficulty {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.guide-difficulty.beginner {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.guide-difficulty.intermediate {
  background-color: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.guide-difficulty.advanced {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.guide-card h3 {
  margin-top: 0.5rem;
  margin-right: 4rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.guide-card h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.guide-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.guide-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.guide-link {
  display: inline-block;
  font-weight: 500;
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.2s;
}

.guide-link:hover {
  color: var(--vp-c-brand-dark);
}

.no-guides {
  text-align: center;
  padding: 3rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.no-guides code {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
}
</style>