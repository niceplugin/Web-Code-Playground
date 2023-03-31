<template>
  <div class="float-right">
    <save-state-box-saving v-if="editor.saved === false"/>
    <save-state-box-saved v-if="editor.saved === true"/>
  </div>
</template>

<script setup>
import SaveStateBoxSaving from '@/components/SaveState/SaveStateBoxSaving.vue'
import { useEditor } from '@/stores/editorStore'
import SaveStateBoxSaved from '@/components/SaveState/SaveStateBoxSaved.vue'

const editor = useEditor()
</script>

<style scoped>
</style>
