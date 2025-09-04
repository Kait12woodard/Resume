<template>
  <ScrollCharacter />

  <h1 class="text-3xl font-bold my-8">About Me</h1>
  <img :src="house" alt="House" id="house-photo" />

  <section class="about-me space-y-16">
    <div class="story-block left">
      <p>
        My journey into software engineering hasn't followed a straight line — but it's that
        winding trail that's shaped me into a curious, adaptable, and driven developer.
      </p>
    </div>

    <img :src="gradphoto" alt="Graduation Photo" id="grad-photo" />

    <div class="story-block right">
      <p>
        Right out of high school, I jumped into both work and college. I started as a Sandwich
        Artist at Subway while attending Portland Community College full-time. I quickly moved
        into a Shift Lead role, taking on more responsibility and discovering how much I enjoyed
        solving problems and helping a team grow.
      </p>
    </div>

    <div class="subway-wrap">
      <div class="circle-figure" ref="subwayFigure">
        <img
          :src="subway"
          alt="Sandwich Artist"
          id="subway-photo"
          ref="subwayImg"
          @click="sandwichRef?.trigger()"
        />
        <svg
          class="border-tag"
          :viewBox="`0 0 ${subBox} ${subBox}`"
          :style="`position:absolute;left:50%;top:50%;width:${subBox}px;height:${subBox}px;transform:translate(-50%,-50%);pointer-events:none;overflow:visible;`"
          aria-hidden="true"
        >
          <defs>
            <circle
              :id="subPathId"
              :cx="subBox/2"
              :cy="subBox/2"
              :r="subRadius"
              pathLength="1000"
            />
            <path :id="subTextId" :d="subTextD" />
          </defs>

          <use
            :href="`#${subPathId}`"
            :xlink:href="`#${subPathId}`"
            class="border-arc"
            :style="`stroke-dasharray:${subDash} 1000; stroke-dashoffset:${subOffset}`"
          />

          <text class="border-text">
            <textPath :href="`#${subTextId}`" :xlink:href="`#${subTextId}`" startOffset="50%" text-anchor="middle">
              Click Me
            </textPath>
          </text>
        </svg>
      </div>
      <SandwichAnimation ref="sandwichRef" />
    </div>

    <div class="story-block left">
      <p>
        At PCC, I focused on general studies while exploring a variety of subjects to find my
        direction. When I relocated to the Salem area, I joined Carhartt as a Brand Ambassador.
        After finishing my associate's degree, I continued growing professionally and eventually
        worked my way up to Supervisor. That role gave me the opportunity to develop real
        leadership skills — from team communication to problem-solving under pressure.
      </p>
    </div>

    <div class="carhartt-wrap">
      <div class="circle-figure">
        <img
          :src="carhartt"
          alt="Carhartt"
          id="carhartt-photo"
          ref="carharttImg"
          :class="{ disabled: carharttPlaying }"
          @click="carharttPlaying ? null : carharttRef?.trigger()"
        />
        <svg
          class="border-tag"
          :viewBox="`0 0 ${carBox} ${carBox}`"
          :style="`position:absolute;left:50%;top:50%;width:${carBox}px;height:${carBox}px;transform:translate(-50%,-50%);pointer-events:none;overflow:visible;`"
          aria-hidden="true"
        >
          <defs>
            <circle
              :id="carPathId"
              :cx="carBox/2"
              :cy="carBox/2"
              :r="carRadius"
              pathLength="1000"
            />
            <path :id="carTextId" :d="carTextD" />
          </defs>

          <use
            :href="`#${carPathId}`"
            :xlink:href="`#${carPathId}`"
            class="border-arc"
            :style="`stroke-dasharray:${carDash} 1000; stroke-dashoffset:${carOffset}`"
          />

          <text class="border-text">
            <textPath :href="`#${carTextId}`" :xlink:href="`#${carTextId}`" startOffset="50%" text-anchor="middle">
              Click Me
            </textPath>
          </text>
        </svg>
      </div>
      <CharacterWalkAnimation
        ref="carharttRef"
        @started="carharttPlaying = true"
        @ended="carharttPlaying = false"
      />
    </div>

    <div class="story-block right">
      <p>
        It was during this time that I became “the techy one” at our store — the person everyone
        turned to for troubleshooting software, submitting IT tickets, and making sense of the
        tools we relied on. That experience sparked something deeper: a desire to understand not
        just how the systems worked, but how they could be improved.
      </p>
    </div>

    <img :src="supervisor" alt="Supervisor Carhartt" id="supervisor-photo" />

    <div class="story-block left">
      <p>
        I enrolled at Western Oregon University for a Bachelor's in Computer Science. Over three
        years I gained hands-on full-stack experience, and even worked as a research assistant
        creating AI-driven educational videos. With my husband’s support, I could fully focus on
        learning and growth.
      </p>
    </div>

    <img :src="wouPhoto" alt="WOU Photo" id="wou-photo" />

    <div class="story-block center">
      <p>
        Now, I'm excited to bring my background in leadership, user experience, and full-stack
        development into the software industry. Whether front-end or back-end, I'm passionate about
        building thoughtful, resilient tools — and telling a great story through the code I write.
      </p>
    </div>
    <br /><br />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gradphoto from '@/assets/gradphoto.jpeg'
import subway from '@/assets/subway.PNG'
import carhartt from '@/assets/carhartt.jpg'
import supervisor from '@/assets/supervisor-carhartt.jpg'
import wouPhoto from '@/assets/wou-photo.jpg'
import house from '@/assets/house.png'
import ScrollCharacter from '@/components/ScrollCharacter.vue'
import SandwichAnimation from '@/components/SandwichAnimation.vue'
import CharacterWalkAnimation from '@/components/CharacterWalkAnimation.vue'

const sandwichRef = ref(null)
const carharttRef = ref(null)
const carharttPlaying = ref(false)

const subwayFigure = ref(null)
const subwayImg = ref(null)
const carharttImg = ref(null)

function makeBubbleState(prefix) {
  const pathId = `${prefix}Circle-${Math.random().toString(36).slice(2)}`
  const textId = `${prefix}Text-${Math.random().toString(36).slice(2)}`
  return {
    pathId,
    textId,
    box: ref(0),
    radius: ref(0),
    dash: ref(0),
    offset: ref(0),
    textD: ref(''),
  }
}

const subState = makeBubbleState('sub')
const carState = makeBubbleState('car')

const {
  pathId: subPathId,
  textId: subTextId,
  box: subBox,
  radius: subRadius,
  dash: subDash,
  offset: subOffset,
  textD: subTextD,
} = subState

const {
  pathId: carPathId,
  textId: carTextId,
  box: carBox,
  radius: carRadius,
  dash: carDash,
  offset: carOffset,
  textD: carTextD,
} = carState

const strokeW = 28
const pad = 12
const textInset = ref(8)
const textAngleOffset = ref(0)

function arcD(cx, cy, R, a0, a1) {
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  const x0 = cx + R * Math.cos(a0)
  const y0 = cy + R * Math.sin(a0)
  const x1 = cx + R * Math.cos(a1)
  const y1 = cy + R * Math.sin(a1)
  return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`
}

function measureWidth(el) {
  if (!el) return 0
  const r = el.getBoundingClientRect().width
  if (r) return r
  const cssW = parseFloat(getComputedStyle(el).width) || 0
  if (cssW) return cssW
  return el.clientWidth || el.naturalWidth || 0
}

function updateBubble(imgRef, state, { angleDeg = 220, spanDeg = 40, gapPx = -5 } = {}) {
  const img = imgRef.value
  if (!img) return
  const w = measureWidth(img)
  if (!w) { scheduleRetry(); return }
  const bw = parseFloat(getComputedStyle(img).borderLeftWidth) || 0
  const baseR = Math.max(1, w / 2 + bw + gapPx + strokeW / 2)
  state.radius.value = baseR
  const boxVal = Math.max(1, w + 2 * (bw + gapPx) + strokeW + pad)
  state.box.value = boxVal
  const dashLen = 1000 * (spanDeg / 360)
  state.dash.value = dashLen
  state.offset.value = 1000 * (angleDeg / 360) - dashLen / 2
  const cx = boxVal / 2
  const cy = boxVal / 2
  const tAngle = angleDeg + textAngleOffset.value
  const a0 = ((tAngle - spanDeg / 2) * Math.PI) / 180
  const a1 = ((tAngle + spanDeg / 2) * Math.PI) / 180
  const rText = baseR - textInset.value
  state.textD.value = arcD(cx, cy, rText, a0, a1)
}

const SUBWAY_CONFIG   = { angleDeg: 220, spanDeg: 40, gapPx: -5 }
const CARHARTT_CONFIG = { angleDeg: 20,  spanDeg: 40, gapPx: -5 }

const bubbleRegistry = [
  { imgRef: subwayImg,   state: subState, config: SUBWAY_CONFIG },
  { imgRef: carharttImg, state: carState, config: CARHARTT_CONFIG },
]

function redrawAll() {
  for (const b of bubbleRegistry) updateBubble(b.imgRef, b.state, b.config)
}

let retryQueued = false
function scheduleRetry() {
  if (retryQueued) return
  retryQueued = true
  requestAnimationFrame(() => {
    retryQueued = false
    redrawAll()
  })
}

let raf = 0
function onResize() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    redrawAll()
  })
}

let ro = null
function wireImageLoadsAndResizeObservers() {
  const els = [subwayImg.value, carharttImg.value].filter(Boolean)
  for (const el of els) {
    if (!el.complete) el.addEventListener('load', redrawAll, { once: true })
  }
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => redrawAll())
    els.forEach(el => ro.observe(el))
  }
}

onMounted(async () => {
  await nextTick()
  wireImageLoadsAndResizeObservers()
  requestAnimationFrame(redrawAll)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (ro) ro.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style>
body {
  margin: 0;
}
</style>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
#house-photo {
  width: 200px;
  height: auto;
  display: block;
  margin: 0 auto 16px;
}
.subway-wrap,
.carhartt-wrap {
  position: relative;
  display: inline-block;
}

#grad-photo,
#carhartt-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  align-self: flex-end;
  margin-left: auto;
  z-index: 2;
  position: relative;
  transition: box-shadow 0.3s ease;
}

#subway-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  align-self: flex-start;
  margin-right: auto;
  transform: scaleX(-1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

#supervisor-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  align-self: flex-start;
  margin-right: auto;
  transform: scaleX(-1);
  transition: box-shadow 0.3s ease;
}

.border-tag {
  position: absolute;
  pointer-events: none;
  overflow: visible;
}

.border-arc {
  fill: none;
  stroke: #e53935;
  stroke-width: 28;
  stroke-linecap: butt;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.25));
}

.border-text {
  fill: white;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: .5px;
}

.circle-figure {
  position: relative;
  display: inline-block;
}
#subway-photo { display: block; } 

#subway-photo:hover,
#carhartt-photo:hover {
  box-shadow: 0 0 30px 15px #5475eb;
}

#carhartt-photo.disabled {
  pointer-events: none;
  opacity: 0.9;
}

#wou-photo {
  width: 600px;
  height: 400px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  align-self: center;
  margin: 0 auto;
}

.about-me {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1rem;
}

.story-block {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.story-block.left {
  align-self: flex-start;
  text-align: left;
}

.story-block.right {
  align-self: flex-end;
  text-align: right;
}

.story-block.center {
  align-self: center;
  text-align: center;
}

.subway-wrap,
.carhartt-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.carhartt-wrap {
  width: 100%;
  justify-content: flex-end;
}

.carhartt-wrap .circle-figure {
  margin-left: auto;
}

#carhartt-photo {
  margin-left: 0;
  align-self: initial;
}
</style>

