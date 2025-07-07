<template>
  <teleport to="body">
    <img v-if="visible" ref="char" :src="currentFrame" class="walker" />
  </teleport>
</template>

<script setup>
import { ref, nextTick, onUnmounted, defineExpose, defineEmits } from 'vue'
import { gsap } from 'gsap'
import fancy1 from '@/assets/character/fancy1.png'
import fancy2 from '@/assets/character/fancy2.png'
import fancy3 from '@/assets/character/fancy3.png'
import fancy4 from '@/assets/character/fancy4.png'

const visible = ref(false)
const currentFrame = ref(fancy1)
const playing = ref(false)
const char = ref(null)
const emit = defineEmits(['started', 'ended'])

let frameTimer = null
let tl = null
let resetTimer = null
let scrollHandler = null

const startLoop = () => {
  clearInterval(frameTimer)
  frameTimer = setInterval(() => {
    currentFrame.value = currentFrame.value === fancy1 ? fancy2 : fancy1
  }, 200)
}
const stopLoop = () => {
  clearInterval(frameTimer)
  frameTimer = null
}
const detachScroll = () => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  scrollHandler = null
}
const reset = () => {
  tl?.kill()
  tl = null
  stopLoop()
  clearTimeout(resetTimer)
  detachScroll()
  visible.value = false
  playing.value = false
  emit('ended')
}

const trigger = async () => {
  if (playing.value) {
    reset()
    return
  }

  playing.value = true
  emit('started')
  visible.value = true
  await nextTick()

  const anchor = document.getElementById('carhartt-photo')
  const el = char.value
  if (!anchor || !el) {
    reset()
    return
  }
  if (!el.complete) await new Promise(r => (el.onload = r))

  const updateY = () => {
    const rect = anchor.getBoundingClientRect()
    gsap.set(el, { top: rect.top + rect.height / 2 - el.offsetHeight / 2 })
  }

  const rect = anchor.getBoundingClientRect()
  const startX = rect.left - el.offsetWidth + 250
  const stopX = 380

  gsap.set(el, { position: 'fixed', left: startX, scaleX: 1 })
  updateY()
  scrollHandler = updateY
  window.addEventListener('scroll', scrollHandler, { passive: true })

  startLoop()

  tl = gsap.timeline({ onComplete: reset })
    .to(el, { left: stopX, duration: 2, ease: 'none' })
    .add(() => { stopLoop(); currentFrame.value = fancy3 })
    .to({}, { duration: 0.5 })
    .add(() => { currentFrame.value = fancy4 })
    .to({}, { duration: 0.5 })
    .add(() => { currentFrame.value = fancy3 })
    .to({}, { duration: 0.5 })
    .add(() => { currentFrame.value = fancy4 })
    .to({}, { duration: 0.5 })
    .add(() => { currentFrame.value = fancy1; gsap.set(el, { scaleX: -1 }); startLoop() })
    .to(el, { left: startX, duration: 2, ease: 'none' })

  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    if (tl && playing.value) {
      tl.play() // resume timeline if it was paused/throttled
    }
  }, 15000)
}

defineExpose({ trigger })
onUnmounted(reset)
</script>

<style scoped>
.walker {
  width: 150px;
  height: auto;
  pointer-events: none;
  z-index: 1;
}
</style>
