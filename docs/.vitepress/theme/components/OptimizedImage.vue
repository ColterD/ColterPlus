<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  lazy: {
    type: Boolean,
    default: true
  },
  fallbackSrc: {
    type: String,
    default: '/placeholder-image.png'
  }
});

const imageLoaded = ref(false);
const imageError = ref(false);
const imageRef = ref(null);

const handleLoad = () => {
  imageLoaded.value = true;
};

const handleError = () => {
  imageError.value = true;
  if (props.fallbackSrc) {
    imageRef.value.src = props.fallbackSrc;
  }
};

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && imageRef.value) {
          imageRef.value.src = props.src;
          observer.unobserve(imageRef.value);
        }
      });
    });
    
    if (imageRef.value) {
      observer.observe(imageRef.value);
      return () => {
        if (imageRef.value) observer.unobserve(imageRef.value);
      };
    }
  }
});
</script>

<template>
  <div class="optimized-image" :class="{ 'loaded': imageLoaded, 'error': imageError }">
    <img
      ref="imageRef"
      :src="lazy ? '' : src"
      :data-src="lazy ? src : ''"
      :alt="alt"
      :width="width"
      :height="height"
      @load="handleLoad"
      @error="handleError"
      :loading="lazy ? 'lazy' : 'eager'"
    />
    <div v-if="!imageLoaded && !imageError" class="image-placeholder"></div>
  </div>
</template>

<style scoped>
.optimized-image {
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.optimized-image.loaded .image-placeholder {
  opacity: 0;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

.optimized-image.error img {
  opacity: 0.5;
}
</style>