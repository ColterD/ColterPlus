<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <section class="custom-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">{{ frontmatter.hero.name }}</h1>
        <p class="hero-tagline">{{ frontmatter.hero.tagline }}</p>
        <div class="hero-actions">
          <a :href="frontmatter.hero.actions[0].link" class="hero-button">
            {{ frontmatter.hero.actions[0].text }}
          </a>
        </div>
      </div>
      <div class="hero-image">
        <img :src="frontmatter.hero.image.src" :alt="frontmatter.hero.image.alt">
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-hero {
  padding: 4rem 1.5rem;
  position: relative;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-content {
  margin-left: auto;
  margin-right: 2rem;
  max-width: 40%;
}

.hero-title {
  font-size: 3rem;
  line-height: 1.2;
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.hero-tagline {
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.hero-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.hero-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.hero-image {
  max-width: 50%;
}

.hero-image img {
  max-width: 100%;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .hero-content {
    text-align: center;
    margin: 0 auto 2rem;
    max-width: 100%;
  }
  
  .hero-image {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>