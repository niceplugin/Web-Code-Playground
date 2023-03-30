<template>
  <div class="order-1 md:order-3 flex flex-col">
    <div class="mb-[-1px]">
      <tab-button
        :active="true"
        :disabled="true"
        text="Web"
      />
      <save-state/>
    </div>
    <div class="relative border-zinc-600 border-[1px] grow rounded-tr overflow-hidden">
      <div class="absolute top-0 left-0 right-0 bottom-0 overflow-auto bg-white">
        <iframe
          id="home-right-iframe"
          ref="iframe"
          class="select-none"
          height="100%"
          width="100%"
        />
        <window-size v-if="resize.resizeStart"/>
        <div
          v-if="resize.resizeStart"
          class="absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TabButton from '@/components/TabButton.vue'
import { useEditor } from '@/stores/editorStore'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import SaveState from '@/components/SaveState/SaveState.vue'
import { useResize } from '@/stores/resizeStore'
import WindowSize from '@/components/WindowSize.vue'

let timeoutID = 0
const iframe = ref(null)
const editor = useEditor()
const resize = useResize()

onMounted(() => {
  injectSource({
    html: editor.html,
    css: editor.css,
    js: editor.js,
    tab: editor.tab,
  })
})

/** HTML/CSS/JS 소스 변경시 2초 뒤 iframe 적용 */
watch(() => ({
  html: editor.html,
  css: editor.css,
  js: editor.js,
  tab: editor.tab,
}), source => {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => injectSource(source), 2000)
  editor.saved = false
})

/**
 * iframe에 소스 적용 및 url에 정보 저장
 * @function injectSource
 */
function injectSource(source) {
  const iDoc = iframe.value.contentWindow.document

  iDoc.open()
  iDoc.write(source.html)
  iDoc.close()

  const style = iDoc.createElement('style')
  style.type = 'text/css'
  style.textContent = source.css
  iDoc.head.appendChild(style)

  const script = iDoc.createElement('script')
  script.textContent = `(function(){${ source.js }})()`
  iDoc.body.appendChild(script)

  const json = JSON.stringify(source)
  const value = btoa(json)
  router.push({
    query: {
      v: value,
    },
  })

  editor.saved !== null && (editor.saved = true)
}
</script>

<style scoped>
</style>
