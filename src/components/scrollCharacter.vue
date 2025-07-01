<template>
  <div class="scroll-character" :style="{ left: `${left}px`, top: `${top}px` }">
    <img :src="characterSrc" :class="{ flipped: direction === 'right' }" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hipPose          from '@/assets/character/hip_pose.png'
import standingPose     from '@/assets/character/standing_pose.png'
import running1         from '@/assets/character/running1.png'
import running2         from '@/assets/character/running2.png'
import runningForward1  from '@/assets/character/running_forward1.png'
import runningForward2  from '@/assets/character/running_forward2.png'

const H_PERIOD_PX = 600
const VERTICAL_RANGE = 0.6
const EDGE_INSET = 60
const charW = 100
const charH = 150
const margin = 20

const characterSrc = ref(hipPose)
const left = ref(margin + EDGE_INSET)
const top = ref(margin)
const direction = ref('left')

let isRunning = false
let runInterval = null
let stopTimeout = null
let turnTimeout = null
let finishing = false
let finishInterval = null

function startRunCycle() {
  if (isRunning) return
  isRunning = true
  characterSrc.value = standingPose
  let toggle = false
  runInterval = setInterval(() => {
    characterSrc.value = toggle ? running1 : running2
    toggle = !toggle
  }, 200)
}

function stopRunCycle() {
  clearInterval(runInterval)
  isRunning = false
  characterSrc.value = standingPose
  setTimeout(() => (characterSrc.value = hipPose), 500)
}

function turn(newDir) {
  clearInterval(runInterval)
  clearTimeout(turnTimeout)
  isRunning = true
  characterSrc.value = runningForward1
  turnTimeout = setTimeout(() => {
    characterSrc.value = runningForward2
    direction.value = newDir
    let toggle = false
    runInterval = setInterval(() => {
      characterSrc.value = toggle ? running1 : running2
      toggle = !toggle
    }, 200)
  }, 150)
}

const easeOutQuad = t => 1 - (1 - t) ** 2

function moveCharacter() {
  if (finishing) return
  const distX = window.innerWidth - charW - margin * 2 - EDGE_INSET * 2
  const cycle = window.scrollY / H_PERIOD_PX
  const phase = cycle % 2
  const prog = phase < 1 ? 1 - phase : phase - 1
  left.value = margin + EDGE_INSET + distX * prog
  const newDir = phase < 1 ? 'left' : 'right'
  if (direction.value !== newDir) turn(newDir)

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const t = maxScroll ? window.scrollY / maxScroll : 0
  const easedT = easeOutQuad(t)
  const travelY = (window.innerHeight - charH - margin * 2) * VERTICAL_RANGE
  top.value = margin + easedT * travelY

  if (window.scrollY >= maxScroll - 1) finishRun(distX)
}

function finishRun(distX) {
  if (finishing) return
  finishing = true
  startRunCycle()
  const target = margin + EDGE_INSET + distX * 0.5
  const dirNeeded = left.value < target ? 'right' : 'left'
  if (direction.value !== dirNeeded) turn(dirNeeded)
  finishInterval = setInterval(() => {
    const step = 2
    if (Math.abs(left.value - target) <= step) {
      left.value = target
      clearInterval(finishInterval)
      finishing = false
      stopRunCycle()
    } else {
      left.value += left.value < target ? step : -step
    }
  }, 16)
}

function handleScroll() {
  moveCharacter()
  clearTimeout(stopTimeout)
  startRunCycle()
  stopTimeout = setTimeout(stopRunCycle, 400)
}

onMounted(() => {
  moveCharacter()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', moveCharacter)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', moveCharacter)
  clearInterval(runInterval)
  clearTimeout(turnTimeout)
  clearInterval(finishInterval)
})
</script>

<style scoped>
.scroll-character {
  position: fixed;
  width: 100px;
  height: 150px;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: left 0.2s linear, top 0.2s linear;
}
.scroll-character img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.1s;
}
.scroll-character img.flipped {
  transform: scaleX(-1);
}
</style>
