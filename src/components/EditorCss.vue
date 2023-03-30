<template>
  <div ref="editorWrap">
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue'
import {
  EditorView,
  basicSetup,
} from 'codemirror'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { useEditor } from '@/stores/editorStore'

const editor = useEditor()
const editorWrap = ref(null)
const editorView = ref(null)
onMounted(() => {
  editorView.value = new EditorView({
    doc: editor.css,
    extensions: [
      basicSetup,
      css(),
      oneDark,
      keymap.of([ indentWithTab ]),
      EditorView.updateListener.of(() => {
        const docs = editorView.value.state.doc
        editor.css = docs.toString()
      }),
    ],
    parent: editorWrap.value,
  })
})
</script>

<style scoped>
</style>
