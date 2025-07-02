<template>
  <div class="scroll-character" :style="{ left: `${left}px`, top: `${top}px` }">
    <img :src="characterSrc" :class="{ flipped: facing === 'right' }" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hipPose        from '@/assets/character/hip_pose.png'
import standingPose   from '@/assets/character/standing_pose.png'
import running1       from '@/assets/character/running1.png'
import running2       from '@/assets/character/running2.png'

const charW = 100
const charH = 150
const margin = 20
const inset = 60
const cycles = 3

const characterSrc = ref(hipPose)
const left  = ref(0)
const top   = ref(0)
const facing = ref('left')

let runTimer = null
let idleTimer = null
let running = false
let lastX = 0

function startRun() {
  if (running) return
  running = true
  characterSrc.value = standingPose
  let toggle = false
  runTimer = setInterval(() => {
    characterSrc.value = toggle ? running1 : running2
    toggle = !toggle
  }, 200)
}

function stopRun() {
  clearInterval(runTimer)
  running = false
  characterSrc.value = standingPose
  setTimeout(() => (characterSrc.value = hipPose), 500)
}

function ease(t) {
  return Math.pow(t, 0.7)
}

function update() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const t = maxScroll ? window.scrollY / maxScroll : 0

  const waveWidth  = window.innerWidth - charW - margin * 2 - inset * 2
  const waveCenter = margin + inset + waveWidth / 2
  const amp = waveWidth / 2
  const x = waveCenter + amp * Math.cos(2 * Math.PI * cycles * t - Math.PI / 2)
  left.value = t >= 1 ? waveCenter : Math.round(x)
  facing.value = x < lastX ? 'left' : 'right'
  lastX = x

  const travelY = window.innerHeight - charH - margin * 2
  top.value = margin + ease(t) * travelY

  clearTimeout(idleTimer)
  startRun()
  idleTimer = setTimeout(stopRun, 400)
}

function setStart() {
  const waveWidth  = window.innerWidth - charW - margin * 2 - inset * 2
  left.value = margin + inset + waveWidth
  top.value = margin
  lastX = left.value
}

onMounted(() => {
  setStart()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', setStart)
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', setStart)
  clearInterval(runTimer)
  clearTimeout(idleTimer)
})
</script>

<style scoped>
.scroll-character {
  position: fixed;
  width: 100px;
  height: 150px;
  z-index: 10;
  pointer-events: none;
  transition: left 0.12s linear, top 0.18s linear;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
