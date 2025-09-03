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
            class="border-arc"
            :style="`stroke-dasharray:${subDash} 1000; stroke-dashoffset:${subOffset}`"
          />

          <text class="border-text">
            <textPath :href="`#${subTextId}`" :xlink:href="`#${subTextId}`" 
            startOffset="50%" text-anchor="middle">Click Me</textPath>
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
      <img
        :src="carhartt"
        alt="Carhartt"
        id="carhartt-photo"
        :class="{ disabled: carharttPlaying }"
        @click="carharttPlaying ? null : carharttRef?.trigger()"
      />
      <span v-if="!carharttPlaying" class="click-me">Click Me</span>
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

const subPathId = `subCircle-${Math.random().toString(36).slice(2)}`
const subTextId = `subText-${Math.random().toString(36).slice(2)}`
const subBox = ref(0)
const subRadius = ref(0)
const subDash = ref(0)
const subOffset = ref(0)
const subTextStart = ref(0)
const subTextD = ref('')
const subCenterPct = ref('50%')

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

function updateBorderTag(angleDeg = 220, spanDeg = 40, gapPx = -5) {
  const img = subwayImg.value
  if (!img) return
  const rect = img.getBoundingClientRect()
  const styles = getComputedStyle(img)
  const bw = parseFloat(styles.borderLeftWidth) || 0
  const w = rect.width

  const baseR = w / 2 + bw + gapPx + strokeW / 2
  subRadius.value = baseR
  subBox.value = w + 2 * (bw + gapPx) + strokeW + pad

  const dashLen = 1000 * (spanDeg / 360)
  subDash.value = dashLen
  subOffset.value = 1000 * (angleDeg / 360) - dashLen / 2
  subTextStart.value = (angleDeg / 360) * 100

  const cx = subBox.value / 2
  const cy = subBox.value / 2
  const a0 = ((angleDeg - spanDeg / 2) * Math.PI) / 180
  const a1 = ((angleDeg + spanDeg / 2) * Math.PI) / 180

  const tAngle = angleDeg + textAngleOffset.value
  const t0 = ((tAngle - spanDeg / 2) * Math.PI) / 180
  const t1 = ((tAngle + spanDeg / 2) * Math.PI) / 180
  const rText = baseR - textInset.value

  subTextD.value = arcD(cx, cy, rText, t0, t1)
  subCenterPct.value = `${(tAngle / 360) * 100}%`
}

function onResize() {
  updateBorderTag()
}

onMounted(async () => {
  await nextTick()
  updateBorderTag()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

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
</style>
