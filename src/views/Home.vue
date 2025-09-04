<template>
  <div class="home">
    <h1>Let's Code Together</h1>

    <div class="frame-container">
      <div
        class="frame-wrapper"
        @mouseenter="hoveredFrame = 'about'; updateSpotlightPosition($event.currentTarget)"
        @mouseleave="hoveredFrame = null; spotlight.visible = false"
      >
        <img
          class="light-img"
          :src="hoveredFrame === 'about' ? lightOn : lightOff"
          alt="Light"
        />
        <div
          class="frame"
          @click="goTo('about')"
          @mouseenter="updateTarget($event.currentTarget)"
        >
          <img :src="painting" alt="About Me" />
          <h2>About</h2>
          <p>A brief introduction to my journey and background.</p>
        </div>
      </div>

      <div
        class="frame-wrapper"
        @mouseenter="hoveredFrame = 'experiences'; updateSpotlightPosition($event.currentTarget)"
        @mouseleave="hoveredFrame = null; spotlight.visible = false"
      >
        <img
          class="light-img"
          :src="hoveredFrame === 'experiences' ? lightOn : lightOff"
          alt="Light"
        />
        <div
          class="frame"
          @click="goTo('experiences')"
          @mouseenter="updateTarget($event.currentTarget)"
        >
          <img :src="painting" alt="Experiences" />
          <h2>Experiences</h2>
          <p>Highlights of jobs that shaped who I am professionally.</p>
        </div>
      </div>

      <div
        class="frame-wrapper"
        @mouseenter="hoveredFrame = 'videos'; updateSpotlightPosition($event.currentTarget)"
        @mouseleave="hoveredFrame = null; spotlight.visible = false"
      >
        <img
          class="light-img"
          :src="hoveredFrame === 'videos' ? lightOn : lightOff"
          alt="Light"
        />
        <div
          class="frame"
          @click="goTo('videos')"
          @mouseenter="updateTarget($event.currentTarget)"
        >
          <img :src="painting" alt="Project Videos" />
          <h2>Project Videos</h2>
          <p>See my work in action.</p>
        </div>
      </div>
    </div>

    <div class="rope-character-row">
      <img :src="redRope" alt="Red Rope" class="red-rope" />
      <SelectingCharacter :target="target" />
      <img :src="redRope" alt="Red Rope" class="red-rope" />
    </div>

    <div
      v-if="spotlight.visible"
      class="spotlight-overlay"
      :style="spotlight.style"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import SelectingCharacter from '@/components/SelectingCharacter.vue'
import lightOff from '@/assets/light-off.png'
import lightOn from '@/assets/light-on.png'
import painting from '@/assets/painting.png'
import redRope from '@/assets/red-rope.png'

const router = useRouter()
function goTo(routeName) {
  router.push(`/${routeName}`)
}

const target = ref({ x: 0, y: 0 })
const hoveredFrame = ref(null)

function updateTarget(el) {
  const homeRect = document.querySelector('.home').getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  const charWidth = 120

  target.value = {
    x: rect.left - homeRect.left + rect.width / 2 - charWidth / 2,
    y: rect.bottom - homeRect.top + 100
  }
}

const spotlight = ref({
  visible: false,
  style: {}
})

function updateSpotlightPosition(wrapperEl) {
  const light = wrapperEl.querySelector('.light-img')
  if (!light) return

  const rect = light.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.bottom

  spotlight.value = {
    visible: true,
    style: {
      '--x': `${x}px`,
      '--y': `${y}px`
    }
  }
}

onMounted(() => {
  nextTick(() => {
    const first = document.querySelector('.frame')
    if (first) updateTarget(first)
  })
})
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  position: relative;
}

.frame-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.frame-wrapper {
  position: relative;
  padding-top: 70px;
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15px;
}

.light-img {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: auto;
  z-index: 2;
}

.frame {
  border: 10px solid #000;
  border-radius: 10px;
  width: 100%;
  padding: 1.25rem;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background: #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.frame:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px 15px #f7edd2;
}

.frame img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #000;
}

.frame h2 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.frame p {
  margin: 0;
}

.rope-character-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  padding-bottom: 6rem;
}

.red-rope {
  height: 300px;
  width: auto;
  display: block;
}

:deep(.character) {
  margin-bottom: -6px;
}

.spotlight-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.85);
  mask-image: radial-gradient(
    ellipse 340px 800px at var(--x, 50%) var(--y, 50%),
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 340px 800px at var(--x, 50%) var(--y, 50%),
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
