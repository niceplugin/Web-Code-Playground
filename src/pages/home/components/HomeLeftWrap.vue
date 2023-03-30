<template>
  <div class="order-3 md:order-1 flex flex-col">
    <div class="mb-[-1px]">
      <tab-button
        :active="editor.tab === 0"
        text="HTML"
        @click="editor.changeTab(0)"
      />
      <tab-button
        :active="editor.tab === 1"
        text="CSS"
        @click="editor.changeTab(1)"
      />
      <tab-button
        :active="editor.tab === 2"
        text="Javascript"
        @click="editor.changeTab(2)"
      />
    </div>
    <div class="relative border-zinc-600 border-[1px] grow rounded-tr overflow-hidden">
      <div class="absolute top-0 left-0 right-0 bottom-0 overflow-auto bg-[#282c34]">
        <editor-html v-if="editor.tab === 0"/>
        <editor-css v-else-if="editor.tab === 1"/>
        <editor-javascript v-else-if="editor.tab === 2"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditor } from '@/stores/editorStore'
import TabButton from '@/components/TabButton.vue'
import EditorHtml from '@/components/EditorHtml.vue'
import EditorCss from '@/components/EditorCss.vue'
import EditorJavascript from '@/components/EditorJavascript.vue'

const editor = useEditor()
</script>

<style scoped>
</style>
