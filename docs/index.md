---
title: Welcome
layout: home
description: My Digital Universe - Curated

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

<HomeStatus />

<div class="features">
  <div class="feature">
    <div class="feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D05A6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-ellipsis"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
    </div>
    <h2 class="title"><a href="/adblockvpnguide">Adblocking / Privacy</a></h2>
    <p class="details">Learn how to block ads, trackers and other nasty things.</p>
  </div>
  
  <div class="feature">
    <div class="feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#91989F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    </div>
    <h2 class="title"><a href="/ai">Artificial Intelligence</a></h2>
    <p class="details">Explore the world of AI and machine learning.</p>
  </div>
  
  <div class="feature">
    <div class="feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7aa2f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-projector"><path d="M5 7 3 5"/><path d="M9 6V3"/><path d="m13 7 2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/><path d="M16 16h2"/></svg>
    </div>
    <h2 class="title"><a href="/videopiracyguide">Streaming</a></h2>
    <p class="details">Stream, download, torrent and binge all your favourites movies or shows!</p>
  </div>
</div>

<style>
.features {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
  padding: 0 12px;
  justify-content: space-around;
}

.feature {
  flex: 0 0 100%;
  padding: 12px;
  margin-bottom: 20px;
  transition: all 0.3s;
  border-radius: 8px;
}

@media (min-width: 640px) {
  .feature {
    flex: 0 0 calc(33.33% - 24px);
  }
}

.feature:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-2px);
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
}

.title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s;
}

.title a:hover {
  color: var(--vp-c-brand);
}

.details {
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
</style>