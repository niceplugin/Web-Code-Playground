<template>
  <div class="ani-flash flex">
    <span class="text-white">Working... </span>
    <svg-icon
      :path="mdiAutorenew"
      class="ani-rotate inline-block text-white"
      type="mdi"
    />
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAutorenew } from '@mdi/js'
</script>

<style scoped>
</style>
