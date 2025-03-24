<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

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
  },
  sizes: {
    type: String,
    default: '100vw'
  },
  blurHash: {
    type: String,
    default: ''
  }
});

const imageLoaded = ref(false);
const imageError = ref(false);
const imageRef = ref(null);
let observer = null;

// Automatically generate srcset for responsive images
const srcset = computed(() => {
  if (!props.src) return '';
  
  const basePath = props.src.substring(0, props.src.lastIndexOf('.'));
  const extension = props.src.substring(props.src.lastIndexOf('.'));
  
  // Common widths for responsive images
  const widths = [480, 768, 1024, 1280, 1920];
  
  // Return srcset for standard format
  const standardSrcSet = widths
    .map(w => `${basePath}-${w}w${extension} ${w}w`)
    .join(', ');
    
  // Check if webp version exists
  const webpSrcSet = widths
    .map(w => `${basePath}-${w}w.webp ${w}w`)
    .join(', ');
  
  return {
    standard: standardSrcSet,
    webp: webpSrcSet
  };
});

const handleLoad = () => {
  imageLoaded.value = true;
};

const handleError = () => {
  imageError.value = true;
  if (props.fallbackSrc && imageRef.value) {
    imageRef.value.src = props.fallbackSrc;
  }
};

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && imageRef.value) {
          // Load the image when it becomes visible
          if (imageRef.value.dataset.src) {
            imageRef.value.src = imageRef.value.dataset.src;
          }
          
          // Load srcset when available
          if (imageRef.value.dataset.srcset) {
            imageRef.value.srcset = imageRef.value.dataset.srcset;
          }
          
          if (observer && imageRef.value) {
            observer.unobserve(imageRef.value);
          }
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading a bit before the image enters viewport
      threshold: 0.1
    });
    
    if (imageRef.value) {
      observer.observe(imageRef.value);
    }
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<template>
  <div class="optimized-image" :class="{ 'loaded': imageLoaded, 'error': imageError }">
    <picture>
      <!-- WebP Support -->
      <source 
        v-if="srcset.webp" 
        :data-srcset="lazy ? srcset.webp : undefined" 
        :srcset="!lazy ? srcset.webp : undefined" 
        type="image/webp" 
        :sizes="sizes"
      />
      
      <!-- Standard format with srcset -->
      <img
        ref="imageRef"
        :src="lazy ? '' : src"
        :data-src="lazy ? src : ''"
        :srcset="!lazy ? srcset.standard : undefined"
        :data-srcset="lazy ? srcset.standard : undefined"
        :sizes="sizes"
        :alt="alt"
        :width="width"
        :height="height"
        @load="handleLoad"
        @error="handleError"
        :loading="lazy ? 'lazy' : 'eager'"
        decoding="async"
      />
    </picture>
    
    <!-- Placeholder with blur hash or skeleton -->
    <div 
      v-if="!imageLoaded && !imageError" 
      class="image-placeholder"
      :style="blurHash ? { backgroundImage: `url(${blurHash})` } : {}"
    ></div>
  </div>
</template>

<style scoped>
.optimized-image {
  position: relative;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  background-size: cover;
  background-position: center;
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
  transition: opacity 0.3s ease;
}

.optimized-image:not(.loaded) img {
  opacity: 0;
}

.optimized-image.loaded img {
  opacity: 1;
}

.optimized-image.error img {
  opacity: 0.5;
}

@media (prefers-reduced-motion: reduce) {
  .image-placeholder,
  img {
    transition: none;
  }
}
</style>