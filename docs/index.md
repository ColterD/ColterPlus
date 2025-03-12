---
title: Welcome
layout: home
description: My Digital Universe - Curated
head:
  - - meta
    - name: description
      content: Welcome to Colter+ - My Digital Universe Curated
  - - meta
    - name: og:title
      content: Colter+ | My Digital Universe
  - - meta
    - name: og:description
      content: A curated collection of projects, guides, and blog posts
  - - link
    - rel: preload
      href: /hero-logo.png
      as: image

hero:
  name: Colter+
  tagline: My Digital Universe - Curated
  image:
    src: /hero-logo.png
    alt: C+ Icon
  actions:
    - theme: brand
      text: Go to Dashboard
      link: https://home.colter.plus/#OrganizrLogin
---

<script setup>
import Features from './.vitepress/theme/components/Features.vue'
</script>

<HomeStatus />

<Features />