<template>
  <div
    class="
      absolute top-1 right-1
      px-2 py-1
      rounded
      bg-[rgba(255,255,255,.5)]
      text-right
      select-none"
  >
    {{ innerWidth }}px : width<br>
    {{ innerHeight }}px :height
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useResize } from '@/stores/resizeStore'

const resize = useResize()
const innerWidth = ref(0)
const innerHeight = ref(0)

/** 리사이징 경우, iframe 가로 세로 px 값 계산 */
watch(() => {
  return resize.leftWidth * resize.rightWidth * resize.leftHeight * resize.rightHeight
}, () => {
  const el = document.getElementById('home-right-iframe')
  innerWidth.value = el.contentWindow.innerWidth
  innerHeight.value = el.contentWindow.innerHeight
}, {
  immediate: true,
})
</script>

<style scoped>
</style>
