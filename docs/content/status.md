---
title: Service Status
description: Check the status of our services
---

<script setup>
import AuthRequired from '../.vitepress/theme/components/AuthRequired.vue';
import StatusPage from '../.vitepress/theme/components/StatusPage.vue';
</script>

<AuthRequired requiredRole="admin">
  <StatusPage />
</AuthRequired>