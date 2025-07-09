<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import running1 from '@/assets/character/running1.png'
import running2 from '@/assets/character/running2.png'
import standingPose from '@/assets/character/standing_pose.png'
import hipPose from '@/assets/character/hip_pose.png'

const props = defineProps({
  target: { type: Object, required: true }
})

const currentFrame = ref(running1)
const charRef = ref(null)
let frameTimer = null
let animId = null

function startFrames() {
  const frames = [running1, running2]
  let i = 0
  clearInterval(frameTimer)
  frameTimer = setInterval(() => {
    i = (i + 1) % frames.length
    currentFrame.value = frames[i]
  }, 100)
}

function stopFrames() {
  clearInterval(frameTimer)
  currentFrame.value = standingPose
  setTimeout(() => {
    currentFrame.value = hipPose
    const el = charRef.value
    if (el) el.style.transform += ' scale(0.92)'
  }, 300)
}

function moveCharacter(x, y) {
  const el = charRef.value
  if (!el) return
  el.style.transform = el.style.transform.replace(/ scale\(0\.92\)/, '')
  let startX = parseFloat(el.dataset.x)
  if (isNaN(startX)) startX = -el.offsetWidth
  const dir = x > startX ? 1 : -1
  const scaleX = dir === 1 ? -1 : 1
  if (startX === x && parseFloat(el.dataset.y) === y) return
  cancelAnimationFrame(animId)
  startFrames()
  el.style.top = `${y}px`
  let pos = startX
  const speed = 6
  const step = () => {
    pos += dir * speed
    if ((dir === 1 && pos >= x) || (dir === -1 && pos <= x)) pos = x
    el.style.transform = `translateX(${pos}px) scaleX(${scaleX})`
    if (pos !== x) {
      animId = requestAnimationFrame(step)
    } else {
      el.dataset.x = x
      el.dataset.y = y
      stopFrames()
    }
  }
  step()
}

onMounted(() => nextTick(() => moveCharacter(props.target.x, props.target.y)))

watch(
  () => [props.target.x, props.target.y],
  ([x, y]) => nextTick(() => moveCharacter(x, y))
)
</script>

<template>
  <img ref="charRef" :src="currentFrame" class="selecting-character" />
</template>

<style scoped>
.selecting-character {
  position: absolute;
  left: 0;
  width: 120px;
  pointer-events: none;
  transform: translateX(-999px);
}
</style>
