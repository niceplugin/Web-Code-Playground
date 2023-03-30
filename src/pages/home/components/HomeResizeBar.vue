<template>
  <div
    :class="`
      flex
      justify-center items-center
      md:mt-[28px]
      rounded
      order-2
      text-zinc-400
      cursor-ns-resize
      md:cursor-ew-resize
      ${ resize.resizeStart ? 'bg-gray-600' : 'hover:bg-gray-700' }`"
    @mousedown="resize.resizeStart = true"
    @touchstart="touchstart"
    @contextmenu.prevent
  >
    <svg-icon
      :path="mdiDragVerticalVariant"
      class="hidden md:block mx-[-4px]"
      type="mdi"
    />
    <svg-icon
      :path="mdiDragHorizontalVariant"
      class="block md:hidden"
      type="mdi"
    />
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDragHorizontalVariant, mdiDragVerticalVariant } from '@mdi/js'
import { useResize } from '@/stores/resizeStore'

const resize = useResize()

function touchstart(event) {
  if (!resize.resizeStart) {
    const index = event.touches.length - 1
    resize.touchID = event.touches[index].identifier
    resize.resizeStart = true
  }
}
</script>

<style lang="sass" scoped>
</style>
