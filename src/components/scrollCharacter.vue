<template>
  <svg class="scroll-path" :style="{ height: svgH + 'px' }" :viewBox="`0 0 ${svgW} ${svgH}`">
    <path :d="pathD" class="walk-line" />
  </svg>
  <div class="scroll-character" :style="{ left: `${left}px`, top: `${top}px` }">
    <img :src="src" :class="{ flipped: face === 'right' }" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import hipPose from '@/assets/character/hip_pose.png'
import standingPose from '@/assets/character/standing_pose.png'
import running1 from '@/assets/character/running1.png'
import running2 from '@/assets/character/running2.png'

const W = 100, H = 150, M = 20, IN = 60, CYC = 3, SAMP = 200
const FRAME = 200, IDLE = 800, FLIP = 0.5
const ease = t => Math.pow(t, 0.7)

const src = ref(hipPose), left = ref(0), top = ref(0), face = ref('left')
const pathD = ref(''), svgW = ref(0), svgH = ref(0)

let run = false, togg = false, raf = 0, lastFrame = 0, lastScroll = 0
let startY = 0, travelY = 0, lastX = 0

function frameLoop(now) {
  if (now - lastFrame >= FRAME) {
    src.value = togg ? running1 : running2
    togg = !togg
    lastFrame = now
  }
  if (run) raf = requestAnimationFrame(frameLoop)
}

function start() {
  lastScroll = performance.now()
  if (run) return
  run = true
  togg = false
  src.value = standingPose
  lastFrame = lastScroll
  raf = requestAnimationFrame(frameLoop)
}

function idleCheck() {
  if (run && performance.now() - lastScroll > IDLE) {
    run = false
    cancelAnimationFrame(raf)
    src.value = standingPose
    setTimeout(() => { if (!run) src.value = hipPose }, 500)
  }
  requestAnimationFrame(idleCheck)
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && run) {
    cancelAnimationFrame(raf)
    lastFrame = performance.now()
    raf = requestAnimationFrame(frameLoop)
  }
})

function update() {
  const docH = document.documentElement.scrollHeight - window.innerHeight
  const t = docH ? window.scrollY / docH : 0
  const waveW = window.innerWidth - W - M * 2 - IN * 2
  const cx = M + IN + waveW / 2
  const amp = waveW / 2
  const x = cx + amp * Math.cos(2 * Math.PI * CYC * t - Math.PI / 2)
  left.value = t >= 1 ? cx : Math.round(x)
  if (Math.abs(x - lastX) > FLIP) face.value = x < lastX ? 'left' : 'right'
  lastX = x
  top.value = startY + ease(t) * travelY
  start()
}

function setTravel() {
  travelY = window.innerHeight - H - M - startY
  if (travelY < 0) travelY = 0
}

function buildPath() {
  const docH = document.documentElement.scrollHeight - window.innerHeight
  const waveW = window.innerWidth - W - M * 2 - IN * 2
  const cx = M + IN + waveW / 2
  const amp = waveW / 2
  svgW.value = window.innerWidth
  svgH.value = docH + window.innerHeight
  const pts = []
  for (let i = 0; i <= SAMP; i++) {
    const t = i / SAMP
    const x = cx + amp * Math.cos(2 * Math.PI * CYC * t - Math.PI / 2)
    const y = startY + ease(t) * travelY + t * docH + H
    pts.push(`${Math.round(x)},${Math.round(y)}`)
  }
  pathD.value = `M${pts[0]} L${pts.slice(1).join(' ')}`
}

function recalcStart() {
  const house = document.getElementById('house-photo')
  if (house) startY = house.getBoundingClientRect().bottom + window.scrollY - H
  setTravel()
  buildPath()
  update()
}

onMounted(async () => {
  await nextTick()
  recalcStart()
  const house = document.getElementById('house-photo')
  if (house) house.addEventListener('load', recalcStart, { once: true })
  requestAnimationFrame(idleCheck)
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', recalcStart)
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', recalcStart)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.scroll-character {
  position: fixed;
  width: 100px;
  height: 150px;
  z-index: 20;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: left .12s linear, top .18s linear
}
.scroll-character img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform .1s
}
.scroll-character img.flipped { transform: scaleX(-1) }
.scroll-path { position: absolute; top: 0; left: 0; width: 100%; pointer-events: none; z-index: 5 }
.walk-line { fill: none; stroke: #555; stroke-width: 8; stroke-dasharray: 6 6; opacity: .4 }
</style>
