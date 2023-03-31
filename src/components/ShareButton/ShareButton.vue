<template>
  <div class="relative inline-flex pl-1 float-right">
    <button
      class="whitespace-pre px-2 rounded text-white bg-blue-600"
      @click="copyShareLink"
    >
      <span>Share</span>
      <svg-icon
        :path="mdiShare"
        class="inline-block ml-0.5 mr-[-2px]"
        type="mdi"
      />
    </button>
    <share-toast
      v-if="showToast"
      @hide="showToast = false"
    />
  </div>
</template>

<script setup>
import ShareToast from '@/components/ShareButton/ShareToast.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiShare } from '@mdi/js'
import { ref } from 'vue'

const showToast = ref(false)

function copyShareLink() {
  showToast.value = false
  navigator.clipboard.writeText(location.href).then(() => {
    showToast.value = true
  }).catch(err => {
    console.error(err)
    alert("Sorry!\nBrowser not support copy url.")
  })
}
</script>

<style scoped>
</style>
