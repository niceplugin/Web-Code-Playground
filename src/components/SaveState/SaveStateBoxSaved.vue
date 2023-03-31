<template>
  <div class="ani-cleared flex">
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
</style>
