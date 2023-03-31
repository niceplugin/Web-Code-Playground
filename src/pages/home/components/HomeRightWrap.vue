<template>
  <div class="order-1 md:order-3 flex flex-col">
    <div class="mb-[-1px]">
      <tab-button
        :active="true"
        :disabled="true"
        text="Web"
      />
      <share-button v-if="sharePossible"/>
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
import router from '@/router'
import { onMounted, ref, watch } from 'vue'
import { useEditor } from '@/stores/editorStore'
import { useResize } from '@/stores/resizeStore'
import TabButton from '@/components/TabButton.vue'
import SaveState from '@/components/SaveState/SaveState.vue'
import WindowSize from '@/components/WindowSize.vue'
import ShareButton from '@/components/ShareButton/ShareButton.vue'

let timeoutID = 0
const sharePossible = Boolean(navigator?.clipboard?.writeText)
const iframe = ref(null)
const editor = useEditor()
const resize = useResize()

onMounted(() => {
  const document = iframe.value.contentWindow.document
  injectSourceToIframe({
    html: editor.html,
    css: editor.css,
    js: editor.js,
    tab: editor.tab,
  }, document)
})

/** HTML/CSS/JS 소스 변경시 */
watch(() => ({
  html: editor.html,
  css: editor.css,
  js: editor.js,
}), source => {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    const document = iframe.value.contentWindow.document
    source.tab = editor.tab
    injectSourceToIframe(source, document)
  }, 2000)
  editor.saved = false
})

/** 탭 변경시 */
watch(() => editor.tab, tab => {
  /** 저장중 상태일 경우 */
  if (editor.saved === false) return

  /** @type {string} */
  const query = router.currentRoute.value.query.v
  const data = JSON.parse(decodeURIComponent(atob(query)))
  data.tab = tab
  const json = JSON.stringify(data)

  injectJsonToUrl(json)
})

/**
 * iframe에 소스 적용 및 Url에 JSON 저장
 * @function injectSourceToIframe
 * @param {Object} source
 * @param {string} source.html
 * @param {string} source.css
 * @param {string} source.js
 * @param {number?} source.tab
 * @param {Document} document
 */
function injectSourceToIframe(source, document) {
  document.open()
  document.write(source.html)
  document.close()

  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = source.css
  document.head.appendChild(style)

  const script = document.createElement('script')
  script.textContent = `(function(){${ source.js }})()`
  document.body.appendChild(script)

  const json = JSON.stringify(source)
  injectJsonToUrl(json)

  editor.saved !== null && (editor.saved = true)
}

/**
 * Url에 JSON 저장
 * @function injectJsonToUrl
 * @param {string} json
 */
function injectJsonToUrl(json) {
  const query = btoa(encodeURIComponent(json))

  router.push({
    query: {
      v: query,
    },
  })
}
</script>

<style scoped>
</style>
