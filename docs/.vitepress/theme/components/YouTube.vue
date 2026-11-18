<script setup lang="ts">
// 記事の中で <YouTube id="動画のID" /> または <YouTube url="https://www.youtube.com/watch?v=..." /> と書くと、
// 動画を本文の幅いっぱい（16:9）で表示する。
import { computed } from 'vue'

const props = defineProps<{ id?: string; url?: string; title?: string }>()

const videoId = computed(() => {
  if (props.id) return props.id
  if (!props.url) return ''
  try {
    const u = new URL(props.url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
    if (u.searchParams.get('v')) return u.searchParams.get('v') as string
    const m = u.pathname.match(/\/(?:embed|shorts|live)\/([\w-]+)/)
    return m ? m[1] : ''
  } catch {
    return ''
  }
})
</script>

<template>
  <div v-if="videoId" class="youtube-embed">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
      :title="title || 'YouTube 動画'"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.youtube-embed {
  margin: 24px 0;
  aspect-ratio: 16 / 9;
  width: 100%;
}

.youtube-embed iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 8px;
}
</style>
