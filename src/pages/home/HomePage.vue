<template>
  <div
    id="home-page"
    ref="homePage"
    class="grow grid p-[1rem] bg-[#282c34]"
    @mouseleave="resize.resizeStart = false"
    @mousemove="mouseMove"
    @mouseup="resize.resizeStart = false"
    @touchend="touchend"
    @touchmove="touchMove"
  >
    <home-left-wrap/>
    <home-resize-bar/>
    <home-right-wrap/>
  </div>
</template>

<script setup>
import HomeLeftWrap from '@/pages/home/components/HomeLeftWrap.vue'
import HomeResizeBar from '@/pages/home/components/HomeResizeBar.vue'
import HomeRightWrap from '@/pages/home/components/HomeRightWrap.vue'
import { ref, watch } from 'vue'
import { useResize } from '@/stores/resizeStore'

const homePage = ref(null)
const resize = useResize()

/** 화면 리사이징 style 시트 실시간 갱신 */
watch(() => {
  return resize.leftWidth * resize.rightWidth * resize.leftHeight * resize.rightHeight
}, () => {
  const el = document.getElementById('home-page-style')
  el.textContent = resize.style
}, {
  immediate: true,
})

/**
 * 리사이징 상태일 경우, 마우스 이동 처리 이벤트 핸들러
 * @function mouseMove
 */
function mouseMove(event) {
  resize.resizeStart && resizeMove(event.pageX, event.pageY)
}

/**
 * 리사이징 상태일 경우, 해당 터치 이동 처리 이벤트 핸들러
 * @function touchMove
 */
function touchMove(event) {
  if (!resize.resizeStart) {
    return
  }

  /** 이동 처리해야 할 터치 객체 탐색 */
  let target = null
  const length = event.touches.length
  for (let i = 0; i < length; i++) {
    const touch = event.touches[i]
    if (resize.touchID === touch.identifier) {
      target = touch
    }
  }

  /** 터치 객체가 있을 경우 */
  target && resizeMove(target.pageX, target.pageY)
}

/**
 * 리사이징 상태일 경우, 해당 터치 종료 처리 이벤트 핸들러
 * @function touchend
 */
function touchend(event) {
  if (!resize.resizeStart) {
    return
  }

  /** 터치 ID에 해당하는 객체 유무 탐색 */
  let result = false
  const length = event.touches.length
  for (let i = 0; i < length; i++) {
    const touch = event.touches[i]
    result = result ? result :
      resize.touchID === touch.identifier
  }

  /** 객체가 없을 경우, 터치 종료 처리 */
  if (!result) {
    resize.resizeStart = result
    resize.touchID = -1
  }
}

/**
 * 포인트 움직임에 따른 화면 리사이징
 * @function resizeMove
 */
function resizeMove(x, y) {
  const borderWidth = 4
  const tabHeight = 28
  const el = homePage.value
  const elWidth = el.clientWidth - (32 + borderWidth)
  const elHeight = el.clientHeight - (32 + borderWidth + tabHeight)
  const mouseX = x - (8 + borderWidth)
  const mouseY = y - (8 + borderWidth + tabHeight)

  const leftWidth = Math.floor(mouseX / elWidth * 100)
  resize.leftWidth =
    leftWidth < 20 ? 20 :
      leftWidth > 80 ? 80 :
        leftWidth
  resize.rightWidth = 100 - resize.leftWidth

  const leftHeight = Math.floor(mouseY / elHeight * 100)
  resize.leftHeight =
    leftHeight < 20 ? 20 :
      leftHeight > 80 ? 80 :
        leftHeight
  resize.rightHeight = 100 - resize.leftHeight
}
</script>

<style scoped>
</style>
