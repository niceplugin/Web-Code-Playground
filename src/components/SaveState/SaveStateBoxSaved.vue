<template>
  <div
    id="saved-box"
    class="inline-block"
  >
    <span class="text-white">Saved! </span>
    <svg-icon
      id="saved-icon"
      :path="mdiCheck"
      class="inline-block text-green-400"
      type="mdi"
    />
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheck } from '@mdi/js'
</script>

<style scoped>
@keyframes cleared {
  0%, 50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
#saved-box {
  animation: cleared 3s linear forwards;
}
</style>
