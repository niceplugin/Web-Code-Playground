<template>
  <div
    id="saving-box"
    class="inline-block"
  >
    <span class="text-white">Working... </span>
    <svg-icon
      id="saving-icon"
      :path="mdiAutorenew"
      class="inline-block text-white"
      type="mdi"
    />
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAutorenew } from '@mdi/js'
</script>

<style scoped>
@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#saving-box {
  animation: flash 1.5s linear infinite;
}
#saving-icon {
  animation: rotate 1.5s linear infinite;
}
</style>
