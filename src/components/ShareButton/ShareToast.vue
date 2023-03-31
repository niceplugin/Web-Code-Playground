<template>
  <div
    class="
      ani-cleared
      absolute
      rounded
      whitespace-pre
      bg-[#282c34]
      top-[100%] right-0
      z-10
      mt-2 mr-2
      px-2"
    @animationend="$emit('hide')"
  >
    <span class="font-semibold text-white">Url copied!</span>
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
