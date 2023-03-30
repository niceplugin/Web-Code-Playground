<template>
  <button
    :class="`
          inline-block
          relative
          rounded-t
          border-zinc-600 border-[1px] border-b-0
          px-3 py-0.5
          select-none
          [&:not(:first-child)]:ml-[-1px]
          focus:z-[2]
          focus:outline focus:outline-2 focus:outline-amber-400
          ${ props.class }
          ${ activeClass }`"
    :disabled="props.disabled"
  >
    {{ props.text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Tab',
  },
  class: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const activeClass = computed(() => {
  return props.active ? props.disabled ?
      'font-semibold bg-white text-black z-[1]' : 'font-semibold bg-[#282c34] text-white z-[1]' :
    'bg-zinc-400 hover:bg-zinc-500 z-0'
})
</script>

<style scoped>
</style>
